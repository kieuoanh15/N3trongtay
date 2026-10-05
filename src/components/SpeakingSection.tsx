import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw,
  MessageSquare,
  Award
} from 'lucide-react';
import { ThemePreset } from '../utils/themePresets';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface SpeakingSectionProps {
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  contentJa: string;
  contentFurigana?: string;
  contentVi?: string;
  feedbackVi?: string;
}

const SCENARIOS = [
  {
    id: 'baito',
    title: 'Phỏng Vấn Xin Việc (アルバイトの面接)',
    context: 'Bạn đang phỏng vấn xin làm thêm tại một cửa hàng tiện lợi ở Tokyo. Hãy trả lời các câu hỏi của người quản lý bằng kính ngữ N3 lịch sự.',
    initialAi: '初めまして。本日は面接にお越しいただきありがとうございます。まずはお名前と志望動機を教えていただけますか。',
    initialFurigana: '<ruby>初<rt>はじ</rt></ruby>めまして。<ruby>本日<rt>ほんじつ</rt></ruby>は<ruby>面接<rt>めんせつ</rt></ruby>にお<ruby>越<rt>こ</rt></ruby>しいただきありがとうございます。まずは、お<ruby>名前<rt>なまえ</rt></ruby>と<ruby>志望<rt>しぼう</rt></ruby><ruby>動機<rt>どうき</rt></ruby>を<ruby>教<rt>おし</rt></ruby>えていただけますか。',
    initialVi: 'Rất vui được gặp bạn. Cảm ơn bạn đã đến phỏng vấn hôm nay. Trước tiên, bạn hãy giới thiệu tên và lý do muốn ứng tuyển nhé.',
  },
  {
    id: 'work-leave',
    title: 'Xin Nghỉ Phép Tại Công Ty (会社で休暇を取る)',
    context: 'Bạn bị ốm hoặc có việc gia đình, cần gọi điện/nói chuyện với cấp trên (Bucho/Kacho) để xin nghỉ một ngày.',
    initialAi: '田中さん、どうしましたか。顔色が少し悪いようですが、何かありましたか。',
    initialFurigana: '<ruby>田中<rt>たなか</rt></ruby>さん、どうしましたか。<ruby>顔色<rt>かおいろ</rt></ruby>が<ruby>少<rt>すこ</rt></ruby>し<ruby>悪<rt>わる</rt></ruby>いようですが、<ruby>何<rt>なに</rt></ruby>かありましたか。',
    initialVi: 'Tanaka, có chuyện gì vậy? Sắc mặt của bạn trông hơi nhợt nhạt, có chuyện gì xảy ra thế?',
  },
  {
    id: 'culture',
    title: 'Trò Chuyện Văn Hóa & Cuộc Sống (日本の生活・文化)',
    context: 'Bạn trò chuyện với bạn người Nhật về cảm nhận cuộc sống, món ăn và địa điểm du lịch muốn đến ở Nhật.',
    initialAi: 'こんにちは！日本に来てそろそろ3ヶ月ですね。日本の生活にはもう慣れましたか。何か困っていることはありませんか。',
    initialFurigana: 'こんにちは！<ruby>日本<rt>にほん</rt></ruby>に<ruby>来<rt>き</rt></ruby>てそろそろ３ヶ<ruby>月<rt>げつ</rt></ruby>ですね。<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>にはもう<ruby>慣<rt>な</rt></ruby>れましたか。<ruby>何<rt>なに</rt></ruby>か<ruby>困<rt>こま</rt></ruby>っていることはありませんか。',
    initialVi: 'Xin chào! Bạn sang Nhật cũng được khoảng 3 tháng rồi nhỉ. Bạn đã quen với cuộc sống ở đây chưa, có gặp khó khăn gì không?',
  },
];

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [selectedScenario, setSelectedScenario] = useState(SCENARIOS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      contentJa: SCENARIOS[0].initialAi,
      contentFurigana: SCENARIOS[0].initialFurigana,
      contentVi: SCENARIOS[0].initialVi,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const playAudio = (text: string) => {
    playJapaneseAudio(text, 0.9);
  };

  // Speech Recognition (Web Speech API)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói Web Speech. Bạn có thể gõ văn bản vào ô tin nhắn!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'ja-JP';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      setInputVal(prev => prev ? `${prev} ${transcript}` : transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  // Send message to Gemini AI Speaking API
  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    const userText = inputVal.trim();
    setInputVal('');

    const newMsgs: ChatMessage[] = [
      ...messages,
      { role: 'user', contentJa: userText },
    ];
    setMessages(newMsgs);
    setIsLoading(true);

    try {
      const historyPayload = messages.map(m => ({
        role: m.role,
        content: m.contentJa,
      }));

      const res = await fetch('/api/gemini/speaking-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          scenarioContext: selectedScenario.context,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      if (data.replyJa) {
        setMessages(prev => [
          ...prev,
          {
            role: 'model',
            contentJa: data.replyJa,
            contentFurigana: data.replyFurigana || data.replyJa,
            contentVi: data.replyVi || '',
            feedbackVi: data.feedbackVi || undefined,
          },
        ]);
        onAddGold(15); // Reward 15 gold per turn
        playAudio(data.replyJa);
      }
    } catch {
      // Fallback response if network issue
      setMessages(prev => [
        ...prev,
        {
          role: 'model',
          contentJa: 'よく分かりました！その調子でどんどん日本語を話してみましょう。',
          contentFurigana: 'よく<ruby>分<rt>わ</rt></ruby>かりました！その<ruby>調子<rt>ちょうし</rt></ruby>でどんどん<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>話<rt>はな</rt></ruby>してみましょう。',
          contentVi: 'Tôi đã hiểu rất rõ! Cứ phát huy phong độ đó và tiếp tục nói tiếng Nhật nhé.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectScenario = (sc: typeof SCENARIOS[0]) => {
    setSelectedScenario(sc);
    setMessages([
      {
        role: 'model',
        contentJa: sc.initialAi,
        contentFurigana: sc.initialFurigana,
        contentVi: sc.initialVi,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div 
        className="p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              AI Speaking Reflex N3
            </span>
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Thưởng +15 Vàng/lượt
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Luyện Nói Tiếng Nhật Phản Xạ Trực Tiếp Với AI
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Tương tác giọng nói và văn bản. AI chỉnh sửa ngữ pháp, cung cấp Furigana và bản dịch chi tiết.
          </p>
        </div>

        {/* Scenario Selector Dropdown */}
        <div className="flex items-center gap-2">
          {SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedScenario.id === sc.id
                  ? 'text-white shadow-xs'
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              style={{
                backgroundColor: selectedScenario.id === sc.id ? activePreset.primary : undefined,
              }}
            >
              {sc.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Briefing */}
      <div 
        className="p-3.5 rounded-2xl border text-xs flex items-center gap-2.5"
        style={{
          backgroundColor: isDarkMode ? '#232A35' : activePreset.light,
          borderColor: isDarkMode ? '#374151' : '#E2E8F0',
          color: activePreset.dark,
        }}
      >
        <MessageSquare className="w-4 h-4 shrink-0" style={{ color: activePreset.primary }} />
        <span><strong>Tình huống:</strong> {selectedScenario.context}</span>
      </div>

      {/* Chat Messages Box */}
      <div 
        className="p-4 sm:p-6 rounded-3xl border min-h-[420px] max-h-[500px] overflow-y-auto space-y-4 shadow-inner"
        style={{
          backgroundColor: isDarkMode ? '#171B21' : '#F9FBFC',
          borderColor: isDarkMode ? '#28313E' : '#E8EEF5',
        }}
      >
        {messages.map((m, idx) => {
          const isAi = m.role === 'model';
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
            >
              {/* Avatar Icon */}
              <div 
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm text-sm ${
                  isAi ? 'text-white' : 'bg-gray-800 text-white'
                }`}
                style={{ backgroundColor: isAi ? activePreset.primary : undefined }}
              >
                {isAi ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div 
                className={`max-w-[85%] p-4 rounded-3xl space-y-2 text-sm shadow-xs ${
                  isAi 
                    ? 'rounded-tl-xs' 
                    : 'rounded-tr-xs text-white'
                }`}
                style={{
                  backgroundColor: isAi 
                    ? (isDarkMode ? '#222A36' : '#FFFFFF')
                    : activePreset.primary,
                  borderColor: isAi 
                    ? (isDarkMode ? '#313C4D' : '#E2E8F0')
                    : undefined,
                  borderWidth: isAi ? 1 : 0,
                  color: isAi 
                    ? (isDarkMode ? '#F8FAFC' : '#1E293B')
                    : '#FFFFFF',
                }}
              >
                {/* Japanese text with Furigana */}
                <div className="font-bold leading-loose text-sm sm:text-base">
                  {isAi && m.contentFurigana ? (
                    <FuriganaText content={m.contentFurigana} />
                  ) : (
                    m.contentJa
                  )}
                </div>

                {/* AI Audio & Vietnamese Translation */}
                {isAi && (
                  <div className="pt-1.5 border-t border-gray-100 dark:border-gray-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        → {m.contentVi}
                      </p>
                      <button
                        onClick={() => playAudio(m.contentJa)}
                        className="p-1 rounded-md text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        title="Nghe phát âm của AI"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* AI Feedback if available */}
                    {m.feedbackVi && (
                      <div className="mt-2 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-[11px] font-medium flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{m.feedbackVi}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-sm"
              style={{ backgroundColor: activePreset.primary }}
            >
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div 
              className="px-4 py-3 rounded-2xl rounded-tl-xs border text-xs font-semibold flex items-center gap-2"
              style={{
                backgroundColor: isDarkMode ? '#222A36' : '#FFFFFF',
                borderColor: isDarkMode ? '#313C4D' : '#E2E8F0',
                color: isDarkMode ? '#CBD5E1' : '#64748B',
              }}
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-500" />
              AI Sensei đang phân tích câu nói và trả lời...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field & Speech Microphone */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <button
          type="button"
          onClick={toggleListening}
          className={`p-3.5 rounded-2xl border transition-all active:scale-95 shadow-xs shrink-0 ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          style={{
            backgroundColor: isListening ? undefined : (isDarkMode ? '#1E232A' : '#FFFFFF'),
            borderColor: isListening ? '#F43F5E' : (isDarkMode ? '#2D3748' : '#CBD5E1'),
          }}
          title={isListening ? 'Đang lắng nghe tiếng Nhật... bấm để dừng' : 'Bật Micro nói tiếng Nhật'}
        >
          {isListening ? <Mic className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          placeholder="Nhập câu trả lời bằng tiếng Nhật hoặc bấm Micro để nói..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-3.5 rounded-2xl text-xs sm:text-sm border outline-none font-medium shadow-xs"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#CBD5E1',
            color: isDarkMode ? '#F8FAFC' : '#1E293B',
          }}
        />

        <button
          type="submit"
          disabled={isLoading || !inputVal.trim()}
          className="p-3.5 rounded-2xl text-white transition-all active:scale-95 shadow-sm disabled:opacity-50 shrink-0"
          style={{ backgroundColor: activePreset.primary }}
          title="Gửi câu trả lời"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
