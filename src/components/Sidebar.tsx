import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  PenTool, 
  FileText, 
  Headphones, 
  Mic, 
  Trophy, 
  ShoppingBag, 
  Settings,
  ChevronLeft,
  CalendarCheck
} from 'lucide-react';
import { TabType, UserProfile } from '../types';
import { ThemePreset } from '../utils/themePresets';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  user: UserProfile;
}

interface NavItem {
  id: TabType;
  label: string;
  subLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
  isDarkMode,
  activePreset,
  user,
}) => {
  const navItems: NavItem[] = [
    {
      id: 'vocab',
      label: 'Từ vựng N3',
      subLabel: 'Mimikara Oboeru',
      icon: BookOpen,
      badge: '4 loại từ',
    },
    {
      id: 'grammar',
      label: 'Ngữ pháp N3',
      subLabel: 'Mẫu câu & Công thức',
      icon: Layers,
    },
    {
      id: 'flashcard',
      label: 'Flashcard 3D',
      subLabel: 'Auto-sync từ vựng',
      icon: Sparkles,
      badge: 'Auto',
    },
    {
      id: 'kanji',
      label: 'Luyện viết Kanji',
      subLabel: 'Ô chuẩn Nhật & Nét mờ',
      icon: PenTool,
    },
    {
      id: 'reading',
      label: 'Đọc hiểu N3',
      subLabel: 'Đoản, Trung văn có giải thích',
      icon: FileText,
    },
    {
      id: 'exam',
      label: 'Luyện thi JLPT',
      subLabel: 'Nghe 100% tiếng Nhật',
      icon: Headphones,
      badge: 'Thi thật',
    },
    {
      id: 'speaking',
      label: 'Luyện nói với AI',
      subLabel: 'Phản xạ giao tiếp N3',
      icon: Mic,
      badge: 'Voice AI',
    },
    {
      id: 'game',
      label: 'Game & Đua Rank',
      subLabel: 'Thưởng Top 5 & Chuỗi',
      icon: Trophy,
    },
    {
      id: 'shop',
      label: 'Cửa hàng Avatar',
      subLabel: 'Đổi trang phục & Nhân vật',
      icon: ShoppingBag,
    },
    {
      id: 'settings',
      label: 'Cài đặt & Tiến trình',
      subLabel: 'Lộ trình 90 ngày & Cache',
      icon: Settings,
    },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar Container */}
      <aside
        id="app-sidebar"
        className={`fixed lg:static top-0 left-0 bottom-0 z-40 w-72 flex flex-col border-r transition-all duration-200 shrink-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{
          backgroundColor: isDarkMode ? '#171B21' : '#FFFFFF',
          borderColor: isDarkMode ? '#28313E' : '#E8EEF5',
        }}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b flex items-center justify-between"
          style={{ borderColor: isDarkMode ? '#28313E' : '#E8EEF5' }}
        >
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
              style={{ backgroundColor: activePreset.primary }}
            >
              N3
            </div>
            <div>
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-100">
                Menu Chức Năng
              </h2>
              <p className="text-[11px] text-gray-500">Mục tiêu 3 tháng đỗ N3</p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 lg:hidden"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* 90-Day Progress Bar Quick Info */}
        <div className="px-4 py-3 border-b"
          style={{ 
            backgroundColor: isDarkMode ? '#1E242C' : activePreset.light,
            borderColor: isDarkMode ? '#28313E' : '#E8EEF5',
          }}
        >
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold flex items-center gap-1.5 text-gray-700 dark:text-gray-200">
              <CalendarCheck className="w-3.5 h-3.5" style={{ color: activePreset.primary }} />
              Ngày {user.dayCount}/90
            </span>
            <span className="font-bold text-[11px]" style={{ color: activePreset.primary }}>
              {Math.round((user.dayCount / 90) * 100)}% Lộ trình
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${(user.dayCount / 90) * 100}%`,
                backgroundColor: activePreset.primary,
              }}
            />
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) {
                    setIsOpen(false);
                  }
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                  isActive
                    ? 'font-bold shadow-xs'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 font-medium'
                }`}
                style={{
                  backgroundColor: isActive
                    ? (isDarkMode ? '#2A3442' : activePreset.badgeBg)
                    : 'transparent',
                  color: isActive ? activePreset.primary : undefined,
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`p-2 rounded-lg transition-colors shrink-0 ${
                      isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                    }`}
                    style={{
                      backgroundColor: isActive ? activePreset.primary : undefined,
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </span>
                  <div className="truncate">
                    <p className="text-xs leading-tight">{item.label}</p>
                    {item.subLabel && (
                      <p className="text-[10px] text-gray-400 font-normal leading-tight mt-0.5 truncate">
                        {item.subLabel}
                      </p>
                    )}
                  </div>
                </div>

                {item.badge && (
                  <span 
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0 ml-1.5"
                    style={{
                      backgroundColor: isActive ? activePreset.primary : (isDarkMode ? '#374151' : '#E2E8F0'),
                      color: isActive ? '#FFFFFF' : (isDarkMode ? '#E5E7EB' : '#475569'),
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-3 border-t text-center"
          style={{ borderColor: isDarkMode ? '#28313E' : '#E8EEF5' }}
        >
          <p className="text-[11px] text-gray-400 font-medium">
            ID: <span className="font-mono">{user.userId}</span>
          </p>
        </div>
      </aside>
    </>
  );
};
