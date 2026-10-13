import React, { useState, useEffect } from 'react';
import { 
  TabType, 
  UserProfile, 
  VocabularyItem, 
  GrammarItem, 
  KanjiItem, 
  ReadingPassage, 
  ExamMock 
} from './types';
import { THEME_PRESETS, ThemePreset } from './utils/themePresets';
import { getLocalDateString, checkAndUpdateStreak } from './utils/streakManager';
import { INITIAL_VOCABULARY } from './data/mimikaraVocab';
import { INITIAL_GRAMMAR } from './data/mimikaraGrammar';
import { INITIAL_KANJI } from './data/n3Kanji';
import { INITIAL_READING } from './data/readingData';
import { INITIAL_N3_EXAMS } from './data/listeningAndExamData';

import { 
  auth, 
  onAuthStateChanged, 
  FirebaseUser, 
  db, 
  doc, 
  getDoc, 
  setDoc,
  signOut,
  googleProvider,
  signInWithPopup 
} from './firebase';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { VocabSection } from './components/VocabSection';
import { GrammarSection } from './components/GrammarSection';
import { FlashcardSection } from './components/FlashcardSection';
import { KanjiSection } from './components/KanjiSection';
import { ReadingSection } from './components/ReadingSection';
import { ExamSection } from './components/ExamSection';
import { SpeakingSection } from './components/SpeakingSection';
import { GameRankSection } from './components/GameRankSection';
import { ShopSection } from './components/ShopSection';
import { SettingsSection } from './components/SettingsSection';
import { AuthModal } from './components/AuthModal';
import { GuestLockModal } from './components/GuestLockModal';

import { 
  BookOpen, 
  Sparkles, 
  FileText, 
  Headphones, 
  Menu,
  LogIn,
  AlertTriangle 
} from 'lucide-react';

export default function App() {
  // Theme & Layout State
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('vocab');
  const [gameSubTab, setGameSubTab] = useState<'duel' | 'leaderboard' | 'streak' | 'minigame'>('duel');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Auto-close sidebar on mobile resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);

  // Guest lock modal state
  const [guestLockModalOpen, setGuestLockModalOpen] = useState<boolean>(false);
  const [guestLockFeature, setGuestLockFeature] = useState<string>('tính năng này');

  // User Profile State (Starts with streak = 1, increments day-by-day upon login)
  const [user, setUser] = useState<UserProfile>(() => {
    const todayStr = getLocalDateString();
    const saved = localStorage.getItem('n3_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const streakRes = checkAndUpdateStreak(parsed.streakDays, parsed.lastLoginDate);
        return {
          ...parsed,
          streakDays: streakRes.streakDays,
          lastLoginDate: streakRes.todayString,
          gold: (typeof parsed.gold === 'number' ? parsed.gold : 50) + streakRes.awardedGold,
        };
      } catch {}
    }
    return {
      userId: 'N3-STUDENT',
      fullName: 'Học viên N3',
      email: '',
      gold: 50,
      streakDays: 1, // Starts at 1
      dayCount: 1,
      lastLoginDate: todayStr,
      unlockedItems: ['avatar-tanuki', 'costume-school'],
      equippedAvatar: 'avatar-tanuki',
      equippedCostume: 'costume-school',
    };
  });

  // Navigation helper for main tabs & game subtabs (e.g. Bảng Đua Top)
  const handleNavigateTab = (tab: TabType, subTab?: 'duel' | 'leaderboard' | 'streak' | 'minigame') => {
    setActiveTab(tab);
    if (tab === 'game' && subTab) {
      setGameSubTab(subTab);
    }
  };

  // 1. Firebase Auth State Listener & Google Account Data Synchronization
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setCurrentUser(fbUser);
      if (fbUser) {
        setIsGuestMode(false);
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const streakRes = checkAndUpdateStreak(
              typeof data.streakDays === 'number' ? data.streakDays : 1,
              data.lastLoginDate
            );

            const initialGold = typeof data.gold === 'number' ? data.gold : 50;
            const updatedGold = initialGold + streakRes.awardedGold;
            const updatedStreak = streakRes.streakDays;
            const updatedLastLogin = streakRes.todayString;

            setUser(prev => ({
              ...prev,
              userId: fbUser.uid,
              email: fbUser.email || prev.email,
              fullName: data.fullName || fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : prev.fullName),
              gold: updatedGold,
              streakDays: updatedStreak,
              lastLoginDate: updatedLastLogin,
              dayCount: typeof data.dayCount === 'number' ? data.dayCount : prev.dayCount,
              equippedAvatar: data.equippedAvatar || prev.equippedAvatar,
              equippedCostume: data.equippedCostume || prev.equippedCostume,
              unlockedItems: Array.isArray(data.unlockedItems) ? data.unlockedItems : prev.unlockedItems,
            }));

            // If day changed (new day login), save streak increment and login bonus to Firestore
            if (streakRes.isNewDay) {
              await setDoc(userDocRef, {
                gold: updatedGold,
                streakDays: updatedStreak,
                lastLoginDate: updatedLastLogin,
                updatedAt: new Date().toISOString(),
              }, { merge: true });
            }
          } else {
            // First time login with Google: streak begins at 1
            const defaultName = fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Học viên N3');
            const todayStr = getLocalDateString();
            const newProfile: UserProfile = {
              userId: fbUser.uid,
              fullName: defaultName,
              email: fbUser.email || '',
              gold: 50,
              streakDays: 1, // Starts at 1 on first login
              dayCount: 1,
              lastLoginDate: todayStr,
              unlockedItems: ['avatar-tanuki', 'costume-school'],
              equippedAvatar: 'avatar-tanuki',
              equippedCostume: 'costume-school',
            };
            setUser(newProfile);

            // Persist to user's private Firestore collection
            await setDoc(userDocRef, {
              ...newProfile,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        } catch (e) {
          console.warn('Firestore profile sync error (offline fallback):', e);
        }
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Data Collections State (with auto-sync and updated daily-life examples)
  const [vocabulary, setVocabulary] = useState<VocabularyItem[]>(() => {
    const saved = localStorage.getItem('n3_vocabulary');
    const version = localStorage.getItem('n3_vocab_version');
    const CURRENT_VERSION = 'v5_distinct_daily_life_scenarios';

    if (saved && version === CURRENT_VERSION) {
      try { return JSON.parse(saved); } catch {}
    }

    localStorage.setItem('n3_vocab_version', CURRENT_VERSION);
    if (saved) {
      try {
        const parsed: VocabularyItem[] = JSON.parse(saved);
        const initialMap = new Map(INITIAL_VOCABULARY.map(item => [item.id, item]));
        
        const updatedList = parsed.map(item => {
          const fresh = initialMap.get(item.id);
          return fresh ? fresh : item;
        });

        const existingIds = new Set(parsed.map(i => i.id));
        INITIAL_VOCABULARY.forEach(item => {
          if (!existingIds.has(item.id)) {
            updatedList.push(item);
          }
        });

        localStorage.setItem('n3_vocabulary', JSON.stringify(updatedList));
        return updatedList;
      } catch {}
    }

    localStorage.setItem('n3_vocabulary', JSON.stringify(INITIAL_VOCABULARY));
    return INITIAL_VOCABULARY;
  });

  const [grammarList, setGrammarList] = useState<GrammarItem[]>(() => {
    const saved = localStorage.getItem('n3_grammar');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return INITIAL_GRAMMAR;
  });

  const [kanjiList, setKanjiList] = useState<KanjiItem[]>(INITIAL_KANJI);
  const [readingList, setReadingList] = useState<ReadingPassage[]>(INITIAL_READING);
  const [exams, setExams] = useState<ExamMock[]>(INITIAL_N3_EXAMS);

  // Persist User & Content to LocalStorage & Firestore
  useEffect(() => {
    localStorage.setItem('n3_user_profile', JSON.stringify(user));
    if (currentUser && !isGuestMode) {
      setDoc(doc(db, 'users', currentUser.uid), {
        ...user,
        updatedAt: new Date().toISOString(),
      }, { merge: true }).catch(() => {});
    }
  }, [user, currentUser, isGuestMode]);

  useEffect(() => {
    localStorage.setItem('n3_vocabulary', JSON.stringify(vocabulary));
  }, [vocabulary]);

  useEffect(() => {
    localStorage.setItem('n3_grammar', JSON.stringify(grammarList));
  }, [grammarList]);

  // Dark Mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Gold helper functions
  const handleAddGold = (amount: number) => {
    setUser(prev => ({
      ...prev,
      gold: prev.gold + amount,
    }));
  };

  const handleDeductGold = (amount: number): boolean => {
    if (user.gold < amount) return false;
    setUser(prev => ({
      ...prev,
      gold: prev.gold - amount,
    }));
    return true;
  };

  const handleResetAllData = () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục toàn bộ kho từ vựng và ngữ pháp về mặc định ban đầu?')) {
      setVocabulary(INITIAL_VOCABULARY);
      setGrammarList(INITIAL_GRAMMAR);
      localStorage.removeItem('n3_vocabulary');
      localStorage.removeItem('n3_grammar');
      alert('Đã khôi phục dữ liệu gốc!');
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch {}
    setCurrentUser(null);
    setIsGuestMode(false);
  };

  // Trigger Google Login
  const handleLoginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      setAuthModalOpen(true);
    }
  };

  const handleRequireLogin = (featureName: string) => {
    setGuestLockFeature(featureName);
    setGuestLockModalOpen(true);
  };

  // Loading Screen while Firebase checks authentication session
  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-900 text-white font-sans">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl shadow-xl animate-pulse"
          style={{ backgroundColor: activePreset.primary }}
        >
          N3
        </div>
        <p className="mt-4 text-sm font-bold text-slate-300">
          Đang khởi tạo không gian học tập N3 trong tay...
        </p>
      </div>
    );
  }

  // 3. Login Gate: If not logged in and not in guest mode, show Google Login Screen
  if (!currentUser && !isGuestMode) {
    return (
      <LoginScreen
        isDarkMode={isDarkMode}
        activePreset={activePreset}
        onGuestLogin={() => setIsGuestMode(true)}
      />
    );
  }

  const isGuest = isGuestMode && !currentUser;

  return (
    <div 
      className="h-screen h-[100dvh] flex flex-col font-sans transition-colors duration-200 overflow-hidden"
      style={{
        backgroundColor: isDarkMode ? '#13171D' : '#F8FAFC',
        color: isDarkMode ? '#F8FAFC' : '#1E293B',
      }}
    >
      {/* Top Header with Brand, Pastel Palette Picker, Dark Mode, Gold & Streak */}
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        activePreset={activePreset}
        setActivePreset={setActivePreset}
        user={user}
        setUser={setUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onNavigateTab={handleNavigateTab}
        onAddGold={handleAddGold}
      />

      {/* Persistent Guest Mode Warning Banner ("khi đăng nhập gg mới học được, còn chế độ khách chỉ hiện giao diện và một vài tính năng chứ không được hiện hết") */}
      {isGuest && (
        <div 
          className="border-b px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs transition-colors shrink-0"
          style={{
            backgroundColor: isDarkMode ? '#2D2314' : '#FEF3C7',
            borderColor: '#F59E0B',
            color: isDarkMode ? '#FDE68A' : '#92400E',
          }}
        >
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500 text-white shrink-0 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Chế Độ Dùng Thử (Khách)
            </span>
            <span>Chỉ xem giao diện mẫu và tính năng giới hạn. Đăng nhập Google để mở khóa toàn bộ lộ trình và thi đấu thách đấu 1v1.</span>
          </div>

          <button
            onClick={handleLoginWithGoogle}
            className="self-start sm:self-auto px-4 py-1.5 rounded-xl text-xs font-black text-white shadow-xs transition-transform active:scale-95 cursor-pointer flex items-center gap-1.5 shrink-0"
            style={{ backgroundColor: activePreset.primary }}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Đăng Nhập Google Ngay</span>
          </button>
        </div>
      )}

      {/* Main Container with Collapsible Sidebar & Content Body */}
      <div className="flex-1 flex min-w-0 overflow-hidden">
        {/* Collapsible Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          activePreset={activePreset}
          user={user}
        />

        {/* Content Viewport with pb-28 on mobile for bottom navigation bar, stationary layout */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 overflow-y-auto pb-28 md:pb-8 max-w-full overflow-x-hidden">
          {activeTab === 'vocab' && (
            <VocabSection
              vocabulary={vocabulary}
              setVocabulary={setVocabulary}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
              isGuestMode={isGuest}
              onRequireLogin={handleRequireLogin}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarSection
              grammarList={grammarList}
              setGrammarList={setGrammarList}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
              isGuestMode={isGuest}
              onRequireLogin={handleRequireLogin}
            />
          )}

          {activeTab === 'flashcard' && (
            <FlashcardSection
              vocabulary={vocabulary}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
            />
          )}

          {activeTab === 'kanji' && (
            <KanjiSection
              kanjiList={kanjiList}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
            />
          )}

          {activeTab === 'reading' && (
            <ReadingSection
              readingList={readingList}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
            />
          )}

          {activeTab === 'exam' && (
            <ExamSection
              exams={exams}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
              isGuestMode={isGuest}
              onRequireLogin={handleRequireLogin}
            />
          )}

          {activeTab === 'speaking' && (
            <SpeakingSection
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
              isGuestMode={isGuest}
              onRequireLogin={handleRequireLogin}
            />
          )}

          {activeTab === 'game' && (
            <GameRankSection
              vocabulary={vocabulary}
              user={user}
              setUser={setUser}
              currentUser={currentUser}
              isGuestMode={isGuest}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
              onOpenAuth={() => setAuthModalOpen(true)}
              activeSubTab={gameSubTab}
              initialSubTab={gameSubTab}
              onSubTabChange={setGameSubTab}
            />
          )}

          {activeTab === 'shop' && (
            <ShopSection
              user={user}
              setUser={setUser}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onDeductGold={handleDeductGold}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsSection
              user={user}
              setUser={setUser}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              activePreset={activePreset}
              setActivePreset={setActivePreset}
              onResetAllData={handleResetAllData}
              onSignOut={handleSignOut}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Optimized for Phones 320px - 480px) */}
      <nav 
        id="mobile-bottom-nav"
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-around py-1.5 px-0.5 backdrop-blur-md shadow-lg pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
        style={{
          backgroundColor: isDarkMode ? '#1E232AE6' : '#FFFFFFE6',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <button 
          onClick={() => setActiveTab('vocab')}
          className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95"
          style={{ color: activeTab === 'vocab' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate max-w-full">Từ vựng</span>
        </button>

        <button 
          onClick={() => setActiveTab('flashcard')}
          className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95"
          style={{ color: activeTab === 'flashcard' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate max-w-full">Flashcard</span>
        </button>

        <button 
          onClick={() => setActiveTab('game')}
          className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95"
          style={{ color: activeTab === 'game' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
          <span className="truncate max-w-full">Thách đấu</span>
        </button>

        <button 
          onClick={() => setActiveTab('exam')}
          className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95"
          style={{ color: activeTab === 'exam' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Headphones className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate max-w-full">Thi thử</span>
        </button>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1 px-0.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer active:scale-95"
          style={{ color: sidebarOpen ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Menu className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          <span className="truncate max-w-full">Menu</span>
        </button>
      </nav>

      {/* User Profile & Rename Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        user={user}
        setUser={setUser}
        isDarkMode={isDarkMode}
        activePreset={activePreset}
        onSignOut={handleSignOut}
      />

      {/* Guest Lock Feature Modal */}
      <GuestLockModal
        isOpen={guestLockModalOpen}
        onClose={() => setGuestLockModalOpen(false)}
        onLoginWithGoogle={handleLoginWithGoogle}
        featureName={guestLockFeature}
        isDarkMode={isDarkMode}
        activePreset={activePreset}
      />
    </div>
  );
}
