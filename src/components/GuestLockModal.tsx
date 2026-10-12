import React from 'react';
import { createPortal } from 'react-dom';
import { Lock, Sparkles, X, LogIn, CheckCircle2, ShieldCheck } from 'lucide-react';
import { ThemePreset } from '../utils/themePresets';

interface GuestLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginWithGoogle: () => void;
  featureName?: string;
  isDarkMode: boolean;
  activePreset: ThemePreset;
}

export const GuestLockModal: React.FC<GuestLockModalProps> = ({
  isOpen,
  onClose,
  onLoginWithGoogle,
  featureName = 'tính năng này',
  isDarkMode,
  activePreset,
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] overflow-y-auto bg-black/60 backdrop-blur-xs flex min-h-full items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-md my-auto p-6 sm:p-7 rounded-3xl shadow-2xl border space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#374151' : '#E2E8F0',
          color: isDarkMode ? '#F8FAFC' : '#0F172A',
        }}
      >
        {/* Header Icon & Close */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center shadow-sm">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div 
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider"
            style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Giới Hạn Chế Độ Khách
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Mở Khóa Toàn Bộ Với Google
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Chế độ khách chỉ cho phép xem trước một số nội dung mẫu. Để sử dụng đầy đủ <strong>{featureName}</strong>, lưu kết quả cá nhân và tham gia thách đấu 1v1 trực tuyến, bạn cần đăng nhập tài khoản Google.
          </p>
        </div>

        {/* Benefits list */}
        <div 
          className="p-3.5 rounded-2xl border space-y-2 text-xs"
          style={{
            backgroundColor: isDarkMode ? '#242B36' : '#F8FAFC',
            borderColor: isDarkMode ? '#374151' : '#E2E8F0',
          }}
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Quyền lợi khi đăng nhập Google:</span>
          </div>
          <ul className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1.5 pl-6 list-disc">
            <li>Mở khóa toàn bộ 1000+ từ vựng, ngữ pháp & lộ trình 90 ngày.</li>
            <li>Tham gia thách đấu 1v1 với những học viên đang trực tuyến.</li>
            <li>Lưu trữ bài thi thử, lịch sử luyện viết Kanji và tích lũy Vàng.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onLoginWithGoogle();
            }}
            className="w-full py-3.5 px-4 rounded-2xl font-black text-xs text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
            style={{ backgroundColor: activePreset.primary }}
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập Tài Khoản Google Ngay</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors cursor-pointer"
          >
            Để sau (Tiếp tục xem thử)
          </button>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};
