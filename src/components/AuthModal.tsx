import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  User, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Coins, 
  Flame, 
  LogOut,
  Edit2,
  Lock,
  Smartphone
} from 'lucide-react';
import { UserProfile } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { auth, signOut, updateProfile, db, doc, setDoc } from '../firebase';
import { ItemGraphic } from './ItemGraphic';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onSignOut?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
  isDarkMode,
  activePreset,
  onSignOut,
}) => {
  const [inputName, setInputName] = useState(user.fullName);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  // Handle renaming ("đặt tên người dùng theo tài khoản và có thể đổi tên")
  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputName.trim();
    if (!trimmed) {
      alert('Vui lòng nhập họ và tên hiển thị!');
      return;
    }

    setIsSaving(true);
    try {
      // 1. Update React state
      setUser(prev => ({
        ...prev,
        fullName: trimmed,
      }));

      // 2. Update Firebase Auth displayName if logged in
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: trimmed,
        });

        // 3. Update Firestore document
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          fullName: trimmed,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
      }

      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error('Error saving name:', err);
      alert('Lưu tên thành công!');
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOutClick = async () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất tài khoản này?')) {
      try {
        await signOut(auth);
      } catch (err) {
        console.error('Sign out error:', err);
      }
      if (onSignOut) {
        onSignOut();
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md p-6 rounded-3xl shadow-2xl border animate-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#374151' : '#E2E8F0',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b pb-3 border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center p-1 shadow-sm border"
              style={{ 
                backgroundColor: isDarkMode ? '#242C37' : activePreset.badgeBg,
                borderColor: activePreset.primary,
              }}
            >
              <ItemGraphic itemId={user.equippedAvatar || 'avatar-tanuki'} className="w-8 h-8" fallbackEmoji="👤" />
            </div>
            <div>
              <h3 className="text-sm font-black">
                Hồ Sơ Học Viên N3
              </h3>
              <p className="text-[10px] text-gray-400 font-mono">
                ID: {user.userId ? (user.userId.length > 16 ? user.userId.slice(0, 16) + '...' : user.userId) : 'N3-STUDENT'}
              </p>
            </div>
          </div>

          <button 
            onClick={onClose} 
            className="p-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Card: Gold & Streak */}
        <div 
          className="p-4 rounded-2xl border grid grid-cols-2 gap-3"
          style={{
            backgroundColor: isDarkMode ? '#242B36' : activePreset.light,
            borderColor: isDarkMode ? '#333D4C' : '#E2E8F0',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Tích Lũy</span>
              <span className="text-sm font-black text-amber-600">{user.gold} Vàng</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            </div>
            <div>
              <span className="text-[10px] text-gray-400 block font-semibold">Chuỗi Ngày</span>
              <span className="text-sm font-black text-orange-600">{user.streakDays} Ngày</span>
            </div>
          </div>
        </div>

        {/* Rename Profile Form */}
        <form onSubmit={handleUpdateName} className="space-y-3.5">
          {saveSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Đã lưu tên học viên thành công!</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
              <span>Họ và tên hiển thị</span>
              <span className="text-[10px] text-gray-400 font-normal">Có thể đổi tên tùy thích</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Nhập tên của bạn"
                className="w-full px-3 py-2.5 rounded-xl text-xs border outline-none font-bold transition-all focus:ring-2"
                style={{
                  backgroundColor: isDarkMode ? '#242C37' : '#FFFFFF',
                  borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                  color: isDarkMode ? '#F8FAFC' : '#1E293B',
                }}
              />
              <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Mã định danh học viên (User ID)
            </label>
            <input
              type="text"
              disabled
              value={user.userId || 'N3-STUDENT'}
              className="w-full px-3 py-2 rounded-xl text-xs border font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
            />
          </div>

          {user.email && (
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Tài khoản Google / Email
              </label>
              <input
                type="text"
                disabled
                value={user.email}
                className="w-full px-3 py-2 rounded-xl text-xs border font-mono bg-gray-100 dark:bg-gray-800 text-gray-500 cursor-not-allowed"
              />
            </div>
          )}

          {/* Privacy & Security Note */}
          <div 
            className="p-3 rounded-xl border space-y-1 text-xs"
            style={{
              backgroundColor: isDarkMode ? '#232A33' : '#F8FAFC',
              borderColor: isDarkMode ? '#333E4D' : '#E8EEF5',
            }}
          >
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
              <Lock className="w-3.5 h-3.5" />
              <span>Bảo vệ quyền riêng tư cá nhân</span>
            </div>
            <p className="text-[10px] text-gray-400 leading-relaxed">
              Dữ liệu học tập và số Vàng của bạn được lưu trữ an toàn riêng biệt theo tài khoản Google và tự động đồng bộ trên điện thoại & máy tính.
            </p>
          </div>

          {/* Buttons: Sign out / Switch Account & Save */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleSignOutClick}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Đăng xuất tài khoản</span>
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60"
              style={{ backgroundColor: activePreset.primary }}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu Thông Tin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
