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
  Gift,
  Swords
} from 'lucide-react';
import { VocabularyItem, UserProfile, LeaderboardUser } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { INITIAL_LEADERBOARD, STREAK_MILESTONES } from '../data/shopData';
import { FuriganaText } from './FuriganaText';
import { ItemGraphic } from './ItemGraphic';
import { MultiplayerDuelSection } from './MultiplayerDuelSection';
import { FirebaseUser } from '../firebase';
import confetti from 'canvas-confetti';

interface GameRankSectionProps {
  vocabulary: VocabularyItem[];
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  currentUser: FirebaseUser | null;
  isGuestMode: boolean;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
  onOpenAuth: () => void;
  activeSubTab?: 'duel' | 'leaderboard' | 'streak' | 'minigame';
  initialSubTab?: 'duel' | 'leaderboard' | 'streak' | 'minigame';
  onSubTabChange?: (subTab: 'duel' | 'leaderboard' | 'streak' | 'minigame') => void;
}

export const GameRankSection: React.FC<GameRankSectionProps> = ({
  vocabulary,
  user,
  setUser,
  currentUser,
  isGuestMode,
  isDarkMode,
  activePreset,
  onAddGold,
  onOpenAuth,
  activeSubTab: controlledSubTab,
  initialSubTab = 'duel',
  onSubTabChange,
}) => {
  const [localSubTab, setLocalSubTab] = useState<'duel' | 'leaderboard' | 'streak' | 'minigame'>(
    controlledSubTab ?? initialSubTab ?? 'duel'
  );

  const activeSubTab = controlledSubTab ?? localSubTab;

  useEffect(() => {
    if (controlledSubTab) {
      setLocalSubTab(controlledSubTab);
    }
  }, [controlledSubTab]);

  const handleSubTabChange = (tab: 'duel' | 'leaderboard' | 'streak' | 'minigame') => {
    setLocalSubTab(tab);
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // Solo Mini-Game Quiz State
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
  const [claimedStreaks, setClaimedStreaks] = useState<number[]>([3]);

  // Generate random question for Minigame
  const generateQuestion = () => {
    if (vocabulary.length < 4) return;
    const randomIndex = Math.floor(Math.random() * vocabulary.length);
    const targetWord = vocabulary[randomIndex];

    const wrongWords = vocabulary.filter(w => w.id !== targetWord.id);
    const shuffledWrong = [...wrongWords].sort(() => 0.5 - Math.random()).slice(0, 3);

    const allChoices = [targetWord.meaningVi, ...shuffledWrong.map(w => w.meaningVi)];
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
          handleSelectChoice(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gamePlaying, selectedChoice, currentQuestion]);

  const handleSelectChoice = (choiceIndex: number) => {
    if (selectedChoice !== null || !currentQuestion) return;
    setSelectedChoice(choiceIndex);

    const isCorrect = choiceIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setGameScore(prev => prev + 10);
      onAddGold(10);
    }

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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Sub-tabs: Thách Đấu 1v1 Học Viên | Đua Rank Top 5 | Mốc Chuỗi Streak | Luyện Tập Solo */}
      <div 
        className="p-1 rounded-2xl border flex items-center gap-1 text-xs overflow-x-auto"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
          borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
        }}
      >
        <button
          onClick={() => handleSubTabChange('duel')}
          className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-black transition-all cursor-pointer ${
            activeSubTab === 'duel' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{ color: activeSubTab === 'duel' ? activePreset.primary : undefined }}
        >
          <Swords className="w-4 h-4 text-rose-500" />
          <span>Thách Đấu 1v1 Học Viên</span>
        </button>

        <button
          onClick={() => handleSubTabChange('leaderboard')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeSubTab === 'leaderboard' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{ color: activeSubTab === 'leaderboard' ? activePreset.primary : undefined }}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>Bảng Đua Top</span>
        </button>

        <button
          onClick={() => handleSubTabChange('streak')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeSubTab === 'streak' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{ color: activeSubTab === 'streak' ? activePreset.primary : undefined }}
        >
          <Flame className="w-4 h-4 text-orange-500" />
          <span>Thưởng Chuỗi</span>
        </button>

        <button
          onClick={() => handleSubTabChange('minigame')}
          className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
            activeSubTab === 'minigame' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
          style={{ color: activeSubTab === 'minigame' ? activePreset.primary : undefined }}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Luyện Solo</span>
        </button>
      </div>

      {/* 1. DUEL TAB: 1v1 Multi-User Challenges Between Real Logged In Students */}
      {activeSubTab === 'duel' && (
        <MultiplayerDuelSection
          user={user}
          setUser={setUser}
          currentUser={currentUser}
          isGuestMode={isGuestMode}
          vocabulary={vocabulary}
          isDarkMode={isDarkMode}
          activePreset={activePreset}
          onAddGold={onAddGold}
          onOpenAuth={onOpenAuth}
        />
      )}

      {/* 2. LEADERBOARD TAB */}
      {activeSubTab === 'leaderboard' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6 animate-in fade-in duration-150"
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
              const isMe = item.isCurrentUser;

              return (
                <div
                  key={item.userId}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                    isMe ? 'ring-2 ring-offset-1 font-bold' : ''
                  }`}
                  style={{
                    backgroundColor: isMe
                      ? (isDarkMode ? '#2A3442' : activePreset.badgeBg)
                      : (isDarkMode ? '#1E232A' : '#FFFFFF'),
                    borderColor: isMe ? activePreset.primary : (isDarkMode ? '#2D3748' : '#EAEFF5'),
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
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

                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center p-1 border shrink-0"
                      style={{ 
                        backgroundColor: isDarkMode ? '#252F3D' : '#F1F5F9',
                        borderColor: isDarkMode ? '#374151' : '#E2E8F0' 
                      }}
                    >
                      <ItemGraphic itemId={item.avatarId} className="w-7 h-7" />
                    </div>

                    <div className="truncate">
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                        {isMe ? user.fullName : item.name} {isMe && '(Bạn)'}
                      </p>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {isMe ? user.userId : item.userId}
                      </p>
                    </div>
                  </div>

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
                      <span className="text-xs text-gray-400 font-semibold px-2">
                        -
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. STREAK REWARDS TAB */}
      {activeSubTab === 'streak' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6 animate-in fade-in duration-150"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          <div>
            <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Gift className="w-4 h-4 text-orange-500" />
              Mốc Phần Thưởng Chuỗi Ngày Liên Tục
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Học mỗi ngày không ngắt quãng để nhận ngay các phần quà Vàng tương ứng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {STREAK_MILESTONES.map((milestone) => {
              const isClaimed = claimedStreaks.includes(milestone.days);
              const canClaim = user.streakDays >= milestone.days && !isClaimed;
              const isLocked = user.streakDays < milestone.days;

              return (
                <div
                  key={milestone.days}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                    canClaim ? 'ring-2 ring-offset-1 border-amber-400' : ''
                  }`}
                  style={{
                    backgroundColor: isClaimed 
                      ? (isDarkMode ? '#232933' : '#F8FAFC')
                      : (isDarkMode ? '#1E232A' : '#FFFFFF'),
                    borderColor: canClaim 
                      ? '#F59E0B' 
                      : (isDarkMode ? '#2D3748' : '#EAEFF5'),
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1"
                      style={{
                        backgroundColor: '#FFF7ED',
                        color: '#EA580C',
                        border: '1px solid #FED7AA',
                      }}
                    >
                      <Flame className="w-3.5 h-3.5 fill-orange-500" />
                      {milestone.days} Ngày
                    </span>

                    <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                      <Coins className="w-3.5 h-3.5 fill-amber-400" />
                      +{milestone.gold} Vàng
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                      <span>{milestone.badge}</span>
                      <span>{milestone.label}</span>
                    </h4>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Duy trì học liên tục {milestone.days} ngày không ngắt quãng.
                    </p>
                  </div>

                  <div>
                    {isClaimed ? (
                      <span className="w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Đã Nhận Thưởng
                      </span>
                    ) : canClaim ? (
                      <button
                        onClick={() => handleClaimStreakReward(milestone.days, milestone.gold)}
                        className="w-full py-2 rounded-xl text-xs font-extrabold text-white shadow-xs transition-transform active:scale-95 cursor-pointer"
                        style={{ backgroundColor: activePreset.primary }}
                      >
                        Nhận Ngay +{milestone.gold} Vàng
                      </button>
                    ) : (
                      <span className="w-full py-2 rounded-xl text-[11px] font-semibold text-gray-400 bg-gray-100 dark:bg-gray-800 text-center block">
                        Cần thêm {milestone.days - user.streakDays} ngày
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. SOLO MINIGAME TAB */}
      {activeSubTab === 'minigame' && (
        <div 
          className="p-6 rounded-3xl border shadow-sm space-y-6 text-center animate-in fade-in duration-150"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          {!gamePlaying ? (
            <div className="space-y-4 max-w-md mx-auto py-8">
              <div 
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mx-auto shadow-sm"
                style={{ backgroundColor: activePreset.badgeBg }}
              >
                🎮
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">
                  Luyện Tập Phản Xạ 10 Giây Solo
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Mỗi ván gồm 5 câu trắc nghiệm ngẫu nhiên từ kho Mimikara N3. Trả lời đúng mỗi câu được +10 Vàng!
                </p>
              </div>

              <button
                onClick={startNewGame}
                className="px-6 py-3 rounded-2xl font-black text-sm text-white shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
                style={{ backgroundColor: activePreset.primary }}
              >
                Bắt Đầu Luyện Solo Ngay
              </button>
            </div>
          ) : currentQuestion && (
            <div className="space-y-6 max-w-lg mx-auto">
              {/* Question Header & Timer */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400">
                  Câu hỏi {gameRound} / 5
                </span>
                <span className={`text-xs font-black px-3 py-1 rounded-xl flex items-center gap-1 ${
                  timerSec <= 3 ? 'bg-red-100 text-red-600 animate-ping' : 'bg-amber-100 text-amber-700'
                }`}>
                  ⏱️ {timerSec}s
                </span>
              </div>

              {/* Word Display */}
              <div 
                className="p-6 rounded-2xl border shadow-inner"
                style={{ backgroundColor: isDarkMode ? '#252D37' : activePreset.light }}
              >
                <h3 className="text-3xl font-black text-gray-900 dark:text-gray-100">
                  {currentQuestion.word.kanji}
                </h3>
                <p className="text-sm font-medium text-gray-500 mt-1">
                  {currentQuestion.word.hiragana}
                </p>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion.choices.map((choice, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isCorrect = idx === currentQuestion.correctIndex;
                  const showFeedback = selectedChoice !== null;

                  let btnBg = isDarkMode ? '#252D37' : '#FFFFFF';
                  let btnBorder = isDarkMode ? '#374151' : '#E2E8F0';

                  if (showFeedback) {
                    if (isCorrect) {
                      btnBg = isDarkMode ? '#064E3B' : '#ECFDF5';
                      btnBorder = '#10B981';
                    } else if (isSelected) {
                      btnBg = isDarkMode ? '#7F1D1D' : '#FEF2F2';
                      btnBorder = '#EF4444';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedChoice !== null}
                      onClick={() => handleSelectChoice(idx)}
                      className="p-3.5 rounded-xl border text-left text-xs font-bold transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-between"
                      style={{ backgroundColor: btnBg, borderColor: btnBorder }}
                    >
                      <span>{choice}</span>
                      {showFeedback && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
