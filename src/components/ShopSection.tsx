import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Coins, 
  Check, 
  Sparkles, 
  Shirt, 
  Smile, 
  Tag
} from 'lucide-react';
import { ShopItem, UserProfile } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { SHOP_ITEMS } from '../data/shopData';
import { ItemGraphic } from './ItemGraphic';
import confetti from 'canvas-confetti';

interface ShopSectionProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onDeductGold: (amount: number) => boolean;
}

export const ShopSection: React.FC<ShopSectionProps> = ({
  user,
  setUser,
  isDarkMode,
  activePreset,
  onDeductGold,
}) => {
  const [activeType, setActiveType] = useState<'avatar' | 'costume'>('avatar');
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const currentAvatar = SHOP_ITEMS.find(i => i.id === user.equippedAvatar) || SHOP_ITEMS[0];
  const currentCostume = SHOP_ITEMS.find(i => i.id === user.equippedCostume) || SHOP_ITEMS[5];

  const filteredItems = SHOP_ITEMS.filter(i => i.type === activeType);

  // Buy Item
  const handleBuyItem = (item: ShopItem) => {
    if (user.unlockedItems.includes(item.id)) return;

    if (user.gold < item.price) {
      showToast(`Không đủ Vàng! Bạn cần thêm ${item.price - user.gold} Vàng nữa.`);
      return;
    }

    const success = onDeductGold(item.price);
    if (success) {
      setUser(prev => ({
        ...prev,
        unlockedItems: [...prev.unlockedItems, item.id],
      }));
      confetti({ particleCount: 50, spread: 60 });
      showToast(`Mua thành công ${item.name}! Bạn có thể trang bị ngay bây giờ.`);
    }
  };

  // Equip Item
  const handleEquipItem = (item: ShopItem) => {
    if (!user.unlockedItems.includes(item.id)) return;

    if (item.type === 'avatar') {
      setUser(prev => ({ ...prev, equippedAvatar: item.id }));
      showToast(`Đã đổi Avatar thành ${item.name}!`);
    } else {
      setUser(prev => ({ ...prev, equippedCostume: item.id }));
      showToast(`Đã mặc trang phục ${item.name}!`);
    }
  };

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

      {/* Top Banner & Active Avatar Showcase */}
      <div 
        className="p-6 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
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
              Cửa Hàng Ngoại Trang
            </span>
            <span className="text-xs text-amber-500 font-bold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5 fill-amber-400" /> {user.gold} Vàng hiện có
            </span>
          </div>
          <h2 
            className="text-xl font-black"
            style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
          >
            Mua Avatar & Đổi Trang Phục Nhân Vật
          </h2>
          <p 
            className="text-xs mt-0.5 font-medium"
            style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}
          >
            Dùng Vàng tích lũy được từ việc học từ vựng, giải đề và chuỗi ngày để tùy biến diện mạo linh vật.
          </p>
        </div>

        {/* Character Live Preview Stage */}
        <div 
          className="flex items-center gap-4 p-4 rounded-2xl border shadow-inner shrink-0"
          style={{
            backgroundColor: isDarkMode ? '#242B36' : activePreset.light,
            borderColor: isDarkMode ? '#333D4C' : '#E2E8F0',
          }}
        >
          <div className="relative">
            {/* Avatar Graphic */}
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center p-2 shadow-md border"
              style={{ 
                backgroundColor: currentAvatar.accentColor ? `${currentAvatar.accentColor}33` : activePreset.badgeBg,
                borderColor: activePreset.primary,
              }}
            >
              <ItemGraphic itemId={currentAvatar.id} fallbackEmoji={currentAvatar.previewEmoji} className="w-12 h-12" />
            </div>

            {/* Costume Mini Badge */}
            <div 
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-white dark:bg-gray-800 border flex items-center justify-center p-1 shadow-sm"
              title={`Trang phục: ${currentCostume.name}`}
            >
              <ItemGraphic itemId={currentCostume.id} fallbackEmoji={currentCostume.previewEmoji} className="w-5 h-5" />
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-gray-400 block uppercase">
              Đang Trang Bị
            </span>
            <h4 
              className="text-xs font-black"
              style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
            >
              {currentAvatar.name}
            </h4>
            <p className="text-[11px] flex items-center gap-1.5 mt-0.5 font-semibold" style={{ color: activePreset.primary }}>
              <ItemGraphic itemId={currentCostume.id} fallbackEmoji={currentCostume.previewEmoji} className="w-3.5 h-3.5" />
              <span>{currentCostume.name}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Category Tabs: Avatar vs Trang phục */}
      <div 
        className="p-1 rounded-2xl border flex items-center gap-1 text-xs"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
          borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
        }}
      >
        <button
          onClick={() => setActiveType('avatar')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
            activeType === 'avatar' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
          }`}
          style={{ color: activeType === 'avatar' ? activePreset.primary : undefined }}
        >
          <Smile className="w-4 h-4" />
          Avatar Nhân Vật ({SHOP_ITEMS.filter(i => i.type === 'avatar').length})
        </button>

        <button
          onClick={() => setActiveType('costume')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold transition-all ${
            activeType === 'costume' ? 'bg-white dark:bg-gray-800 shadow-xs' : 'text-gray-500'
          }`}
          style={{ color: activeType === 'costume' ? activePreset.primary : undefined }}
        >
          <Shirt className="w-4 h-4" />
          Trang Phục / Quần Áo ({SHOP_ITEMS.filter(i => i.type === 'costume').length})
        </button>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isUnlocked = user.unlockedItems.includes(item.id);
          const isEquipped = item.type === 'avatar' 
            ? user.equippedAvatar === item.id 
            : user.equippedCostume === item.id;
          const canAfford = user.gold >= item.price;

          return (
            <div
              key={item.id}
              className={`p-4 rounded-3xl border flex flex-col justify-between space-y-3 transition-all ${
                isEquipped ? 'ring-2 ring-offset-1 shadow-md' : 'hover:shadow-sm'
              }`}
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isEquipped ? activePreset.primary : (isDarkMode ? '#2D3748' : '#E8EEF5'),
              }}
            >
              <div>
                {/* Item Graphic & Color Box */}
                <div 
                  className="w-full h-24 rounded-2xl flex items-center justify-center p-2 mb-3 shadow-inner border"
                  style={{ 
                    backgroundColor: item.accentColor ? `${item.accentColor}25` : activePreset.badgeBg,
                    borderColor: isEquipped ? activePreset.primary : (isDarkMode ? '#374151' : '#E2E8F0'),
                  }}
                >
                  <ItemGraphic itemId={item.id} fallbackEmoji={item.previewEmoji} className="w-16 h-16" />
                </div>

                {/* Name & Description */}
                <h4 
                  className="text-sm font-black"
                  style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                >
                  {item.name}
                </h4>
                <p 
                  className="text-xs mt-1 leading-relaxed line-clamp-2"
                  style={{ color: isDarkMode ? '#CBD5E1' : '#475569' }}
                >
                  {item.description}
                </p>
              </div>

              {/* Price & Action Button */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {item.price === 0 ? (
                    <span className="text-xs font-black text-emerald-500">Mặc định</span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-black text-amber-500">
                      <Coins className="w-3.5 h-3.5 fill-amber-400" />
                      {item.price} Vàng
                    </span>
                  )}
                </div>

                {/* Button: Equip vs Buy */}
                {isEquipped ? (
                  <span 
                    className="px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1"
                    style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
                  >
                    <Check className="w-3.5 h-3.5" /> Đang dùng
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => handleEquipItem(item)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-xs"
                    style={{ backgroundColor: activePreset.primary }}
                  >
                    Trang bị
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyItem(item)}
                    disabled={!canAfford}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${
                      canAfford 
                        ? 'bg-amber-500 text-white hover:bg-amber-600 active:scale-95' 
                        : 'bg-gray-200 text-gray-400 dark:bg-gray-800 cursor-not-allowed'
                    }`}
                  >
                    Mua Ngay
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
