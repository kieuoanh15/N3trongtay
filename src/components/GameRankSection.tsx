import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Coins, 
  Sparkles, 
  Gamepad2, 
  Medal, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Gift
} from 'lucide-react';
import { VocabularyItem, UserProfile, LeaderboardUser } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { INITIAL_LEADERBOARD, STREAK_MILESTONES } from '../data/shopData';
import { FuriganaText } from './FuriganaText';
import confetti from 'canvas-confetti';

interface GameRankSectionProps {
  vocabulary: VocabularyItem[];
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const GameRankSection: React.FC<GameRankSectionProps> = ({
  vocabulary,
  user,
  setUser,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'minigame' | 'leaderboard' | 'streak'>('minigame');

  // Mini-Game Quiz State
  const [gamePlaying, setGamePlaying] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameRound, setGameRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{
    word: VocabularyItem;
    choices: string[];
    correctIndex: number;
  } | null>(null);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [timerSec, setTimerSec] = useState(10);

  // Claimed Streak Rewards state
  const [claimedStreaks, setClaimedStreaks] = useState<number[]>([3]); // e.g. day 3 claimed

  // Generate random question for Minigame
  const generateQuestion = () => {
    if (vocabulary.length < 4) return;
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const targetWord = vocabulary[randomIndex];

    // Pick 3 random wrong meanings
    const wrongWords = vocabulary.filter(w => w.id !== targetWord.id);
    const shuffledWrong = [...wrongWords].sort(() => 0.5 - Math.random()).slice(0, 3);

    const allChoices = [targetWord.meaningVi, ...shuffledWrong.map(w => w.meaningVi)];
    // Shuffle choices
    const shuffledChoices = [...allChoices].sort(() => 0.5 - Math.random());
    const correctIdx = shuffledChoices.indexOf(targetWord.meaningVi);

    setCurrentQuestion({
      word: targetWord,
      choices: shuffledChoices,
      correctIndex: correctIdx,
    });
    setSelectedChoice(null);
    setTimerSec(10);
  };

  const startNewGame = () => {
    setGameScore(0);
    setGameRound(1);
    setGamePlaying(true);
    generateQuestion();
  };

  // 10s Timer for each game question
  useEffect(() => {
    if (!gamePlaying || selectedChoice !== null) return;
    const interval = setInterval(() => {
      setTimerSec(prev => {
        if (prev <= 1) {
          // Time out - mark wrong
          handleSelectChoice(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gamePlaying, selectedChoice, currentQuestion]);

  const handleSelectChoice = (index: number) => {
    if (selectedChoice !== null || !currentQuestion) return;
    setSelectedChoice(index);

    if (index === currentQuestion.correctIndex) {
      setGameScore(prev => prev + 100);
      onAddGold(10);
      confetti({ particleCount: 25, spread: 50 });
    }

    // Next round or end game
    setTimeout(() => {
      if (gameRound < 5) {
        setGameRound(prev => prev + 1);
        generateQuestion();
      } else {
        setGamePlaying(false);
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    }, 1200);
  };

  // Claim Streak Gold reward
  const handleClaimStreakReward = (days: number, gold: number) => {
    if (claimedStreaks.includes(days)) return;
    if (user.streakDays < days) {
      alert(`Bạn cần đạt chuỗi ${days} ngày học liên tiếp để nhận thưởng này! Hiện tại: ${user.streakDays} ngày.`);
      return;
    }

    setClaimedStreaks(prev => [...prev, days]);
    onAddGold(gold);
    confetti({ particleCount: 70, spread: 60 });
    alert(`Chúc mừng! Bạn đã nhận ${gold} Vàng từ mốc Chuỗi ${days} ngày.`);
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
              Gamification & Rank
            </span>
            <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 fill-amber-400" /> Thưởng Top 5 & Chuỗi Ngày
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Game Từ Vựng, Đua Rank & Tích Lũy Chuỗi
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Phần thưởng Vàng giá trị cao cho Top 5 bảng xếp hạng và người duy trì học đều đặn mỗi ngày.
          </p>
        </div>

        {/* User Stats Quick View */}
        <div className="flex items-center gap-3">
          <div 
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : '#FEFCE8',
              borderColor: '#FEF08A',
              color: '#CA8A04',
            }}
          >
            <Coins className="w-4 h-4 fill-amber-400" />
            <span>{user.gold} Vàng</span>
          </div>

          <div 
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-bold"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : '#FFF7ED',
              borderColor: '#FED7AA',
              color: '#EA580C',
            }}
          >
            <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
            <span>Chuỗi {user.streakDays} ngày</span>
          </div>
        </div>
      </div>

      {/* Sub-tabs: Mini-game | Đua Rank Top 5 | Phần Thưởng Chuỗi */}
      <div 
        className="p-1 rounded-2xl border flex items-center gap-1 text-xs"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
          borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
        }}
      >
        <button
          onClick={() => setActiveSubTab('minigame')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
            activeSubTab === 'minigame' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
          }`}
          style={{ color: activeSubTab === 'minigame' ? activePreset.primary : undefined }}
        >
          <Gamepad2 className="w-4 h-4" />
          Game Phản Xạ 10s
        </button>

        <button
          onClick={() => setActiveSubTab('leaderboard')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
            activeSubTab === 'leaderboard' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
          }`}
          style={{ color: activeSubTab === 'leaderboard' ? activePreset.primary : undefined }}
        >
          <Trophy className="w-4 h-4" />
          Đua Rank (Thưởng Top 5)
        </button>

        <button
          onClick={() => setActiveSubTab('streak')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
            activeSubTab === 'streak' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
          }`}
          style={{ color: activeSubTab === 'streak' ? activePreset.primary : undefined }}
        >
          <Flame className="w-4 h-4" />
          Mốc Chuỗi Streak
        </button>
      </div>

      {/* 1. MINI-GAME TAB */}
      {activeSubTab === 'minigame' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6 text-center"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          {!gamePlaying ? (
            <div className="max-w-md mx-auto py-8 space-y-4">
              <div 
                className="w-16 h-16 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-md"
                style={{ backgroundColor: activePreset.badgeBg }}
              >
                ⚡
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100">
                Thử Thách Phản Xạ Từ Vựng N3
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mỗi câu hỏi có 10 giây để chọn đúng nghĩa tiếng Việt tương ứng với Từ vựng Kanji N3. Đúng mỗi câu nhận +10 Vàng thưởng!
              </p>

              {gameScore > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                  🎉 Kết thúc đợt chơi! Bạn đã đạt {gameScore} điểm!
                </div>
              )}

              <button
                id="btn-start-game"
                onClick={startNewGame}
                className="w-full py-3.5 rounded-2xl font-black text-sm text-white transition-transform active:scale-95 shadow-md"
                style={{ backgroundColor: activePreset.primary }}
              >
                {gameScore > 0 ? 'Chơi Lại Đợt Khác' : 'Bắt Đầu Thử Thách Ngay'}
              </button>
            </div>
          ) : (
            currentQuestion && (
              <div className="space-y-6">
                {/* Round Header & 10s Timer */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400">
                    Câu hỏi {gameRound} / 5
                  </span>
                  <span 
                    className={`text-sm font-black font-mono px-3 py-1 rounded-xl border ${
                      timerSec <= 3 ? 'bg-rose-100 text-rose-600 border-rose-300 animate-pulse' : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    ⏱️ {timerSec}s
                  </span>
                  <span className="text-xs font-bold text-emerald-500">
                    Điểm: {gameScore}
                  </span>
                </div>

                {/* Target Kanji Word with Furigana */}
                <div className="py-6">
                  <ruby className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-gray-50 tracking-wider">
                    {currentQuestion.word.kanji}
                    <rt className="text-base text-gray-400 font-semibold mb-1">
                      {currentQuestion.word.hiragana}
                    </rt>
                  </ruby>
                  {currentQuestion.word.sinoVietnamese && (
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-2">
                      [Hán Việt: {currentQuestion.word.sinoVietnamese}]
                    </p>
                  )}
                </div>

                {/* 4 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                  {currentQuestion.choices.map((choice, idx) => {
                    const isSelected = selectedChoice === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;

                    let bg = isDarkMode ? '#252D37' : '#F8FAFC';
                    let border = isDarkMode ? '#374151' : '#CBD5E1';
                    let text = isDarkMode ? '#F8FAFC' : '#1E293B';

                    if (selectedChoice !== null) {
                      if (isCorrect) {
                        bg = '#ECFDF5';
                        border = '#10B981';
                        text = '#047857';
                      } else if (isSelected && !isCorrect) {
                        bg = '#FFF1F2';
                        border = '#F43F5E';
                        text = '#BE123C';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectChoice(idx)}
                        disabled={selectedChoice !== null}
                        className="p-4 rounded-2xl border text-sm font-bold transition-all active:scale-95 text-left flex items-center justify-between"
                        style={{ backgroundColor: bg, borderColor: border, color: text }}
                      >
                        <span>{choice}</span>
                        {selectedChoice !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                        {selectedChoice !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* 2. LEADERBOARD TAB (THƯỞNG TOP 5: TOP 1: 500V, TOP 2: 300V, TOP 3: 200V, TOP 4: 100V, TOP 5: 50V) */}
      {activeSubTab === 'leaderboard' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          {/* Prize Rules Banner */}
          <div 
            className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            style={{
              backgroundColor: isDarkMode ? '#242D38' : activePreset.light,
              borderColor: activePreset.primary,
            }}
          >
            <div>
              <h4 className="font-black text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                Cơ Chế Trao Thưởng Vàng Top 5 Hàng Tuần:
              </h4>
              <p className="text-gray-600 dark:text-gray-400 mt-0.5">
                Top 1: <strong>500 Vàng</strong> | Top 2: <strong>300 Vàng</strong> | Top 3: <strong>200 Vàng</strong> | Top 4: <strong>100 Vàng</strong> | Top 5: <strong>50 Vàng</strong>
              </p>
            </div>
            <span 
              className="px-3 py-1 rounded-xl font-extrabold text-white self-start sm:self-auto shrink-0"
              style={{ backgroundColor: activePreset.primary }}
            >
              Mùa Giải N3 #12
            </span>
          </div>

          {/* Leaderboard Table */}
          <div className="space-y-2">
            {INITIAL_LEADERBOARD.map((item) => {
              const isTop3 = item.rank <= 3;
              const isMe = item.isCurrentUser;

              return (
                <div
                  key={item.userId}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isMe 
                      ? 'ring-2 ring-offset-1 font-bold' 
                      : ''
                  }`}
                  style={{
                    backgroundColor: isMe
                      ? (isDarkMode ? '#2A3442' : activePreset.badgeBg)
                      : (isDarkMode ? '#1E232A' : '#FFFFFF'),
                    borderColor: isMe ? activePreset.primary : (isDarkMode ? '#2D3748' : '#EAEFF5'),
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div 
                      className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center shrink-0 ${
                        item.rank === 1 ? 'bg-amber-400 text-amber-950' :
                        item.rank === 2 ? 'bg-slate-300 text-slate-900' :
                        item.rank === 3 ? 'bg-amber-700 text-amber-100' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-500'
                      }`}
                    >
                      {item.rank}
                    </div>

                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                        {item.name} {isMe && '(Bạn)'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {item.userId}
                      </p>
                    </div>
                  </div>

                  {/* Score & Prize */}
                  <div className="flex items-center gap-4 text-right shrink-0">
                    <div>
                      <span className="text-xs font-black text-gray-900 dark:text-gray-100">
                        {item.score} đ
                      </span>
                    </div>

                    {item.goldPrize > 0 ? (
                      <span 
                        className="flex items-center gap-1 text-xs font-extrabold px-2 py-0.5 rounded-lg"
                        style={{
                          backgroundColor: '#FEFCE8',
                          color: '#CA8A04',
                          border: '1px solid #FEF08A',
                        }}
                      >
                        <Coins className="w-3.5 h-3.5 fill-amber-400" />
                        +{item.goldPrize}V
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">---</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. STREAK REWARDS TAB (3 ngày: 100 Vàng, 7 ngày: 250 Vàng, 14 ngày: 500 Vàng, 30 ngày: 1000 Vàng + Cúp Danh Dự) */}
      {activeSubTab === 'streak' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div>
            <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
              Các Mốc Tích Lũy Chuỗi Ngày Học (Streak Milestones)
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Học liên tục mỗi ngày để duy trì ngọn lửa kiên trì và nhận thưởng Vàng khổng lồ mở khóa nhân vật.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STREAK_MILESTONES.map((milestone) => {
              const isClaimed = claimedStreaks.includes(milestone.days);
              const canClaim = user.streakDays >= milestone.days && !isClaimed;

              return (
                <div
                  key={milestone.days}
                  className="p-4 rounded-2xl border flex flex-col justify-between space-y-3"
                  style={{
                    backgroundColor: isDarkMode ? '#232A35' : '#F9FBFC',
                    borderColor: isDarkMode ? '#313C4D' : '#E2E8F0',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-bold text-gray-400 block mb-0.5">
                        {milestone.badge}
                      </span>
                      <h4 className="text-base font-black text-gray-900 dark:text-gray-100">
                        {milestone.label}
                      </h4>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-black text-amber-500">
                      <Coins className="w-4 h-4 fill-amber-400" />
                      <span>+{milestone.gold} Vàng</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-500">
                      Tiến độ: <strong>{Math.min(user.streakDays, milestone.days)}</strong>/{milestone.days} ngày
                    </span>

                    <button
                      onClick={() => handleClaimStreakReward(milestone.days, milestone.gold)}
                      disabled={isClaimed || !canClaim}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                        isClaimed
                          ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                          : canClaim
                          ? 'text-white active:scale-95'
                          : 'bg-gray-100 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                      }`}
                      style={{
                        backgroundColor: canClaim ? activePreset.primary : undefined,
                      }}
                    >
                      {isClaimed ? 'Đã Nhận' : canClaim ? 'Nhận Vàng' : 'Chưa Mở'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
