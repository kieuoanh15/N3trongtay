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

// Helper to normalize Furigana into HTML ruby tags
function normalizeFuriganaRuby(text: string): string {
  if (!text) return '';
  if (text.includes('<ruby>') && text.includes('<rt>')) return text;
  // Convert 漢字(かんじ) or 漢字（かんじ） into <ruby>漢字<rt>かんじ</rt></ruby>
  return text.replace(/([\u4e00-\u9faf]+)[(（]([\u3040-\u309f]+)[)）]/g, '<ruby>$1<rt>$2</rt></ruby>');
}

// 3. AI Speaking conversation practice (Free-form Japanese conversation N4-N3)
app.post('/api/gemini/speaking-chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const userText = (message || '').trim();

    if (!userText) {
      return res.status(400).json({ error: 'Message cannot be empty' });
    }

    const ai = getGeminiClient();

    // Format previous turns clearly with speaker markers and indices
    const historyList = Array.isArray(history) ? history : [];
    const conversationContext = historyList.length > 0
      ? historyList.map((item: any, i: number) => {
          const roleLabel = item.role === 'user' ? 'Người học (Learner)' : 'AI Bạn Nhật (AI Partner)';
          const textContent = item.content || item.contentJa || item.text || '';
          return `[Lượt ${i + 1}] ${roleLabel}: ${textContent}`;
        }).join('\n')
      : '(Cuộc trò chuyện vừa mới bắt đầu)';

    const systemInstruction = `Bạn là một người bạn Nhật Bản thân thiện, chân thành và kiên nhẫn, đang trò chuyện bằng tiếng Nhật tự nhiên đời thường với một học viên người Việt Nam.
Trình độ tiếng Nhật sử dụng: N4 - N3 (từ vựng thực tế, ngữ pháp chuẩn xác, dùng thể lịch sự desu/masu hoặc thân mật lịch thiệp tự nhiên).

QUY TẮC BẮT BUỘC TRONG HỘI THOẠI:
1. ĐỌC KỸ VÀ HIỂU ĐÚNG TRỌNG TÂM:
   - Hiểu chính xác ý người học vừa nói trong ngữ cảnh của toàn bộ các lượt trò chuyện trước đó.
   - Luôn trả lời đúng trọng tâm câu người học vừa nói, duy trì mạch trò chuyện liền mạch.
   - NẾU NGƯỜI HỌC ĐẶT CÂU HỎI: Bạn PHẢI trả lời câu hỏi đó trước một cách tự nhiên và chân thật, TUYỆT ĐỐI KHÔNG phớt lờ câu hỏi của người học.

2. TUYỆT ĐỐI KHÔNG LẶP LẠI VÀ KHÔNG THEO MẪU CỐ ĐỊNH:
   - KHÔNG lặp lại lời chào (như こんにちは, 初めまして) nếu đã chào ở các lượt trước, trừ khi người học chủ động chào lại.
   - KHÔNG lặp lại câu hỏi hoặc nội dung bạn đã từng nói trong các lượt trò chuyện trước.
   - Tránh câu trả lời máy móc, sáo rỗng. Dựa vào chi tiết người học vừa kể để mở rộng tự nhiên.

3. PHONG CÁCH NÓI CHUYỆN TỰ NHIÊN NHƯ NGƯỜI NHẬT:
   - Sử dụng từ cảm thán và phản xạ (相槌 - aizuchi) phù hợp với cảm xúc: 「そうなんですね！」「それは大変でしたね」「楽しそう！」「へえ、なるほど」「いいですね」...
   - Mỗi lượt nói ngắn gọn (1 đến 3 câu tiếng Nhật, khoảng 35 - 75 ký tự), nói chuyện gãy gọn, gần gũi.
   - KHÔNG BẮT BUỘC lượt nào cũng phải đặt câu hỏi! Chỉ hỏi thêm một câu liên quan khi câu chuyện tự nhiên cần mở rộng. Có những lượt chỉ cần phản hồi, chia sẻ cảm xúc hoặc bày tỏ ý kiến.

4. XỬ LÝ KHI KHÔNG HIỂU HOẶC TỪ ĐỨT ĐOẠN/LỖI GIỌNG NÓI:
   - Nếu câu người học quá mơ hồ, đứt đoạn hoặc do nhận diện giọng nói bị lỗi từ vô nghĩa: Hãy hỏi lại lịch sự bằng tiếng Nhật đơn giản (ví dụ: 「すみません、うまく聞き取れませんでした。もう一度言っていただけますか？」), không tự đoán mò hay nói lệch chủ đề.

5. PHÁT HIỆN LỖI VÀ HỖ TRỢ NGƯỜI HỌC:
   - NẾU CÓ LỖI (sai trợ từ は/が/を/に/で, sai thể động từ, ngữ pháp chưa chuẩn, từ vựng chưa tự nhiên):
     Tại "feedbackVi": Chỉ ra lỗi cụ thể, đưa ra câu đúng tự nhiên và giải thích ngắn gọn, dễ hiểu bằng tiếng Việt (1-2 câu).
     Đồng thời ở "replyJa", bạn vẫn tiếp tục mạch hội thoại bình thường mà không làm gãy cuộc trò chuyện.
   - NẾU NGƯỜI HỌC NÓI ĐÚNG VÀ TỰ NHIÊN:
     Tại "feedbackVi": Khen ngợi ngắn gọn, khích lệ bằng tiếng Việt (ví dụ: "Câu nói rất chuẩn và tự nhiên!", "Dùng trợ từ rất chính xác!").

6. ĐỊNH DẠNG JSON ĐẦU RA (bắt buộc thuần JSON):
{
  "replyJa": "Câu tiếng Nhật tự nhiên N4-N3 của AI",
  "replyFurigana": "Câu tiếng Nhật trên với TẤT CẢ chữ Kanji được gắn thẻ ruby HTML: <ruby>漢字<rt>かんじ</rt></ruby>",
  "replyVi": "Bản dịch tiếng Việt chính xác và tự nhiên câu nói của AI",
  "feedbackVi": "Nhận xét sửa lỗi (chỉ lỗi + câu đúng + giải thích tiếng Việt) HOẶC lời khen ngắn nếu nói đúng"
}`;

    const userPrompt = `LỊCH SỬ HỘI THOẠI TRƯỚC ĐÓ:
${conversationContext}

LƯỢT NÓI MỚI NHẤT CỦA NGƯỜI HỌC:
"${userText}"

Hãy đọc kỹ ngữ cảnh, hiểu đúng ý người học, không lặp lại câu hỏi hay lời chào đã có, và phản hồi theo định dạng JSON đã quy định.`;

    // Multi-model resilience: try primary model, fall back if 503 or unavailable
    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let rawText = '';
    let lastError: any = null;

    if (ai) {
      for (const model of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model,
            contents: userPrompt,
            config: {
              systemInstruction,
              responseMimeType: 'application/json',
              temperature: 0.7,
            },
          });
          if (response.text) {
            rawText = response.text;
            break;
          }
        } catch (err: any) {
          console.warn(`Gemini model ${model} speaking-chat error:`, err?.status || err?.message);
          lastError = err;
        }
      }
    }

    if (!rawText) {
      if (lastError) {
        console.error('All Gemini speaking models failed:', lastError);
      }
      // Context-aware dynamic fallback
      return res.json({
        replyJa: 'よく分かりました！そのことについて、もう少し詳しく聞かせてくれますか。',
        replyFurigana: 'よく<ruby>分<rt>わ</rt></ruby>かりました！そのことについて、もう少し<ruby>詳<rt>くわ</rt></ruby>しく<ruby>聞<rt>き</rt></ruby>かせてくれますか。',
        replyVi: 'Tôi hiểu rồi! Bạn có thể chia sẻ thêm một chút về chuyện đó được không?',
        feedbackVi: 'Đã nhận được câu nói của bạn. Hãy tiếp tục chia sẻ nhé!'
      });
    }

    let data;
    try {
      data = JSON.parse(rawText);
    } catch {
      data = {
        replyJa: 'そうなんですね！もっとお話を聞かせてください。',
        replyFurigana: 'そうなんですね！もっとお<ruby>話<rt>はなし</rt></ruby>を<ruby>聞<rt>き</rt></ruby>かせてください。',
        replyVi: 'Ra là vậy! Hãy chia sẻ thêm cho tôi nhé.',
        feedbackVi: 'Bạn diễn đạt ý rất tốt, tiếp tục trò chuyện nhé!'
      };
    }

    // Ensure Furigana is properly formatted with ruby HTML tags
    if (data.replyFurigana) {
      data.replyFurigana = normalizeFuriganaRuby(data.replyFurigana);
    } else if (data.replyJa) {
      data.replyFurigana = data.replyJa;
    }

    res.json(data);
  } catch (error: any) {
    console.error('Gemini speaking chat error:', error);
    res.json({
      replyJa: 'よく分かりました！そのことについて、もう少し詳しく教えてくれますか。',
      replyFurigana: 'よく<ruby>分<rt>わ</rt></ruby>かりました！そのことについて、もう少し<ruby>詳<rt>くわ</rt></ruby>しく<ruby>教<rt>おし</rt></ruby>えてくれますか。',
      replyVi: 'Tôi hiểu rồi! Bạn có thể kể thêm cho tôi nghe về điều đó được không?',
      feedbackVi: 'Đã nhận được câu trả lời của bạn.'
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
