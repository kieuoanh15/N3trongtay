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
  signOut 
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

import { 
  BookOpen, 
  Sparkles, 
  FileText, 
  Headphones, 
  Menu 
} from 'lucide-react';

export default function App() {
  // Theme & Layout State
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<ThemePreset>(THEME_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<TabType>('vocab');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);

  // User Profile State (Default template until loaded from Firebase/localStorage)
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('n3_user_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      userId: 'N3-STUDENT',
      fullName: 'Học viên N3',
      email: '',
      gold: 450,
      streakDays: 5,
      dayCount: 24, // Day 24 out of 90
      unlockedItems: ['avatar-tanuki', 'costume-school'],
      equippedAvatar: 'avatar-tanuki',
      equippedCostume: 'costume-school',
    };
  });

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
            setUser(prev => ({
              ...prev,
              userId: fbUser.uid,
              email: fbUser.email || prev.email,
              // "đặt tên người dùng theo tài khoản và có thể đổi tên"
              fullName: data.fullName || fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : prev.fullName),
              gold: typeof data.gold === 'number' ? data.gold : prev.gold,
              streakDays: typeof data.streakDays === 'number' ? data.streakDays : prev.streakDays,
              dayCount: typeof data.dayCount === 'number' ? data.dayCount : prev.dayCount,
              equippedAvatar: data.equippedAvatar || prev.equippedAvatar,
              equippedCostume: data.equippedCostume || prev.equippedCostume,
              unlockedItems: Array.isArray(data.unlockedItems) ? data.unlockedItems : prev.unlockedItems,
            }));
          } else {
            // First time login with Google: default name to Google Display Name
            const defaultName = fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : 'Học viên N3');
            const newProfile: UserProfile = {
              userId: fbUser.uid,
              fullName: defaultName,
              email: fbUser.email || '',
              gold: 450,
              streakDays: 1,
              dayCount: 1,
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

  return (
    <div 
      className="min-h-screen flex flex-col font-sans transition-colors duration-200"
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
        onNavigateTab={setActiveTab}
        onAddGold={handleAddGold}
      />

      {/* Main Container with Collapsible Sidebar & Content Body */}
      <div className="flex-1 flex min-w-0">
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

        {/* Content Viewport with pb-20 on mobile for bottom navigation bar */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 overflow-y-auto pb-20 lg:pb-8">
          {activeTab === 'vocab' && (
            <VocabSection
              vocabulary={vocabulary}
              setVocabulary={setVocabulary}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
            />
          )}

          {activeTab === 'grammar' && (
            <GrammarSection
              grammarList={grammarList}
              setGrammarList={setGrammarList}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
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
            />
          )}

          {activeTab === 'speaking' && (
            <SpeakingSection
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
            />
          )}

          {activeTab === 'game' && (
            <GameRankSection
              vocabulary={vocabulary}
              user={user}
              setUser={setUser}
              isDarkMode={isDarkMode}
              activePreset={activePreset}
              onAddGold={handleAddGold}
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

      {/* Mobile Bottom Navigation Bar (Optimized for Phones) */}
      <nav 
        id="mobile-bottom-nav"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-around py-2 px-1 backdrop-blur-md shadow-lg"
        style={{
          backgroundColor: isDarkMode ? '#1E232AE6' : '#FFFFFFE6',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <button 
          onClick={() => setActiveTab('vocab')}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          style={{ color: activeTab === 'vocab' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <BookOpen className="w-5 h-5" />
          <span>Từ vựng</span>
        </button>

        <button 
          onClick={() => setActiveTab('flashcard')}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          style={{ color: activeTab === 'flashcard' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Sparkles className="w-5 h-5" />
          <span>Flashcard</span>
        </button>

        <button 
          onClick={() => setActiveTab('reading')}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          style={{ color: activeTab === 'reading' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <FileText className="w-5 h-5" />
          <span>Đọc hiểu</span>
        </button>

        <button 
          onClick={() => setActiveTab('exam')}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          style={{ color: activeTab === 'exam' ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Headphones className="w-5 h-5" />
          <span>Thi thử</span>
        </button>

        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex flex-col items-center gap-1 p-1 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
          style={{ color: sidebarOpen ? activePreset.primary : (isDarkMode ? '#94A3B8' : '#64748B') }}
        >
          <Menu className="w-5 h-5" />
          <span>Menu</span>
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
    </div>
  );
}
