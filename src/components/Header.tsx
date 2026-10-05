import React, { useState } from 'react';
import { 
  Menu, 
  Sun, 
  Moon, 
  Palette, 
  Coins, 
  Flame, 
  Check, 
  Sparkles,
  X,
  Trophy,
  Gift,
  CalendarCheck,
  ShoppingBag,
  Award,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { THEME_PRESETS, ThemePreset } from '../utils/themePresets';
import { UserProfile, TabType } from '../types';
import { ItemGraphic } from './ItemGraphic';
import confetti from 'canvas-confetti';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  activePreset: ThemePreset;
  setActivePreset: (preset: ThemePreset) => void;
  user: UserProfile;
  setUser?: React.Dispatch<React.SetStateAction<UserProfile>>;
  onOpenAuth: () => void;
  onNavigateTab?: (tab: TabType) => void;
  onAddGold?: (amount: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  sidebarOpen,
  setSidebarOpen,
  isDarkMode,
  setIsDarkMode,
  activePreset,
  setActivePreset,
  user,
  setUser,
  onOpenAuth,
  onNavigateTab,
  onAddGold,
}) => {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showStreakModal, setShowStreakModal] = useState(false);
  const [showGoldModal, setShowGoldModal] = useState(false);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(() => {
    const today = new Date().toDateString();
    return localStorage.getItem('n3_last_checkin_date') === today;
  });

  // Handle Daily Check-in from Streak Modal
  const handleDailyCheckIn = () => {
    if (hasCheckedInToday) return;

    const today = new Date().toDateString();
    localStorage.setItem('n3_last_checkin_date', today);
    setHasCheckedInToday(true);

    if (setUser) {
      setUser(prev => ({
        ...prev,
        streakDays: prev.streakDays + 1,
        gold: prev.gold + 10,
      }));
    } else if (onAddGold) {
      onAddGold(10);
    }

    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  // Claim Bonus Gift Gold
  const handleClaimBonusGold = () => {
    if (onAddGold) {
      onAddGold(100);
    } else if (setUser) {
      setUser(prev => ({ ...prev, gold: prev.gold + 100 }));
    }
    try {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
    } catch {}
  };

  // Claim Streak Milestone
  const handleClaimMilestone = (targetDays: number, rewardGold: number) => {
    if (user.streakDays < targetDays) return;
    const claimedKey = `n3_milestone_${targetDays}`;
    if (localStorage.getItem(claimedKey)) return;

    localStorage.setItem(claimedKey, 'claimed');
    if (onAddGold) {
      onAddGold(rewardGold);
    } else if (setUser) {
      setUser(prev => ({ ...prev, gold: prev.gold + rewardGold }));
    }
    try {
      confetti({ particleCount: 80, spread: 90 });
    } catch {}
  };

  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const currentDayIndex = (new Date().getDay() + 6) % 7; // Monday = 0

  return (
    <header 
      id="app-header"
      className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b transition-colors duration-200 backdrop-blur-md"
      style={{
        backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFFE8',
        borderColor: isDarkMode ? '#2D3748' : '#EAEFF5',
      }}
    >
      {/* Left: Sidebar Toggle + Title */}
      <div className="flex items-center gap-3">
        <button
          id="btn-sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl transition-colors hover:opacity-80 active:scale-95"
          style={{
            backgroundColor: isDarkMode ? '#2D3748' : activePreset.badgeBg,
            color: activePreset.primary,
          }}
          title="Bật/Tắt thanh điều hướng"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div 
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm"
            style={{ backgroundColor: activePreset.primary }}
          >
            N3
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 
                className="text-lg font-extrabold tracking-tight"
                style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
              >
                N3 trong tay
              </h1>
              <span 
                className="text-[11px] font-bold px-2 py-0.5 rounded-full nowrap-label"
                style={{
                  backgroundColor: activePreset.badgeBg,
                  color: activePreset.primary,
                }}
              >
                Lộ trình 90 ngày
              </span>
            </div>
            <p 
              className="text-[11px] hidden sm:block font-medium"
              style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
            >
              Chinh phục JLPT N3 toàn diện trong 3 tháng
            </p>
          </div>
        </div>
      </div>

      {/* Right: Interactive Stats (Streak, Gold) + Palette + Dark Mode + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Button (Clickable -> Opens Streak Info Modal) */}
        <button 
          id="btn-streak-modal"
          onClick={() => setShowStreakModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#34261A' : '#FFF7ED',
            color: '#EA580C',
            border: '1px solid rgba(234, 88, 12, 0.35)',
          }}
          title="Nhấn để xem chi tiết Chuỗi ngày học tập & Điểm danh"
        >
          <Flame className="w-4 h-4 text-orange-500 animate-pulse fill-orange-500" />
          <span>{user.streakDays} ngày</span>
        </button>

        {/* Gold Counter Button (Clickable -> Opens Gold Vault Modal) */}
        <button 
          id="btn-gold-modal"
          onClick={() => setShowGoldModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#362E19' : '#FEFCE8',
            color: '#B45309',
            border: '1px solid rgba(202, 138, 4, 0.4)',
          }}
          title="Nhấn để xem Kho Vàng & Cách kiếm thêm Vàng"
        >
          <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
          <span>{user.gold}</span>
        </button>

        {/* Theme Palette Dropdown */}
        <div className="relative">
          <button
            id="btn-color-palette"
            onClick={() => setShowColorMenu(!showColorMenu)}
            className="p-2 rounded-xl transition-colors hover:opacity-80 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : activePreset.badgeBg,
              color: activePreset.primary,
            }}
            title="Tùy biến bảng màu Pastel"
          >
            <Palette className="w-4 h-4" />
          </button>

          {showColorMenu && (
            <div 
              id="color-menu-dropdown"
              className="absolute right-0 mt-2 w-64 p-3 rounded-2xl shadow-xl border z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isDarkMode ? '#374151' : '#E2E8F0',
              }}
            >
              <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-gray-200 dark:border-gray-700">
                <span 
                  className="text-xs font-bold flex items-center gap-1.5"
                  style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Bảng màu Pastel
                </span>
                <span className="text-[10px] text-gray-400">Dịu mắt</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {THEME_PRESETS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        setActivePreset(preset);
                        setShowColorMenu(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs font-semibold transition-all ${
                        isSelected 
                          ? 'ring-2 ring-offset-1' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      style={{
                        backgroundColor: preset.light,
                        color: preset.dark,
                      }}
                    >
                      <span 
                        className="w-4 h-4 rounded-full shadow-inner flex items-center justify-center shrink-0"
                        style={{ backgroundColor: preset.primary }}
                      >
                        {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                      </span>
                      <span className="truncate text-[11px] font-bold">{preset.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <div className="mt-3 pt-2.5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <span className="text-[11px] font-medium" style={{ color: isDarkMode ? '#CBD5E1' : '#475569' }}>
                  Chọn màu tự do:
                </span>
                <input
                  type="color"
                  value={activePreset.primary}
                  onChange={(e) => {
                    const customColor = e.target.value;
                    setActivePreset({
                      id: 'custom',
                      name: 'Tự chọn',
                      primary: customColor,
                      accent: customColor,
                      light: '#F8FAFC',
                      dark: '#1E293B',
                      badgeBg: `${customColor}22`,
                    });
                  }}
                  className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>
            </div>
          )}
        </div>

        {/* Light / Dark Mode Toggle */}
        <button
          id="btn-darkmode-toggle"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl transition-colors hover:opacity-80 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: isDarkMode ? '#2D3748' : '#F1F5F9',
            color: isDarkMode ? '#FBBF24' : '#475569',
          }}
          title={isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Account Button with Active Equipped Avatar Graphic */}
        <button
          id="btn-user-profile"
          onClick={onOpenAuth}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-xl transition-transform active:scale-95 border hover:opacity-90 cursor-pointer shadow-2xs"
          style={{
            backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
            borderColor: isDarkMode ? '#4B5563' : '#CBD5E1',
          }}
          title="Tài khoản & Quản lý dữ liệu"
        >
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center p-0.5 shadow-xs border"
            style={{ 
              backgroundColor: isDarkMode ? '#1E242C' : activePreset.badgeBg,
              borderColor: activePreset.primary,
            }}
          >
            <ItemGraphic itemId={user.equippedAvatar || 'avatar-tanuki'} className="w-5 h-5" fallbackEmoji="👤" />
          </div>
          <span 
            className="text-xs font-bold max-w-[80px] sm:max-w-[110px] truncate"
            style={{ color: isDarkMode ? '#F1F5F9' : '#0F172A' }}
          >
            {user.fullName || 'Học viên N3'}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. STREAK MODAL (Chuỗi ngày học & Điểm danh nhận thưởng) */}
      {/* ========================================================================= */}
      {showStreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md p-6 rounded-3xl shadow-2xl border space-y-5 animate-in zoom-in-95 duration-150"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#374151' : '#E2E8F0',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-orange-500">
                  <Flame className="w-6 h-6 fill-orange-500 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base font-black">Chuỗi Học Tập Liên Tục</h3>
                  <p className="text-xs text-gray-500 font-medium">Giữ ngọn lửa rèn luyện mỗi ngày</p>
                </div>
              </div>
              <button 
                onClick={() => setShowStreakModal(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Streak Spotlight Banner */}
            <div 
              className="p-4 rounded-2xl border text-center space-y-1.5"
              style={{
                backgroundColor: isDarkMode ? '#261F1A' : '#FFF7ED',
                borderColor: '#FDBA74',
              }}
            >
              <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                Thành tích của bạn
              </span>
              <div className="text-4xl font-black text-orange-600 dark:text-orange-400 flex items-center justify-center gap-2">
                <Flame className="w-8 h-8 fill-orange-500" />
                <span>{user.streakDays} Ngày</span>
              </div>
              <p className="text-xs text-orange-800 dark:text-orange-200 font-medium">
                {user.streakDays >= 7 
                  ? 'Tuyệt vời! Bạn đang duy trì phong độ xuất sắc chuẩn bị cho kỳ thi JLPT N3.' 
                  : 'Học tập đều đặn mỗi ngày giúp não bộ khắc sâu từ vựng & ngữ pháp vào trí nhớ vĩnh viễn.'}
              </p>
            </div>

            {/* 7-Day Weekly Calendar Check-in Tracker */}
            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-orange-500" />
                Tiến độ 7 ngày trong tuần
              </h4>
              <div className="grid grid-cols-7 gap-1.5">
                {daysOfWeek.map((day, idx) => {
                  const isPastOrToday = idx <= currentDayIndex;
                  const isToday = idx === currentDayIndex;
                  return (
                    <div 
                      key={day}
                      className="p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all"
                      style={{
                        backgroundColor: isPastOrToday 
                          ? (isDarkMode ? '#222F22' : '#F0FDF4') 
                          : (isDarkMode ? '#202630' : '#F8FAFC'),
                        borderColor: isToday 
                          ? '#EA580C' 
                          : (isPastOrToday ? '#86EFAC' : (isDarkMode ? '#333F4E' : '#E2E8F0')),
                      }}
                    >
                      <span className="text-[10px] font-bold text-gray-500">{day}</span>
                      {isPastOrToday ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-dashed border-gray-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Check-in Button */}
            <div>
              <button
                onClick={handleDailyCheckIn}
                disabled={hasCheckedInToday}
                className="w-full py-3 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: hasCheckedInToday ? '#059669' : '#EA580C',
                }}
              >
                {hasCheckedInToday ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Đã Điểm Danh Hôm Nay (+10 Vàng)</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-5 h-5 fill-white" />
                    <span>Điểm Danh Ngay Hôm Nay (+10 Vàng)</span>
                  </>
                )}
              </button>
            </div>

            {/* Milestone Rewards */}
            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                Mốc phần thưởng Chuỗi
              </h4>
              <div className="space-y-2">
                {[
                  { days: 7, gold: 50, title: 'Chuỗi 7 ngày (Chiến Binh Chăm Chỉ)' },
                  { days: 14, gold: 100, title: 'Chuỗi 14 ngày (Kiên Trì Bền Bỉ)' },
                  { days: 30, gold: 300, title: 'Chuỗi 30 ngày (Bậc Thầy N3)' },
                ].map((m) => {
                  const isReached = user.streakDays >= m.days;
                  const isClaimed = Boolean(localStorage.getItem(`n3_milestone_${m.days}`));

                  return (
                    <div 
                      key={m.days}
                      className="p-2.5 rounded-xl border flex items-center justify-between text-xs"
                      style={{
                        backgroundColor: isDarkMode ? '#242B35' : '#F8FAFC',
                        borderColor: isReached ? activePreset.primary : (isDarkMode ? '#333F4E' : '#E2E8F0'),
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{m.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-amber-500 flex items-center gap-1">
                          <Coins className="w-3.5 h-3.5 fill-amber-400" /> +{m.gold}
                        </span>
                        {isClaimed ? (
                          <span className="text-[11px] text-emerald-500 font-bold">Đã nhận</span>
                        ) : isReached ? (
                          <button
                            onClick={() => handleClaimMilestone(m.days, m.gold)}
                            className="px-2.5 py-1 rounded-lg text-white font-bold text-[11px] bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
                          >
                            Nhận
                          </button>
                        ) : (
                          <span className="text-[10px] text-gray-400 font-semibold">{user.streakDays}/{m.days} ngày</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setShowStreakModal(false);
                  if (onNavigateTab) onNavigateTab('game');
                }}
                className="text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer"
                style={{ color: activePreset.primary }}
              >
                <Trophy className="w-4 h-4" />
                <span>Xem Bảng Đua Top</span>
              </button>

              <button
                onClick={() => setShowStreakModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                style={{
                  backgroundColor: isDarkMode ? '#2C3440' : '#F1F5F9',
                  borderColor: isDarkMode ? '#3D4856' : '#CBD5E1',
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. GOLD VAULT MODAL (Kho Vàng & Hướng Dẫn Tích Lũy) */}
      {/* ========================================================================= */}
      {showGoldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="w-full max-w-md p-6 rounded-3xl shadow-2xl border space-y-5 animate-in zoom-in-95 duration-150"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#374151' : '#E2E8F0',
              color: isDarkMode ? '#F8FAFC' : '#0F172A',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-500">
                  <Coins className="w-6 h-6 fill-amber-400" />
                </div>
                <div>
                  <h3 className="text-base font-black">Kho Vàng Học Tập (Gold Vault)</h3>
                  <p className="text-xs text-gray-500 font-medium">Tích lũy từ việc học để đổi Avatar & Quần Áo</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGoldModal(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Gold Balance Display */}
            <div 
              className="p-4 rounded-2xl border text-center space-y-1.5"
              style={{
                backgroundColor: isDarkMode ? '#272318' : '#FEFCE8',
                borderColor: '#FDE047',
              }}
            >
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                Số dư Vàng hiện tại
              </span>
              <div className="text-4xl font-black text-amber-600 dark:text-amber-400 flex items-center justify-center gap-2">
                <Coins className="w-8 h-8 fill-amber-400" />
                <span>{user.gold} Vàng</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-200 font-medium">
                Vàng được cộng tự động mỗi khi bạn hoàn thành nhiệm vụ học tập trên ứng dụng.
              </p>
            </div>

            {/* Ways to Earn Gold Guide */}
            <div>
              <h4 className="text-xs font-black uppercase text-gray-500 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quy đổi phần thưởng Vàng
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">📚 Thêm từ vựng</span>
                  <span className="font-black text-amber-500">+10 Vàng</span>
                </div>
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">✍️ Viết đúng Kanji</span>
                  <span className="font-black text-amber-500">+25 Vàng</span>
                </div>
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">📖 Đọc hiểu đúng</span>
                  <span className="font-black text-amber-500">+25 Vàng</span>
                </div>
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">🎧 Thi thử JLPT</span>
                  <span className="font-black text-amber-500">+50 Vàng</span>
                </div>
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">🎙️ Luyện nói AI</span>
                  <span className="font-black text-amber-500">+15 Vàng</span>
                </div>
                <div 
                  className="p-2.5 rounded-xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#242C37' : '#F8FAFC',
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                  }}
                >
                  <span className="font-bold">🔥 Điểm danh ngày</span>
                  <span className="font-black text-amber-500">+10 Vàng</span>
                </div>
              </div>
            </div>

            {/* Quick Action: Go to Shop */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowGoldModal(false);
                  if (onNavigateTab) onNavigateTab('shop');
                }}
                className="w-full py-3 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                style={{ backgroundColor: activePreset.primary }}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Ghé Cửa Hàng Ngoại Trang (Đổi Avatar)</span>
              </button>

              <button
                onClick={handleClaimBonusGold}
                className="w-full py-2.5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 border transition-all active:scale-98 cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-950/40"
                style={{
                  color: '#D97706',
                  borderColor: '#F59E0B',
                }}
              >
                <Gift className="w-4 h-4" />
                <span>🎁 Nhận Thêm +100 Vàng Học Tập (Thử nghiệm mua đồ)</span>
              </button>
            </div>

            {/* Close Button */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-right">
              <button
                onClick={() => setShowGoldModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer"
                style={{
                  backgroundColor: isDarkMode ? '#2C3440' : '#F1F5F9',
                  borderColor: isDarkMode ? '#3D4856' : '#CBD5E1',
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
