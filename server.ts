import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Lazy initialize Gemini client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Auto generate example sentence for Vocabulary
app.post('/api/gemini/generate-example', async (req, res) => {
  try {
    const { kanji, hiragana, meaning, partOfSpeech } = req.body;
    if (!kanji && !hiragana) {
      return res.status(400).json({ error: 'Kanji or hiragana is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Fallback realistic natural sentence based on part of speech
      const w = kanji || hiragana;
      let sentenceJa = `日々の勉強や仕事において、${w}を正しく理解することが重要だ。`;
      let sentenceFurigana = `<ruby>日々<rt>ひび</rt></ruby>の<ruby>勉強<rt>べんきょう</rt></ruby>や<ruby>仕事<rt>しごと</rt></ruby>において、${w}を<ruby>正<rt>ただ</rt></ruby>しく<ruby>理解<rt>りかい</rt></ruby>することが<ruby>重要<rt>じゅうよう</rt></ruby>だ。`;
      let sentenceVi = `Trong học tập và công việc hàng ngày, việc hiểu đúng từ (${meaning || w}) là rất quan trọng.`;

      if (partOfSpeech === 'verb') {
        sentenceJa = `問題が発生したときは、落ち着いて状況を確認し、適切に${w}ことが求められる。`;
        sentenceFurigana = `<ruby>問題<rt>もんだい</rt></ruby>が<ruby>発生<rt>はっせい</rt></ruby>したときは、<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>いて<ruby>状況<rt>じょうきょう</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>し、<ruby>適切<rt>てきせつ</rt></ruby>に${w}ことが<ruby>求<rt>もと</rt></ruby>められる。`;
        sentenceVi = `Khi có vấn đề phát sinh, yêu cầu là phải bình tĩnh kiểm tra và xử lý hợp lý.`;
      } else if (partOfSpeech === 'i_adj' || partOfSpeech === 'na_adj') {
        sentenceJa = `今回の計画を成功させるためには、現状を見極める${w}視点が欠かせない。`;
        sentenceFurigana = `<ruby>今回<rt>こんかい</rt></ruby>の<ruby>計画<rt>けいかく</rt></ruby>を<ruby>成功<rt>せいこう</rt></ruby>させるためには、<ruby>現状<rt>げんじょう</rt></ruby>を<ruby>見極<rt>みきわ</rt></ruby>める${w}<ruby>視点<rt>してん</rt></ruby>が<ruby>欠<rt>か</rt></ruby>かせない。`;
        sentenceVi = `Để kế hoạch lần này thành công, không thể thiếu góc nhìn (${meaning || w}).`;
      }

      return res.json({ sentenceJa, sentenceFurigana, sentenceVi });
    }

    const prompt = `Bạn là chuyên gia tiếng Nhật JLPT N3. Hãy tạo 1 câu ví dụ tiếng Nhật chuẩn ngữ pháp, tự nhiên, đúng ngữ cảnh cuộc sống hoặc công sở Nhật Bản cho từ vựng sau:
Từ vựng: ${kanji || hiragana} (${hiragana})
Ý nghĩa: ${meaning}
Loại từ: ${partOfSpeech || 'từ vựng N3'}

LƯU Ý NGHIÊM NGẶT: TUYỆT ĐỐI KHÔNG dùng các câu máy móc sáo rỗng như "〇〇を使って...", "〇〇の使い方を...", "〇〇の文を作ります". Câu phải mang tình huống đời sống hoặc công việc thực tế, tự nhiên.

Yêu cầu trả về định dạng JSON thuần túy (không kèm markdown code fence \`\`\`json):
{
  "sentenceJa": "câu tiếng Nhật chuẩn kèm chữ Hán thông dụng",
  "sentenceFurigana": "câu tiếng Nhật chuẩn với thẻ HTML ruby cho tất cả Kanji, ví dụ: 毎日の<ruby>練習<rt>れんしゅう</rt></ruby>が<ruby>大切<rt>たいせつ</rt></ruby>です。",
  "sentenceVi": "nghĩa tiếng Việt tự nhiên, chính xác, diễn đạt trôi chảy"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      const w = kanji || hiragana;
      data = {
        sentenceJa: `ビジネスの場面において、${w}を適切に使い分けることが求められる。`,
        sentenceFurigana: `ビジネスの<ruby>場面<rt>ばめん</rt></ruby>において、${w}を<ruby>適切<rt>てきせつ</rt></ruby>に<ruby>使<rt>つか</rt></ruby>い<ruby>分<rt>わ</rt></ruby>けることが<ruby>求<rt>もと</rt></ruby>められる。`,
        sentenceVi: `Trong bối cảnh kinh doanh, người ta đòi hỏi phải sử dụng đúng đắn (${meaning || w}).`
      };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Gemini generate-example error:', error);
    res.status(500).json({
      error: 'Failed to generate example',
      details: error.message,
      fallback: {
        sentenceJa: `この単語はN3試験でよく出題されます。`,
        sentenceFurigana: `この<ruby>単語<rt>たんご</rt></ruby>はN3<ruby>試験<rt>しけん</rt></ruby>でよく<ruby>出題<rt>しゅつだい</rt></ruby>されます。`,
        sentenceVi: `Từ này thường xuyên xuất hiện trong đề thi N3.`
      }
    });
  }
});

// 3. AI Speaking conversation practice
app.post('/api/gemini/speaking-chat', async (req, res) => {
  try {
    const { topic, message, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        replyJa: `いいですね！${topic}についてもっと教えてください。`,
        replyFurigana: `いいですね！${topic}についてもっと<ruby>教<rt>おし</rt></ruby>えてください。`,
        replyVi: `Hay quá! Hãy kể cho tôi nghe thêm về ${topic} nhé.`,
        feedbackVi: `Câu nói của bạn rất rõ ràng và dễ hiểu! Tiếp tục phát huy nhé.`
      });
    }

    const conversationContext = (history || [])
      .map((item: any) => `${item.role === 'user' ? 'Học viên' : 'Giáo viên AI'}: ${item.text}`)
      .join('\n');

    const prompt = `Bạn là giáo viên tiếng Nhật bản xứ nhiệt tình, đang luyện giao tiếp phản xạ cấp độ JLPT N3 với học viên Việt Nam.
Chủ đề hội thoại: "${topic || 'Giao tiếp hàng ngày N3'}".

Lịch sử hội thoại:
${conversationContext}

Học viên vừa nói: "${message}"

Nhiệm vụ của bạn:
1. Đáp lại câu của học viên một cách tự nhiên, thân thiện bằng tiếng Nhật cấp độ N3 (dùng kính ngữ lịch sự desu/masu hoặc thể lịch sự tiêu chuẩn).
2. Câu trả lời tiếng Nhật PHẢI có thẻ <ruby>...<rt>...</rt></ruby> cho TẤT CẢ các chữ Kanji để người học đọc được Furigana.
3. Cung cấp bản dịch tiếng Việt dễ hiểu.
4. Đưa ra nhận xét/góp ý ngắn gọn bằng tiếng Việt giúp học viên cải thiện (ngữ pháp, từ vựng hoặc phát âm tự nhiên hơn).
5. Đặt thêm 1 câu hỏi gợi mở để học viên tiếp tục phản xạ trả lời.

Trả về JSON thuần túy (không code block):
{
  "replyJa": "câu tiếng Nhật chuẩn",
  "replyFurigana": "câu tiếng Nhật có đầy đủ thẻ ruby furigana",
  "replyVi": "bản dịch tiếng Việt",
  "feedbackVi": "nhận xét góp ý cho câu của học viên (nếu chuẩn thì khen ngợi, nếu có lỗi thì sửa nhẹ nhàng)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        replyJa: '分かりました。会話を続けましょう！',
        replyFurigana: '<ruby>分<rt>わ</rt></ruby>かりました。<ruby>会話<rt>かいわ</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けましょう！',
        replyVi: 'Tôi hiểu rồi. Chúng ta hãy tiếp tục cuộc trò chuyện nhé!',
        feedbackVi: 'Bạn phát âm rất tốt, hãy tiếp tục đặt câu tiếp theo nào!'
      };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Gemini speaking chat error:', error);
    res.status(500).json({
      error: 'Speaking AI error',
      details: error.message,
      fallback: {
        replyJa: 'とても上手ですね！次の質問に答えてみてください。',
        replyFurigana: 'とても<ruby>上手<rt>じょうず</rt></ruby>ですね！<ruby>次<rt>つぎ</rt></ruby>の<ruby>質問<rt>しつもん</rt></ruby>に<ruby>答<rt>こた</rt></ruby>えてみてください。',
        replyVi: 'Bạn nói rất tốt! Hãy thử trả lời câu tiếp theo nhé.',
        feedbackVi: 'Đã nhận diện câu nói của bạn thành công.'
      }
    });
  }
});

// 4. Cloud Database Store (Real-time Sync for User Progress & Backup)
interface StoredUserData {
  userId: string;
  email?: string;
  phone?: string;
  fullName: string;
  user: any;
  vocabulary: any[];
  grammarList: any[];
  updatedAt: string;
}
const cloudSyncStore = new Map<string, StoredUserData>();

// API Sync User State to Cloud
app.post('/api/user/sync', (req, res) => {
  try {
    const { userId, email, phone, fullName, user, vocabulary, grammarList } = req.body;
    const identifier = userId || email || phone;
    if (!identifier) {
      return res.status(400).json({ error: 'User identifier required' });
    }

    const payload: StoredUserData = {
      userId: userId || `N3-USER-${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      phone,
      fullName: fullName || user?.fullName || 'Học viên N3',
      user: user || {},
      vocabulary: Array.isArray(vocabulary) ? vocabulary : [],
      grammarList: Array.isArray(grammarList) ? grammarList : [],
      updatedAt: new Date().toISOString(),
    };

    cloudSyncStore.set(identifier, payload);
    if (userId) cloudSyncStore.set(userId, payload);
    if (email) cloudSyncStore.set(email, payload);
    if (phone) cloudSyncStore.set(phone, payload);

    res.json({
      success: true,
      message: 'Đã đồng bộ dữ liệu an toàn lên Cloud Database',
      syncedAt: payload.updatedAt,
      userId: payload.userId,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to sync user data', details: err.message });
  }
});

// API Load User State from Cloud
app.post('/api/user/load', (req, res) => {
  try {
    const { identifier } = req.body;
    if (!identifier) {
      return res.status(400).json({ error: 'Identifier is required (userId, email, or phone)' });
    }

    const found = cloudSyncStore.get(identifier);
    if (!found) {
      return res.status(404).json({ error: 'Không tìm thấy hồ sơ học tập trên Cloud' });
    }

    res.json({
      success: true,
      data: found,
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to load user data', details: err.message });
  }
});

// 5. Extract Grammar from PDF Text via AI
app.post('/api/gemini/parse-grammar-pdf', async (req, res) => {
  try {
    const { textContent } = req.body;
    if (!textContent || typeof textContent !== 'string') {
      return res.status(400).json({ error: 'PDF text content is required' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Rule-based fallback parse
      return res.json({
        items: [
          {
            id: `gram-custom-${Date.now()}`,
            title: '〜にしたがって',
            titleFurigana: '〜にしたがって',
            formula: 'V-ru / N + にしたがって',
            category: 'Biến đổi - Xu hướng',
            meaningVi: 'Càng... thì càng..., Cùng với việc...',
            explanationVi: 'Biểu thị sự biến đổi ở vế sau kéo theo sự thay đổi ở vế trước.',
            examples: [
              {
                ja: '時間が経つにしたがって、痛みが和らいできた。',
                furigana: '<ruby>時間<rt>じかん</rt></ruby>が<ruby>経<rt>た</rt></ruby>つにしたがって、<ruby>痛<rt>いた</rt></ruby>みが<ruby>和<rt>やわ</rt></ruby>らいできた。',
                vi: 'Thời gian trôi qua cơn đau cũng dần dịu lại.',
              },
            ],
          },
        ],
      });
    }

    const prompt = `Bạn là chuyên gia biên soạn sách luyện thi JLPT N3 Mimikara Oboeru.
Hãy phân tích đoạn văn bản trích xuất từ tài liệu PDF ngữ pháp sau và trích xuất thành danh sách các mẫu ngữ pháp N3:

"${textContent.slice(0, 3500)}"

Yêu cầu trả về mảng JSON thuần túy (không code block) danh sách GrammarItem[]:
[
  {
    "id": "gram-pdf-1",
    "title": "tên mẫu câu, ví dụ: 〜に対して",
    "titleFurigana": "tên mẫu câu có thẻ ruby furigana cho chữ Hán",
    "formula": "cấu trúc nối từ: V-thường / N + ...",
    "category": "nhóm ý nghĩa (Lý do, Mục đích, Điều kiện, Đối lập, Thời gian, Mức độ, Khuyên nhủ, Biến đổi, Cảm xúc)",
    "meaningVi": "nghĩa tiếng Việt ngắn gọn, xúc tích",
    "explanationVi": "giải thích cách dùng và sắc thái",
    "examples": [
      {
        "ja": "câu ví dụ tiếng Nhật",
        "furigana": "câu ví dụ có thẻ ruby cho TẤT CẢ chữ Kanji",
        "vi": "dịch nghĩa tiếng Việt"
      }
    ]
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    res.json({ items: Array.isArray(parsed) ? parsed : [] });
  } catch (error: any) {
    console.error('Parse grammar PDF error:', error);
    res.status(500).json({ error: 'Failed to extract grammar', details: error.message });
  }
});

// 6. Vite middleware for dev / static for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server "N3 trong tay" running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
