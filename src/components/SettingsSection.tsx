import React, { useState } from 'react';
import { 
  History,
  ShieldCheck,
  Sliders,
  Calendar, 
  Database, 
  RotateCcw, 
  Trash2, 
  Volume2, 
  Sparkles,
  Lock,
  Mail,
  Phone,
  LogOut,
  Bell,
  Sun,
  Moon,
  CheckCircle,
  Palette,
  Clock,
  BookOpen,
  Award,
  Zap,
  Check
} from 'lucide-react';
import { UserProfile, StudyActivityLog } from '../types';
import { ThemePreset, THEME_PRESETS } from '../utils/themePresets';
import { auth, signOut } from '../firebase';

interface SettingsSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  activePreset: ThemePreset;
  setActivePreset: (preset: ThemePreset) => void;
  onResetAllData: () => void;
  onSignOut?: () => void;
}

type SettingsTab = 'history' | 'security' | 'app_config';

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  user,
  setUser,
  isDarkMode,
  setIsDarkMode,
  activePreset,
  setActivePreset,
  onResetAllData,
  onSignOut,
}) => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('history');
  const [dayInput, setDayInput] = useState(user.dayCount);
  const [speechRate, setSpeechRate] = useState(0.85);
  const [notification, setNotification] = useState<string | null>(null);

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailInput, setEmailInput] = useState(user.email || 'oanhto1505@gmail.com');
  const [phoneInput, setPhoneInput] = useState(user.phone || '0988 123 456');

  // App Settings State
  const [notifyTime, setNotifyTime] = useState('20:00');
  const [notifyEnabled, setNotifyEnabled] = useState(true);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpdateDay = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Math.max(1, Math.min(90, Number(dayInput)));
    setUser(prev => ({ ...prev, dayCount: parsed }));
    showToast(`Đã cập nhật tiến độ lộ trình sang Ngày ${parsed}/90!`);
  };

  const handleClearCache = () => {
    if (confirm('Bạn có chắc chắn muốn xóa bộ nhớ đệm cache tạm thời của ứng dụng? (Dữ liệu học tập cốt lõi vẫn được giữ nguyên)')) {
      showToast('Đã dọn dẹp sạch sẽ bộ nhớ đệm cache!');
    }
  };

  const testVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance('こんにちは！日本語の勉強を頑張りましょう。');
      u.lang = 'ja-JP';
      u.rate = speechRate;
      window.speechSynthesis.speak(u);
    }
  };

  // Password reset handler
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      alert('Vui lòng nhập mật khẩu hiện tại!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Mật khẩu mới phải có ít nhất 6 ký tự!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp!');
      return;
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Đổi mật khẩu tài khoản thành công!');
  };

  // Update account contacts (email & phone)
  const handleUpdateContacts = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      email: emailInput,
      phone: phoneInput,
    }));
    showToast('Đã liên kết Email và Số điện thoại mới thành công!');
  };

  // Logout handler
  const handleLogout = async () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất tài khoản này?')) {
      try {
        await signOut(auth);
      } catch {}
      if (onSignOut) {
        onSignOut();
      }
    }
  };

  // Default initial study history if empty
  const defaultHistory: StudyActivityLog[] = [
    {
      id: 'log-1',
      type: 'reading',
      title: 'Đọc hiểu Đoản văn: Quản lý thời gian Pomodoro (時間管理と集中力)',
      score: '2/2 Đúng (100%)',
      timestamp: '21/09/2026 - 16:45',
      goldEarned: 50,
    },
    {
      id: 'log-2',
      type: 'quiz',
      title: 'Mini-Game Trắc nghiệm 20 Từ vựng Mimikara N3 Tuần 1',
      score: '19/20 (95%)',
      timestamp: '21/09/2026 - 14:15',
      goldEarned: 190,
    },
    {
      id: 'log-3',
      type: 'streak',
      title: 'Duy trì chuỗi học tập liên tiếp: Ngày thứ 7',
      score: 'Hoàn thành mục tiêu',
      timestamp: '21/09/2026 - 08:30',
      goldEarned: 250,
    },
    {
      id: 'log-4',
      type: 'reading',
      title: 'Đọc hiểu Trung văn: Phân loại rác & Văn hóa tái chế Nhật Bản',
      score: '1/1 Đúng (100%)',
      timestamp: '20/09/2026 - 20:10',
      goldEarned: 25,
    },
    {
      id: 'log-5',
      type: 'exam',
      title: 'Thi thử JLPT N3 Đề số 1 (Năm 2023 - Đọc hiểu & Ngữ pháp)',
      score: '142/180 Điểm (Đỗ N3)',
      timestamp: '19/09/2026 - 21:00',
      goldEarned: 300,
    },
    {
      id: 'log-6',
      type: 'streak',
      title: 'Duy trì chuỗi học tập liên tiếp: Ngày thứ 6',
      score: 'Hoàn thành mục tiêu',
      timestamp: '19/09/2026 - 09:12',
      goldEarned: 50,
    },
  ];

  const historyList = user.studyHistory && user.studyHistory.length > 0 
    ? user.studyHistory 
    : defaultHistory;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Toast */}
      {notification && (
        <div 
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: activePreset.primary,
            color: isDarkMode ? '#F8FAFC' : '#1E293B',
          }}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-semibold">{notification}</span>
        </div>
      )}

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
              Hệ Thống & Quản Lý
            </span>
            <span className="text-xs text-gray-500 font-medium">Phiên bản 3.2 Pro</span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Cài Đặt & Quản Lý Ứng Dụng
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Xem lịch sử học tập, cấu hình bảo mật tài khoản và tùy chỉnh giao diện/âm thanh.
          </p>
        </div>
      </div>

      {/* 3 Main Management Tabs Header */}
      <div 
        className="p-1.5 rounded-2xl border grid grid-cols-1 sm:grid-cols-3 gap-1.5"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
          borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
        }}
      >
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black transition-all ${
            activeTab === 'history' 
              ? 'bg-white dark:bg-gray-800 shadow-xs' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
          style={{
            color: activeTab === 'history' ? activePreset.primary : undefined,
          }}
        >
          <History className="w-4 h-4" />
          <span>a) Lịch Sử Học Tập</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black transition-all ${
            activeTab === 'security' 
              ? 'bg-white dark:bg-gray-800 shadow-xs' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
          style={{
            color: activeTab === 'security' ? activePreset.primary : undefined,
          }}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>b) Bảo Mật & Tài Khoản</span>
        </button>

        <button
          onClick={() => setActiveTab('app_config')}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black transition-all ${
            activeTab === 'app_config' 
              ? 'bg-white dark:bg-gray-800 shadow-xs' 
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
          style={{
            color: activeTab === 'app_config' ? activePreset.primary : undefined,
          }}
        >
          <Sliders className="w-4 h-4" />
          <span>c) Cài Đặt Ứng Dụng</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB A: LỊCH SỬ HỌC TẬP (STUDY HISTORY & ACTIVITY LOG) */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Streak & Overall Stats Summary Card */}
          <div 
            className="p-6 rounded-3xl border shadow-sm"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-4"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs"
                  style={{ backgroundColor: activePreset.primary }}
                >
                  <History className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-gray-100">
                    Nhật Ký Học Tập & Chuỗi Hoạt Động (Activity Log)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Ghi lại các bài đọc hiểu hoàn thành, điểm số làm quiz và lịch sử tích lũy chuỗi ngày học.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-amber-500" />
                  Chuỗi {user.streakDays} ngày
                </span>
                <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {user.gold} Vàng
                </span>
              </div>
            </div>

            {/* List of Activities */}
            <div className="space-y-3">
              {historyList.map((log) => {
                const isReading = log.type === 'reading';
                const isQuiz = log.type === 'quiz';
                const isExam = log.type === 'exam';

                let icon = <BookOpen className="w-4 h-4 text-blue-500" />;
                let tagColor = 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400';
                let typeLabel = 'Đọc hiểu N3';

                if (isQuiz) {
                  icon = <Sparkles className="w-4 h-4 text-purple-500" />;
                  tagColor = 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400';
                  typeLabel = 'Mini-Game Quiz';
                } else if (isExam) {
                  icon = <Award className="w-4 h-4 text-rose-500" />;
                  tagColor = 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400';
                  typeLabel = 'Thi Thử JLPT';
                } else if (log.type === 'streak') {
                  icon = <Zap className="w-4 h-4 text-amber-500" />;
                  tagColor = 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400';
                  typeLabel = 'Điểm danh Streak';
                }

                return (
                  <div 
                    key={log.id}
                    className="p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                    style={{
                      backgroundColor: isDarkMode ? '#242B36' : '#F9FBFC',
                      borderColor: isDarkMode ? '#333D4C' : '#EAEFF5',
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-gray-800 shadow-2xs mt-0.5 shrink-0">
                        {icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${tagColor}`}>
                            {typeLabel}
                          </span>
                          <span className="text-[11px] text-gray-400 flex items-center gap-1 font-mono">
                            <Clock className="w-3 h-3" />
                            {log.timestamp}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100">
                          {log.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-11 sm:pl-0">
                      {log.score && (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {log.score}
                        </span>
                      )}
                      {log.goldEarned && (
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          +{log.goldEarned} 🪙
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lộ trình 90 ngày (Phân kỳ mục tiêu) */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                  style={{ backgroundColor: activePreset.primary }}
                >
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                    Mục Tiêu Lộ Trình 90 Ngày
                  </h3>
                  <p className="text-xs text-gray-400">
                    Điều chỉnh tiến độ ngày học hiện tại
                  </p>
                </div>
              </div>

              <span 
                className="text-xs font-black px-3 py-1 rounded-xl"
                style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
              >
                Đạt {Math.round((user.dayCount / 90) * 100)}% Lộ Trình (Ngày {user.dayCount}/90)
              </span>
            </div>

            <form onSubmit={handleUpdateDay} className="flex items-center gap-3 pt-1">
              <label className="text-xs font-bold text-gray-600 dark:text-gray-300">
                Chuyển nhanh sang ngày học:
              </label>
              <input
                type="number"
                min={1}
                max={90}
                value={dayInput}
                onChange={(e) => setDayInput(Number(e.target.value))}
                className="w-20 px-3 py-1.5 rounded-xl text-xs border outline-none font-bold text-center"
                style={{
                  backgroundColor: isDarkMode ? '#2D3748' : '#F8FAFC',
                  borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                  color: isDarkMode ? '#F8FAFC' : '#1E293B',
                }}
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs"
                style={{ backgroundColor: activePreset.primary }}
              >
                Cập Nhật
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB B: BẢO MẬT & TÀI KHOẢN (SECURITY & ACCOUNT) */}
      {/* ========================================================================= */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 1. Đổi Mật Khẩu (Password Reset Form) */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-3 border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-rose-500 text-white shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Đổi Mật Khẩu Tài Khoản (Password Reset)
                </h3>
                <p className="text-xs text-gray-400">
                  Bảo vệ dữ liệu học tập và chuỗi streak an toàn tuyệt đối
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChange} className="space-y-3.5 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Mật khẩu hiện tại:
                </label>
                <input
                  type="password"
                  placeholder="Nhập mật khẩu cũ của bạn"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Mật khẩu mới:
                  </label>
                  <input
                    type="password"
                    placeholder="Ít nhất 6 ký tự"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                      borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                    Xác nhận mật khẩu:
                  </label>
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu mới"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                      borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-xs"
                style={{ backgroundColor: activePreset.primary }}
              >
                Cập Nhật Mật Khẩu
              </button>
            </form>
          </div>

          {/* 2. Liên Kết Email / Số Điện Thoại */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-3 border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-500 text-white shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Liên Kết Email & Số Điện Thoại (Email/Phone Link)
                </h3>
                <p className="text-xs text-gray-400">
                  Đồng bộ điểm số, quà tặng và nhận thông báo kết quả thi thử
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateContacts} className="space-y-3.5 max-w-lg">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-500" /> Địa chỉ Email:
                </label>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> Số điện thoại di động:
                </label>
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="0988 123 456"
                  className="w-full px-3.5 py-2 rounded-xl text-xs border outline-none font-medium"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-xs"
                style={{ backgroundColor: activePreset.primary }}
              >
                Lưu Liên Kết Tài Khoản
              </button>
            </form>
          </div>

          {/* 3. Đăng Xuất (Logout button) & Quản lý phiên */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Phiên Đăng Nhập Hiện Tại
                </h3>
                <p className="text-xs text-gray-400">
                  Tài khoản: <span className="font-bold text-gray-700 dark:text-gray-200">{user.fullName}</span> ({user.email || 'Học viên N3'})
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900 transition-all active:scale-95 shadow-2xs"
              >
                <LogOut className="w-4 h-4" />
                Đăng Xuất Tài Khoản
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB C: CÀI ĐẶT ỨNG DỤNG (APP SETTINGS) */}
      {/* ========================================================================= */}
      {activeTab === 'app_config' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* 1. Theme Selector: Dark / Light / Pastel Presets */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-3 border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-indigo-500 text-white shadow-xs">
                <Palette className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Giao Diện & Bộ Màu Pastel (Theme Selector)
                </h3>
                <p className="text-xs text-gray-400">
                  Lựa chọn chế độ Sáng / Tối và 5 bộ màu Nhật Bản hài hòa
                </p>
              </div>
            </div>

            {/* Dark / Light Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl border bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2.5">
                {isDarkMode ? <Moon className="w-4 h-4 text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Chế độ nền: {isDarkMode ? '🌙 Dark Mode (Nền Đen Dịu Mắt)' : '☀️ Light Mode (Nền Sáng Tinh Tế)'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-200 dark:bg-gray-700">
                <button
                  onClick={() => setIsDarkMode(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    !isDarkMode ? 'bg-white text-gray-900 shadow-2xs' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400'
                  }`}
                >
                  Sáng
                </button>
                <button
                  onClick={() => setIsDarkMode(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    isDarkMode ? 'bg-gray-900 text-white shadow-2xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Tối
                </button>
              </div>
            </div>

            {/* 5 Pastel Color Presets Grid */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300 block">
                Chọn Bộ Màu Điểm Nhấn (Accent Pastel):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePreset(preset);
                        showToast(`Đã áp dụng bộ màu ${preset.name}!`);
                      }}
                      className="p-3 rounded-2xl border text-left flex items-center justify-between transition-all hover:scale-[1.02] shadow-2xs"
                      style={{
                        backgroundColor: isSelected ? preset.light : (isDarkMode ? '#242B36' : '#FFFFFF'),
                        borderColor: isSelected ? preset.primary : (isDarkMode ? '#333D4C' : '#E2E8F0'),
                      }}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-white/60 shadow-xs" 
                          style={{ backgroundColor: preset.primary }} 
                        />
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100">
                          {preset.name.split('(')[0].trim()}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4" style={{ color: preset.primary }} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. Tùy Chỉnh Giọng Đọc (Toggle Audio Speed & Auto-Play) */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-3 border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-teal-500 text-white shadow-xs">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Cài Đặt Âm Thanh & Tốc Độ Đọc (Audio Settings)
                </h3>
                <p className="text-xs text-gray-400">
                  Điều chỉnh tốc độ phát âm từ vựng, ngữ pháp và bài nghe Choukai
                </p>
              </div>
            </div>

            {/* Audio Speed Slider */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Tốc độ đọc giọng Nhật:</span>
                <input
                  type="range"
                  min="0.6"
                  max="1.2"
                  step="0.05"
                  value={speechRate}
                  onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                  className="w-40 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">{speechRate}x</span>
              </div>

              <button
                type="button"
                onClick={testVoice}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-80 shadow-2xs"
                style={{
                  backgroundColor: isDarkMode ? '#2D3748' : '#F8FAFC',
                  borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                  color: isDarkMode ? '#E2E8F0' : '#334155',
                }}
              >
                <Volume2 className="w-4 h-4 text-teal-500" />
                Nghe Thử Phát Âm
              </button>
            </div>

            {/* Toggle Auto-Play */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Tự động phát âm thanh khi lật thẻ Flashcard:
              </span>
              <button
                onClick={() => setAutoPlayAudio(!autoPlayAudio)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  autoPlayAudio ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    autoPlayAudio ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 3. Cài Đặt Thông Báo Học Tập (Push Notification Time Settings) */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-3 border-b pb-3"
              style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
            >
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-amber-500 text-white shadow-xs">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Nhắc Nhở Học Tập Hàng Ngày (Push Notification)
                </h3>
                <p className="text-xs text-gray-400">
                  Cài đặt khung giờ thông báo nhắc nhở giữ vững chuỗi Streak không bị gián đoạn
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                  Giờ thông báo mỗi ngày:
                </span>
                <input
                  type="time"
                  value={notifyTime}
                  onChange={(e) => setNotifyTime(e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs border font-mono font-bold outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Kích hoạt thông báo:</span>
                <button
                  onClick={() => {
                    const next = !notifyEnabled;
                    setNotifyEnabled(next);
                    showToast(next ? `Đã bật nhắc nhở lúc ${notifyTime} hàng ngày!` : 'Đã tắt nhắc nhở hàng ngày.');
                  }}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    notifyEnabled ? 'bg-amber-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      notifyEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 4. Quản Lý Bộ Nhớ Đệm Cache & Khôi Phục Cài Đặt Gốc */}
          <div 
            className="p-6 rounded-3xl border shadow-sm space-y-4"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-gray-500 text-white shadow-xs">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">
                  Quản Lý Bộ Nhớ Đệm Cache & Dữ Liệu
                </h3>
                <p className="text-xs text-gray-400">
                  Giải phóng dung lượng trình duyệt và khôi phục cài đặt gốc
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleClearCache}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all shadow-2xs"
                style={{ borderColor: isDarkMode ? '#4A5568' : '#CBD5E1' }}
              >
                <RotateCcw className="w-4 h-4 text-amber-500" />
                Dọn Dẹp Bộ Nhớ Đệm Cache
              </button>

              <button
                onClick={onResetAllData}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-900 transition-all shadow-2xs"
              >
                <Trash2 className="w-4 h-4" />
                Khôi Phục Dữ Liệu Gốc Ban Đầu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
