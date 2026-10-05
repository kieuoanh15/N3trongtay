import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  AlertCircle, 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Trophy, 
  RotateCcw,
  BookOpen,
  FileCheck,
  HelpCircle
} from 'lucide-react';
import { ExamMock } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { FuriganaText } from './FuriganaText';

interface ExamSectionProps {
  exams: ExamMock[];
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const ExamSection: React.FC<ExamSectionProps> = ({
  exams,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [currentExam, setCurrentExam] = useState<ExamMock>(exams[0]);
  const [secondsRemaining, setSecondsRemaining] = useState(currentExam.totalTimeMinutes * 60);
  const [timerRunning, setTimerRunning] = useState(true);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [unansweredWarning, setUnansweredWarning] = useState<string | null>(null);
  const [audioPlayingId, setAudioPlayingId] = useState<string | null>(null);

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || isSubmitted) return;
    const interval = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleAutoSubmitOnTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, isSubmitted]);

  const handleAutoSubmitOnTimeOut = () => {
    setIsSubmitted(true);
    setTimerRunning(false);
    alert('Hết giờ làm bài thi JLPT N3! Hệ thống đang tự động chấm điểm bài thi của bạn.');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Play Full Japanese Listening Audio (Web Speech API)
  const playListeningAudio = (qId: string, scriptJa: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setAudioPlayingId(qId);
      const cleanText = scriptJa.replace(/<rt[\s\S]*?<\/rt>/gi, '').replace(/<[^>]+>/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja'));
      if (jaVoice) utterance.voice = jaVoice;
      utterance.onend = () => setAudioPlayingId(null);
      utterance.onerror = () => setAudioPlayingId(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Check before submission (MANDATORY REQUIREMENT: Chỉ cho phép Nộp bài khi đã hoàn thành TẤT CẢ các câu hỏi)
  const handleSubmitExam = () => {
    const unansweredList = currentExam.questions.filter(q => userAnswers[q.id] === undefined);
    if (unansweredList.length > 0) {
      setUnansweredWarning(`Bạn chưa hoàn thành hết tất cả câu hỏi! Còn ${unansweredList.length} câu chưa chọn đáp án. Quy chế thi yêu cầu phải trả lời đủ tất cả các câu trước khi nộp.`);
      return;
    }

    setUnansweredWarning(null);
    setIsSubmitted(true);
    setTimerRunning(false);

    // Calculate score
    let correctCount = 0;
    currentExam.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const reward = correctCount * 30;
    onAddGold(reward);
  };

  // Reset exam
  const handleResetExam = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setSecondsRemaining(currentExam.totalTimeMinutes * 60);
    setTimerRunning(true);
    setUnansweredWarning(null);
  };

  const totalQuestions = currentExam.questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = currentExam.questions.filter(q => userAnswers[q.id] === q.correctIndex).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 60;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner with Exam Title and Floating Timer */}
      <div 
        className="p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-20 shadow-md backdrop-blur-md"
        style={{
          backgroundColor: isDarkMode ? '#1E232AE8' : '#FFFFFFE8',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              Mô Phỏng Kỳ Thi Thật JLPT N3
            </span>
            <span className="text-xs text-gray-500 font-semibold">{currentExam.year}</span>
          </div>
          <h2 className="text-lg font-black text-gray-900 dark:text-gray-100">
            {currentExam.title}
          </h2>
          <p className="text-xs text-gray-400">
            Đã làm: <span className="font-bold text-blue-500">{answeredCount}/{totalQuestions} câu</span>
          </p>
        </div>

        {/* Real-time Countdown Timer & Controls */}
        <div className="flex items-center gap-3">
          <div 
            id="exam-timer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border font-mono text-base font-black shadow-inner"
            style={{
              backgroundColor: secondsRemaining < 300 
                ? '#FEE2E2' 
                : (isDarkMode ? '#2D3748' : '#F8FAFC'),
              borderColor: secondsRemaining < 300 
                ? '#EF4444' 
                : (isDarkMode ? '#4A5568' : '#CBD5E1'),
              color: secondsRemaining < 300 
                ? '#DC2626' 
                : (isDarkMode ? '#F8FAFC' : '#1E293B'),
            }}
          >
            <Clock className={`w-4 h-4 ${secondsRemaining < 300 ? 'animate-bounce text-rose-500' : 'text-blue-500'}`} />
            <span>{formatTime(secondsRemaining)}</span>
          </div>

          {!isSubmitted ? (
            <button
              id="btn-submit-exam"
              onClick={handleSubmitExam}
              className="px-5 py-2.5 rounded-2xl text-xs font-black text-white transition-transform active:scale-95 shadow-sm hover:opacity-90"
              style={{ backgroundColor: activePreset.primary }}
            >
              Nộp Bài Thi
            </button>
          ) : (
            <button
              onClick={handleResetExam}
              className="flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-bold border transition-all hover:opacity-80"
              style={{
                backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                color: isDarkMode ? '#E2E8F0' : '#334155',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              Thi lại
            </button>
          )}
        </div>
      </div>

      {/* Warning Notice if user tries to submit without answering all questions */}
      {unansweredWarning && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in shake duration-150">
          <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          <span>{unansweredWarning}</span>
        </div>
      )}

      {/* Exam Score Summary if Submitted */}
      {isSubmitted && (
        <div 
          className="p-6 rounded-3xl border shadow-lg space-y-4 animate-in zoom-in-95 duration-200"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isPassed ? '#10B981' : '#F43F5E',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-gray-200 dark:border-gray-700">
            <div>
              <span 
                className="text-xs font-black uppercase px-2.5 py-1 rounded-lg"
                style={{
                  backgroundColor: isPassed ? '#ECFDF5' : '#FFF1F2',
                  color: isPassed ? '#059669' : '#E11D48',
                }}
              >
                {isPassed ? '🎉 KẾT QUẢ: ĐẠT (合格)' : '⚠️ KẾT QUẢ: CHƯA ĐẠT (不合格)'}
              </span>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 mt-2">
                Bạn đạt {correctCount}/{totalQuestions} câu đúng ({scorePercent}%)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isPassed 
                  ? 'Chúc mừng bạn! Phong độ rất tốt, sẵn sàng cho kỳ thi N3 chính thức.'
                  : 'Đừng nản lòng! Hãy xem kỹ Script bài nghe và Lời giải chi tiết bên dưới để bổ sung lỗ hổng kiến thức.'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-3xl font-black" style={{ color: activePreset.primary }}>
                {Math.round((correctCount / totalQuestions) * 180)}/180
              </span>
              <p className="text-xs text-gray-400">Điểm quy đổi chuẩn JLPT</p>
            </div>
          </div>
        </div>
      )}

      {/* List of Questions */}
      <div className="space-y-6">
        {currentExam.questions.map((q, qIndex) => {
          const isListening = q.section === 'Nghe Hiểu (Choukai)';
          const selectedOption = userAnswers[q.id];
          const isSelected = selectedOption !== undefined;
          const isCorrect = isSelected && selectedOption === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-3xl border shadow-xs space-y-4"
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isSubmitted
                  ? (isCorrect ? '#10B981' : '#F43F5E')
                  : (isDarkMode ? '#2D3748' : '#E8EEF5'),
              }}
            >
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                    style={{
                      backgroundColor: isListening ? '#E0F2FE' : activePreset.badgeBg,
                      color: isListening ? '#0284C7' : activePreset.primary,
                    }}
                  >
                    Phần {qIndex + 1}: {q.section}
                  </span>
                  {isListening && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      100% Tiếng Nhật
                    </span>
                  )}
                </div>

                {isSubmitted && (
                  <span className="text-xs font-bold flex items-center gap-1">
                    {isCorrect ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đúng
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Sai (Đáp án: {q.correctIndex + 1})
                      </span>
                    )}
                  </span>
                )}
              </div>

              {/* Listening Audio Player (100% Japanese Audio) */}
              {isListening && q.audioScriptJa && (
                <div 
                  className="p-4 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#232A35' : '#F0F9FF',
                    borderColor: '#BAE6FD',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => playListeningAudio(q.id, q.audioScriptJa || '')}
                      className="p-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md active:scale-95 flex items-center justify-center shrink-0"
                      title="Nghe đoạn hội thoại (Full Tiếng Nhật 100%)"
                    >
                      <Volume2 className={`w-5 h-5 ${audioPlayingId === q.id ? 'animate-pulse' : ''}`} />
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        Phần Nghe Hiểu Choukai (Full Japanese Audio)
                      </h4>
                      <p className="text-[11px] text-gray-500">
                        {audioPlayingId === q.id ? '🔊 Đang phát âm thanh tiếng Nhật...' : 'Bấm nút để nghe toàn bộ bài đàm thoại'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Question Text with Furigana */}
              <div className="text-sm sm:text-base font-black text-gray-900 dark:text-gray-100 leading-relaxed whitespace-pre-line">
                <FuriganaText content={q.questionFurigana || q.questionJa} />
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isOptSelected = selectedOption === optIdx;
                  const isRightOpt = optIdx === q.correctIndex;

                  let bg = isDarkMode ? '#242B36' : '#F8FAFC';
                  let border = isDarkMode ? '#333D4C' : '#E2E8F0';
                  let color = isDarkMode ? '#F1F5F9' : '#1E293B';

                  if (isSubmitted) {
                    if (isRightOpt) {
                      bg = isDarkMode ? '#064E3B' : '#ECFDF5';
                      border = '#10B981';
                      color = isDarkMode ? '#A7F3D0' : '#065F46';
                    } else if (isOptSelected && !isRightOpt) {
                      bg = isDarkMode ? '#4C1D24' : '#FFF1F2';
                      border = '#F43F5E';
                      color = isDarkMode ? '#FECDD3' : '#9F1239';
                    }
                  } else if (isOptSelected) {
                    bg = activePreset.badgeBg;
                    border = activePreset.primary;
                    color = activePreset.primary;
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => {
                        if (!isSubmitted) {
                          setUserAnswers(prev => ({ ...prev, [q.id]: optIdx }));
                          setUnansweredWarning(null);
                        }
                      }}
                      disabled={isSubmitted}
                      className="p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all duration-150 hover:opacity-90"
                      style={{ backgroundColor: bg, borderColor: border, color: color }}
                    >
                      <span className="w-5 h-5 rounded-full border text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {optIdx + 1}
                      </span>
                      <div className="text-xs sm:text-sm font-semibold leading-relaxed">
                        <FuriganaText content={opt.textFurigana || opt.textJa} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* POST-SUBMISSION: Listening Script (Toàn bộ đoạn hội thoại) + Giải thích chi tiết tiếng Việt */}
              {isSubmitted && (
                <div 
                  className="p-4 rounded-2xl border space-y-3 animate-in fade-in duration-200"
                  style={{
                    backgroundColor: isDarkMode ? '#252D38' : activePreset.light,
                    borderColor: isCorrect ? '#10B981' : activePreset.primary,
                  }}
                >
                  {/* Script bài nghe nếu là câu Listening */}
                  {isListening && q.audioScriptFurigana && (
                    <div className="space-y-1.5 pb-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-xs font-black text-blue-600 dark:text-blue-400 block">
                        📜 Script Toàn Bộ Bài Nghe (Furigana 100%):
                      </span>
                      <div className="text-xs leading-loose text-gray-800 dark:text-gray-200 whitespace-pre-line p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                        <FuriganaText content={q.audioScriptFurigana} />
                      </div>
                    </div>
                  )}

                  {/* Lời giải thích chi tiết bằng tiếng Việt */}
                  <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="font-bold text-gray-900 dark:text-gray-100 block mb-1">
                      💡 Lời giải thích chi tiết:
                    </span>
                    {q.explanationVi}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
