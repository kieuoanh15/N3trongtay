export type TabType = 
  | 'vocab'
  | 'grammar'
  | 'flashcard'
  | 'kanji'
  | 'reading'
  | 'exam'
  | 'speaking'
  | 'game'
  | 'shop'
  | 'settings';

export type VocabPartOfSpeech = 'noun' | 'i_adj' | 'na_adj' | 'verb';

export interface VocabularyItem {
  id: string;
  kanji: string;
  sinoVietnamese: string; // Âm Hán Việt
  hiragana: string;
  meaningVi: string;
  partOfSpeech: VocabPartOfSpeech;
  sentenceJa: string;
  sentenceFurigana: string;
  sentenceVi: string;
  isCustom?: boolean;
  memorized?: boolean;
  needsReview?: boolean;
}

export interface GrammarItem {
  id: string;
  title: string;
  titleFurigana: string;
  formula: string;
  category?: string; // Nhóm ý nghĩa: Lý do, Mục đích, Điều kiện, Đối lập, Thời gian, Mức độ, Khuyên nhủ...
  meaningVi: string;
  explanationVi: string;
  examples: {
    ja: string;
    furigana: string;
    vi: string;
  }[];
  isCustom?: boolean;
  memorized?: boolean;
}

export interface KanjiItem {
  id: string;
  kanji: string;
  sinoVietnamese: string;
  onyomi: string[];
  kunyomi: string[];
  meaningVi: string;
  strokeCount: number;
  radical: string;
  strokePaths: string[];
  strokeStartPoints?: { x: number; y: number }[]; // Accurate stroke start coordinate (x,y)
  exampleWords: {
    word: string;
    furigana: string;
    meaningVi: string;
  }[];
}

export type ReadingType = 'short' | 'medium' | 'info_search';

export interface ReadingQuestion {
  id: string;
  questionJa: string;
  questionFurigana?: string;
  options: {
    textJa: string;
    textFurigana?: string;
  }[];
  correctIndex: number;
  explanationVi: string;
}

export interface ReadingPassage {
  id: string;
  type: ReadingType;
  title: string;
  sourceNote?: string;
  passageJa: string;
  passageFurigana?: string;
  translationVi?: string; // Bản dịch toàn bài tiếng Việt
  vocabularyList?: { word: string; furigana: string; meaningVi: string; meaning?: string }[]; // Từ điển tra cứu nhanh
  questions: ReadingQuestion[];
}


export interface ExamQuestion {
  id: string;
  section: 'Chữ Hán - Từ Vựng' | 'Ngữ Pháp' | 'Đọc Hiểu' | 'Nghe Hiểu (Choukai)';
  audioUrl?: string;
  audioScriptJa?: string;
  audioScriptFurigana?: string;
  questionJa: string;
  questionFurigana: string;
  options: {
    textJa: string;
    textFurigana: string;
  }[];
  correctIndex: number;
  explanationVi: string;
}

export interface ExamMock {
  id: string;
  title: string;
  year: string;
  totalTimeMinutes: number;
  questions: ExamQuestion[];
}

export interface ShopItem {
  id: string;
  name: string;
  type: 'avatar' | 'costume';
  price: number;
  description: string;
  previewEmoji: string;
  accentColor: string;
  isUnlocked?: boolean;
}

export interface UserProfile {
  userId: string;
  fullName: string;
  email?: string;
  phone?: string;
  emailOrPhone?: string;
  avatarId?: string;
  costumeId?: string;
  gold: number;
  streakDays: number;
  lastStudyDate?: string;
  claimedStreakMilestones?: number[];
  unlockedShopItemIds?: string[];
  unlockedItems: string[];
  equippedAvatar: string;
  equippedCostume: string;
  jlptGoalDays?: number; // 90 days
  dayCount: number; // Day 1..90
  studyHistory?: StudyActivityLog[];
}

export interface StudyActivityLog {
  id: string;
  type: 'reading' | 'quiz' | 'exam' | 'streak';
  title: string;
  score?: string;
  timestamp: string;
  goldEarned?: number;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  score: number;
  avatarId: string;
  costumeId: string;
  goldPrize: number;
  isCurrentUser?: boolean;
}
