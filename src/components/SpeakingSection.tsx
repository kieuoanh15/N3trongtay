import React, { useState, useRef, useEffect } from 'react';
import { 
  Mic, 
  Send, 
  Volume2, 
  Sparkles, 
  Bot, 
  User, 
  RefreshCw,
  RotateCcw,
  Award,
  Lock,
  LogIn
} from 'lucide-react';
import { ThemePreset } from '../utils/themePresets';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface SpeakingSectionProps {
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
  isGuestMode?: boolean;
  onRequireLogin?: (feature: string) => void;
}

interface ChatMessage {
  role: 'user' | 'model';
  contentJa: string;
  contentFurigana?: string;
  contentVi?: string;
  feedbackVi?: string;
}

// AI starts the conversation naturally with an initial N4-N3 greeting and question
const INITIAL_AI_GREETING: ChatMessage = {
  role: 'model',
  contentJa: 'こんにちは！今日はどんな一日でしたか。何か楽しいことがありましたか。',
  contentFurigana: 'こんにちは！<ruby>今日<rt>きょう</rt></ruby>はどんな<ruby>一日<rt>いちにち</rt></ruby>でしたか。<ruby>何<rt>なに</rt></ruby>か<ruby>楽<rt>たの</rt></ruby>しいことがありましたか。',
  contentVi: 'Xin chào! Hôm nay của bạn thế nào? Có chuyện gì vui không?',
  feedbackVi: 'Hãy trả lời câu hỏi bằng tiếng Nhật (gõ chữ hoặc bấm Micro) để bắt đầu luyện tập nhé!',
};

export const SpeakingSection: React.FC<SpeakingSectionProps> = ({
  isDarkMode,
  activePreset,
  onAddGold,
  isGuestMode = false,
  onRequireLogin,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_AI_GREETING]);
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

  // Reset conversation to start fresh
  const handleResetConversation = () => {
    setMessages([INITIAL_AI_GREETING]);
    setInputVal('');
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
          contentJa: 'よく分かりました！最近、日本のアニメや音楽で好きなものはありますか。',
          contentFurigana: 'よく<ruby>分<rt>わ</rt></ruby>かりました！<ruby>最近<rt>さいきん</rt></ruby>、<ruby>日本<rt>にほん</rt></ruby>のアニメや<ruby>音楽<rt>おんがく</rt></ruby>で<ruby>好<rt>す</rt></ruby>きなものはありますか。',
          contentVi: 'Tôi hiểu rồi! Gần đây bạn có thích anime hay âm nhạc Nhật Bản nào không?',
          feedbackVi: 'Đã nhận được câu trả lời của bạn. Bạn diễn đạt rất rõ ràng!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Guest Lock Banner */}
      {isGuestMode && (
        <div 
          onClick={() => onRequireLogin && onRequireLogin('luyện phản xạ nói hội thoại AI')}
          className="p-6 rounded-3xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-center space-y-3 shadow-md cursor-pointer hover:border-amber-400 transition-all"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-200 dark:bg-amber-900 text-amber-600 dark:text-amber-300 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
              Luyện Hội Thoại Tiếng Nhật Tự Do Với AI Yêu Cầu Đăng Nhập Google
            </h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Chế độ khách chỉ cho phép xem trước cuộc hội thoại. Để trò chuyện trực tiếp bằng giọng nói, nhận AI chỉnh sửa lỗi ngữ pháp kèm giải thích tiếng Việt và nhận thưởng Vàng, vui lòng đăng nhập tài khoản Google.
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRequireLogin && onRequireLogin('luyện phản xạ nói hội thoại AI');
            }}
            className="px-6 py-2.5 rounded-xl font-black text-xs text-white shadow-md cursor-pointer inline-flex items-center gap-2"
            style={{ backgroundColor: activePreset.primary }}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập Bằng Google Để Luyện Nói</span>
          </button>
        </div>
      )}

      {/* Top Banner (Free Conversation, No Scenario Buttons) */}
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
              AI Speaking Free Chat N4–N3
            </span>
            <span className="text-xs text-emerald-500 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Thưởng +15 Vàng/lượt
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Luyện Nói Tiếng Nhật Tự Do Với AI
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Trò chuyện tự do không giới hạn chủ đề (N4–N3). AI chủ động bắt chuyện, hỏi từng câu, sửa lỗi ngữ pháp và giải thích bằng tiếng Việt.
          </p>
        </div>

        {/* Reset Conversation Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetConversation}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 hover:opacity-80 cursor-pointer shadow-xs"
            style={{
              backgroundColor: isDarkMode ? '#222A36' : '#F1F5F9',
              borderColor: isDarkMode ? '#334155' : '#E2E8F0',
              color: isDarkMode ? '#E2E8F0' : '#475569',
            }}
            title="Bắt đầu lại cuộc trò chuyện mới"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Trò chuyện mới</span>
          </button>
        </div>
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
                    {m.contentVi && (
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                          → {m.contentVi}
                        </p>
                        <button
                          onClick={() => playAudio(m.contentJa)}
                          className="p-1 rounded-md text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors cursor-pointer"
                          title="Nghe phát âm của AI"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* AI Feedback & Correction if available */}
                    {m.feedbackVi && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-[11px] font-medium flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{m.feedbackVi}</span>
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
              AI đang phân tích câu nói và chuẩn bị câu trả lời...
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
          className={`p-3.5 rounded-2xl border transition-all active:scale-95 shadow-xs shrink-0 cursor-pointer ${
            isListening ? 'bg-rose-500 text-white animate-pulse' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          style={{
            backgroundColor: isListening ? undefined : (isDarkMode ? '#1E232A' : '#FFFFFF'),
            borderColor: isListening ? '#F43F5E' : (isDarkMode ? '#2D3748' : '#CBD5E1'),
          }}
          title={isListening ? 'Đang lắng nghe tiếng Nhật... bấm để dừng' : 'Bật Micro nói tiếng Nhật'}
        >
          <Mic className="w-5 h-5" />
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
          className="p-3.5 rounded-2xl text-white transition-all active:scale-95 shadow-sm disabled:opacity-50 shrink-0 cursor-pointer"
          style={{ backgroundColor: activePreset.primary }}
          title="Gửi câu trả lời"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
