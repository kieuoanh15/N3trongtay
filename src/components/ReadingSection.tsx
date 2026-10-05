import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  Trophy, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { ReadingPassage, ReadingType } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { FuriganaText } from './FuriganaText';

interface ReadingSectionProps {
  readingList: ReadingPassage[];
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const ReadingSection: React.FC<ReadingSectionProps> = ({
  readingList,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [activeType, setActiveType] = useState<ReadingType>('short');
  const [selectedPassageId, setSelectedPassageId] = useState<string>(readingList[0]?.id || '');
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showVocab, setShowVocab] = useState(false);

  const typeTabs: { id: ReadingType; label: string; desc: string }[] = [
    { id: 'short', label: '1. Đoản văn', desc: 'Bài đọc ngắn (150-200 chữ)' },
    { id: 'medium', label: '2. Trung văn', desc: 'Bài đọc trung bình (350-450 chữ)' },
    { id: 'info_search', label: '3. Tìm kiếm thông tin', desc: 'Thông báo, bảng tin, tờ rơi' },
  ];

  const passagesForType = readingList.filter(p => p.type === activeType);
  const currentPassage = passagesForType.find(p => p.id === selectedPassageId) || passagesForType[0];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!currentPassage) return;
    const unanswered = currentPassage.questions.some(q => userAnswers[q.id] === undefined);
    if (unanswered) {
      alert('Vui lòng chọn đáp án cho tất cả câu hỏi trước khi xem kết quả!');
      return;
    }

    setIsSubmitted(true);
    setShowExplanation(true);

    // Calculate score
    let correctCount = 0;
    currentPassage.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    onAddGold(correctCount * 25);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
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
              Đọc Hiểu N3 Chuẩn
            </span>
            <span className="text-xs text-gray-500 font-medium">
              3 Dạng bài cốt lõi kỳ thi JLPT
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Luyện Đọc Hiểu N3 Kèm Lời Giải Thích Chi Tiết
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Toàn bộ chữ Hán đều có Furigana phiên âm phía trên. Lời giải phân tích cụ thể tại sao đúng/sai.
          </p>
        </div>

        {/* Action Button: Làm lại */}
        {isSubmitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-80 active:scale-95 shadow-xs"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
              borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
              color: isDarkMode ? '#E2E8F0' : '#334155',
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Làm lại bài này
          </button>
        )}
      </div>

      {/* 3 Categories: Đoản văn, Trung văn, Tìm kiếm thông tin */}
      <div 
        className="p-1.5 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-1.5"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
          borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
        }}
      >
        {typeTabs.map(tab => {
          const isCurrent = activeType === tab.id;
          const count = readingList.filter(p => p.type === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveType(tab.id);
                const firstOfType = readingList.find(p => p.type === tab.id);
                if (firstOfType) setSelectedPassageId(firstOfType.id);
                handleReset();
              }}
              className={`p-2.5 rounded-xl text-left transition-all ${
                isCurrent ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
              }`}
              style={{
                color: isCurrent ? activePreset.primary : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-black">{tab.label}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-md font-bold bg-gray-200/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300">
                  {count} bài
                </span>
              </div>
              <p className="text-[10px] text-gray-400">{tab.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Passages List Selector for the active category */}
      {passagesForType.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <span className="text-xs font-bold text-gray-400 shrink-0">Chọn bài:</span>
          {passagesForType.map((p, idx) => {
            const isSelected = p.id === currentPassage?.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPassageId(p.id);
                  handleReset();
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all shrink-0 flex items-center gap-1.5"
                style={{
                  backgroundColor: isSelected ? activePreset.badgeBg : (isDarkMode ? '#1E232A' : '#FFFFFF'),
                  borderColor: isSelected ? activePreset.primary : (isDarkMode ? '#2D3748' : '#E2E8F0'),
                  color: isSelected ? activePreset.primary : (isDarkMode ? '#E2E8F0' : '#475569'),
                }}
              >
                <span>Bài {idx + 1}:</span>
                <span className="truncate max-w-[160px] sm:max-w-[220px]">{p.title.split('(')[0].trim()}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Passage & Question Layout */}
      {currentPassage ? (
        <div className="space-y-6">
          {/* Passage Reading Card with Furigana on ALL Kanji */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div>
                <span className="text-xs font-bold text-gray-400">
                  {currentPassage.sourceNote}
                </span>
                <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
                  {currentPassage.title}
                </h3>
              </div>
              <span 
                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
              >
                Furigana 100%
              </span>
            </div>

            {/* Passage Body */}
            <div 
              className="p-5 rounded-2xl border text-sm sm:text-base leading-loose font-bold text-gray-950 dark:text-white"
              style={{
                backgroundColor: isDarkMode ? '#242B36' : '#F9FBFC',
                borderColor: isDarkMode ? '#333D4C' : '#CBD5E1',
              }}
            >
              <FuriganaText content={currentPassage.passageFurigana || currentPassage.passageJa} />
            </div>

            {/* Translation and Vocabulary Toggle Controls */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                id="btn-toggle-reading-translation"
                onClick={() => setShowTranslation(!showTranslation)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 shadow-2xs"
                style={{
                  backgroundColor: showTranslation ? activePreset.badgeBg : (isDarkMode ? '#252D37' : '#FFFFFF'),
                  borderColor: showTranslation ? activePreset.primary : (isDarkMode ? '#374151' : '#CBD5E1'),
                  color: showTranslation ? activePreset.primary : (isDarkMode ? '#CBD5E1' : '#475569'),
                }}
              >
                <span>{showTranslation ? '👁️ Ẩn bản dịch tiếng Việt' : '📖 Xem bản dịch tiếng Việt'}</span>
              </button>

              <button
                type="button"
                id="btn-toggle-reading-vocab"
                onClick={() => setShowVocab(!showVocab)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all active:scale-95 shadow-2xs"
                style={{
                  backgroundColor: showVocab ? activePreset.badgeBg : (isDarkMode ? '#252D37' : '#FFFFFF'),
                  borderColor: showVocab ? activePreset.primary : (isDarkMode ? '#374151' : '#CBD5E1'),
                  color: showVocab ? activePreset.primary : (isDarkMode ? '#CBD5E1' : '#475569'),
                }}
              >
                <span>{showVocab ? '🏷️ Ẩn từ vựng bài đọc' : `🏷️ Từ vựng trọng tâm (${currentPassage.vocabularyList?.length || 0})`}</span>
              </button>
            </div>

            {/* Collapsible Vietnamese Translation */}
            {showTranslation && currentPassage.translationVi && (
              <div 
                className="p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-2 animate-in fade-in duration-150"
                style={{
                  backgroundColor: isDarkMode ? '#1B2431' : '#F0FDF4',
                  borderColor: isDarkMode ? '#2D3748' : '#BBF7D0',
                  color: isDarkMode ? '#E2E8F0' : '#166534',
                }}
              >
                <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <FileText className="w-4 h-4" /> Bản dịch tiếng Việt chi tiết:
                </div>
                <p className="whitespace-pre-line leading-relaxed font-normal">
                  {currentPassage.translationVi}
                </p>
              </div>
            )}

            {/* Collapsible Vocabulary List */}
            {showVocab && currentPassage.vocabularyList && currentPassage.vocabularyList.length > 0 && (
              <div 
                className="p-4 rounded-2xl border space-y-2 animate-in fade-in duration-150"
                style={{
                  backgroundColor: isDarkMode ? '#212936' : '#F8FAFC',
                  borderColor: isDarkMode ? '#333D4C' : '#E2E8F0',
                }}
              >
                <div className="font-bold text-xs text-gray-700 dark:text-gray-300 flex items-center gap-1">
                  <span>💡 Từ vựng trọng điểm trong bài:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                  {currentPassage.vocabularyList.map((vocab, vIdx) => (
                    <div 
                      key={vIdx}
                      className="p-2.5 rounded-xl border flex flex-col gap-0.5"
                      style={{
                        backgroundColor: isDarkMode ? '#1A202C' : '#FFFFFF',
                        borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
                      }}
                    >
                      <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
                        <FuriganaText content={vocab.furigana || vocab.word} />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {vocab.meaningVi || vocab.meaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {currentPassage.questions.map((q, qIndex) => {
              const selectedIdx = userAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className="p-6 rounded-3xl border shadow-sm space-y-4"
                  style={{
                    backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                    borderColor: isSubmitted 
                      ? (isCorrect ? '#10B981' : '#F43F5E') 
                      : (isDarkMode ? '#2D3748' : '#E8EEF5'),
                  }}
                >
                  {/* Question Prompt with Furigana */}
                  <div className="flex items-start gap-2.5">
                    <span 
                      className="w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: activePreset.primary }}
                    >
                      {qIndex + 1}
                    </span>
                    <div className="text-sm font-black text-gray-900 dark:text-gray-100 leading-normal">
                      <FuriganaText content={q.questionFurigana || q.questionJa} />
                    </div>
                  </div>

                  {/* 4 Multiple Choice Options */}
                  <div className="space-y-2 pl-2">
                    {q.options.map((opt, optIndex) => {
                      const isOptionSelected = selectedIdx === optIndex;
                      const isRightOption = optIndex === q.correctIndex;

                      let optBg = isDarkMode ? '#252D37' : '#F8FAFC';
                      let optBorder = isDarkMode ? '#374151' : '#E2E8F0';
                      let optText = isDarkMode ? '#E2E8F0' : '#1E293B';

                      if (isSubmitted) {
                        if (isRightOption) {
                          optBg = isDarkMode ? '#064E3B' : '#ECFDF5';
                          optBorder = '#10B981';
                          optText = isDarkMode ? '#A7F3D0' : '#065F46';
                        } else if (isOptionSelected && !isRightOption) {
                          optBg = isDarkMode ? '#4C1D24' : '#FFF1F2';
                          optBorder = '#F43F5E';
                          optText = isDarkMode ? '#FECDD3' : '#9F1239';
                        }
                      } else if (isOptionSelected) {
                        optBg = activePreset.badgeBg;
                        optBorder = activePreset.primary;
                        optText = activePreset.primary;
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          disabled={isSubmitted}
                          className="w-full p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all duration-150 hover:opacity-90"
                          style={{
                            backgroundColor: optBg,
                            borderColor: optBorder,
                            color: optText,
                          }}
                        >
                          <span className="w-5 h-5 rounded-full border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {optIndex + 1}
                          </span>
                          <div className="text-xs sm:text-sm font-bold leading-relaxed">
                            <FuriganaText content={opt.textFurigana || opt.textJa} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Detailed Explanation after submission */}
                  {isSubmitted && (
                    <div 
                      className="p-4 rounded-2xl border space-y-2 animate-in fade-in duration-200"
                      style={{
                        backgroundColor: isDarkMode ? '#242C37' : activePreset.light,
                        borderColor: isCorrect ? '#10B981' : activePreset.primary,
                      }}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs">
                        {isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Chính xác! (+25 Vàng)
                          </span>
                        ) : (
                          <span className="text-rose-600 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Chưa chính xác. Đáp án đúng là {q.correctIndex + 1}.
                          </span>
                        )}
                      </div>

                      {/* Lời giải chi tiết tiếng Việt */}
                      <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed pt-1 border-t border-gray-200 dark:border-gray-700">
                        <span className="font-bold text-gray-900 dark:text-gray-100 block mb-1">
                          📖 Lời giải thích chi tiết:
                        </span>
                        {q.explanationVi}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button */}
          {!isSubmitted && (
            <div className="flex justify-center pt-2">
              <button
                id="btn-submit-reading"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl text-sm font-black text-white transition-transform active:scale-95 shadow-md hover:opacity-90"
                style={{ backgroundColor: activePreset.primary }}
              >
                <Sparkles className="w-4 h-4" />
                Nộp Bài & Xem Lời Giải Chi Tiết
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-12 text-center text-gray-400">
          Chưa có bài đọc nào trong phần này
        </div>
      )}
    </div>
  );
};
