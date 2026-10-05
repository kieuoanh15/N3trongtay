import React, { useState, useEffect } from 'react';
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  CheckCircle2, 
  RotateCcw, 
  Sparkles, 
  Trophy,
  Filter
} from 'lucide-react';
import { VocabularyItem, VocabPartOfSpeech } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface FlashcardSectionProps {
  vocabulary: VocabularyItem[];
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const FlashcardSection: React.FC<FlashcardSectionProps> = ({
  vocabulary,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [filterPos, setFilterPos] = useState<string>('all');
  const [knownIds, setKnownIds] = useState<Set<string>>(new Set());

  // Filter cards automatically whenever vocabulary changes
  const activeCards = vocabulary.filter(item => {
    if (filterPos === 'all') return true;
    return item.partOfSpeech === filterPos;
  });

  // Keep index within bounds if activeCards length changes
  useEffect(() => {
    if (currentIndex >= activeCards.length) {
      setCurrentIndex(Math.max(0, activeCards.length - 1));
    }
  }, [activeCards.length, currentIndex]);

  const currentCard = activeCards[currentIndex];

  const playAudio = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    playJapaneseAudio(text);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < activeCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(activeCards.length - 1);
    }
  };

  const handleMarkMastered = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentCard) return;
    const nextKnown = new Set(knownIds);
    if (!nextKnown.has(currentCard.id)) {
      nextKnown.add(currentCard.id);
      setKnownIds(nextKnown);
      onAddGold(10); // Reward 10 gold for mastering a card
    } else {
      nextKnown.delete(currentCard.id);
      setKnownIds(nextKnown);
    }
  };

  if (activeCards.length === 0) {
    return (
      <div 
        className="p-12 text-center rounded-3xl border max-w-2xl mx-auto"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <p className="text-sm font-semibold text-gray-500">Chưa có từ vựng nào trong kho flashcard này.</p>
        <p className="text-xs text-gray-400 mt-1">
          Hãy thêm từ vựng mới hoặc import Excel ở tab Từ vựng, flashcard sẽ tự động được sinh ra ngay tức thì!
        </p>
      </div>
    );
  }

  const isMastered = currentCard ? knownIds.has(currentCard.id) : false;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span 
              className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              Auto-Sync Flashcard 3D
            </span>
            <span className="text-xs text-gray-400">
              Thẻ {currentIndex + 1} / {activeCards.length}
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100 mt-0.5">
            Flashcard N3 Tự Động Đồng Bộ
          </h2>
        </div>

        {/* Filter Category Tabs */}
        <div 
          className="flex items-center gap-1 p-1 rounded-2xl border text-xs overflow-x-auto"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
          }}
        >
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'noun', label: 'Danh từ' },
            { id: 'i_adj', label: 'Tính từ i' },
            { id: 'na_adj', label: 'Tính từ na' },
            { id: 'verb', label: 'Động từ' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setFilterPos(tab.id);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-xl font-bold transition-all shrink-0 ${
                filterPos === tab.id ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
              }`}
              style={{
                color: filterPos === tab.id ? activePreset.primary : undefined,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Flashcard Container with Flip Animation */}
      <div 
        id="flashcard-container"
        className="w-full h-80 sm:h-96 cursor-pointer select-none perspective"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div 
          className={`relative w-full h-full duration-500 transform-style-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT FACE (BỎ HÌNH ẢNH THEO YÊU CẦU, TẬP TRUNG CHỮ & ÂM HÁN) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl p-8 border shadow-lg flex flex-col justify-between backface-hidden"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#EAEFF5',
            }}
          >
            {/* Top Bar on Front */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentCard.sinoVietnamese && (
                  <span 
                    className="text-xs font-black uppercase px-2.5 py-1 rounded-lg tracking-wider"
                    style={{
                      backgroundColor: isDarkMode ? '#2D3748' : activePreset.badgeBg,
                      color: activePreset.primary,
                    }}
                  >
                    Hán Việt: {currentCard.sinoVietnamese}
                  </span>
                )}
                <span className="text-xs text-gray-400 capitalize">
                  ({currentCard.partOfSpeech.replace('_', ' ')})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => playAudio(currentCard.kanji || currentCard.hiragana, e)}
                  className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                  title="Nghe phát âm từ vựng"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleMarkMastered}
                  className={`p-2 rounded-xl transition-all ${
                    isMastered
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                      : 'text-gray-400 hover:text-emerald-500'
                  }`}
                  title={isMastered ? 'Đã thành thạo' : 'Đánh dấu đã thuộc'}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center: Large Kanji & Hiragana Furigana */}
            <div className="text-center my-auto">
              <ruby className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-50 tracking-wider">
                {currentCard.kanji}
                <rt className="text-base sm:text-lg text-gray-500 dark:text-gray-400 font-bold mb-1">
                  {currentCard.hiragana}
                </rt>
              </ruby>
            </div>

            {/* Bottom: Click Hint */}
            <div className="text-center">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-medium">
                <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                Chạm để lật xem Nghĩa & Ví dụ
              </span>
            </div>
          </div>

          {/* BACK FACE (Nghĩa Tiếng Việt + Câu ví dụ có Furigana) */}
          <div 
            className="absolute inset-0 w-full h-full rounded-3xl p-8 border shadow-lg flex flex-col justify-between rotate-y-180 backface-hidden"
            style={{
              backgroundColor: isDarkMode ? '#232A35' : activePreset.light,
              borderColor: activePreset.primary,
            }}
          >
            {/* Top Bar on Back */}
            <div className="flex items-center justify-between">
              <span 
                className="text-xs font-bold px-2 py-0.5 rounded-md"
                style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
              >
                Mặt sau: Giải nghĩa & Ví dụ
              </span>
              <button
                onClick={(e) => playAudio(currentCard.sentenceJa || currentCard.kanji, e)}
                className="p-1.5 rounded-xl text-blue-500 hover:bg-blue-100 transition-colors"
                title="Nghe câu ví dụ"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Center: Meaning & Example */}
            <div className="space-y-4 my-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">
                  {currentCard.meaningVi}
                </h3>
              </div>

              {currentCard.sentenceJa && (
                <div 
                  className="p-4 rounded-2xl border"
                  style={{
                    backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                    borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                  }}
                >
                  <div className="text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-relaxed">
                    <FuriganaText content={currentCard.sentenceFurigana || currentCard.sentenceJa} />
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-gray-950 dark:text-gray-100 mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    → {currentCard.sentenceVi}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Hint */}
            <div className="text-center text-xs text-gray-400">
              Chạm để lật lại mặt trước
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        <button
          id="btn-flashcard-prev"
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-transform active:scale-95 shadow-xs"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
            color: isDarkMode ? '#F8FAFC' : '#1E293B',
          }}
        >
          <ChevronLeft className="w-4 h-4" />
          Quay lại
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFlipped(!isFlipped)}
            className="p-2.5 rounded-2xl border transition-all hover:opacity-80"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
              color: activePreset.primary,
            }}
            title="Lật thẻ"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-gray-500">
            {knownIds.size} / {activeCards.length} Đã thuộc
          </span>
        </div>

        <button
          id="btn-flashcard-next"
          onClick={handleNext}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl text-xs font-bold text-white transition-transform active:scale-95 shadow-xs"
          style={{ backgroundColor: activePreset.primary }}
        >
          Tiếp theo
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
