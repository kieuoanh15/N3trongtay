import React from 'react';

interface ItemGraphicProps {
  itemId: string;
  className?: string;
  fallbackEmoji?: string;
}

/**
 * Universal Vector Graphic Renderer for Avatars and Costumes.
 * Replaces fragile OS emojis (like 🥷 which renders as an empty tofu box on Windows)
 * with reliable, high-resolution SVG artwork.
 */
export const ItemGraphic: React.FC<ItemGraphicProps> = ({
  itemId,
  className = 'w-16 h-16',
  fallbackEmoji = '⭐',
}) => {
  switch (itemId) {
    // ==================== AVATARS ====================
    case 'avatar-tanuki':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tanuki Head */}
          <circle cx="50" cy="52" r="38" fill="#8D6E63" />
          {/* Ears */}
          <circle cx="24" cy="24" r="14" fill="#5D4037" />
          <circle cx="24" cy="24" r="8" fill="#D7CCC8" />
          <circle cx="76" cy="24" r="14" fill="#5D4037" />
          <circle cx="76" cy="24" r="8" fill="#D7CCC8" />
          {/* Face Mask patches */}
          <ellipse cx="36" cy="50" rx="14" ry="12" fill="#3E2723" transform="rotate(-10 36 50)" />
          <ellipse cx="64" cy="50" rx="14" ry="12" fill="#3E2723" transform="rotate(10 64 50)" />
          {/* Eyes */}
          <circle cx="36" cy="49" r="5" fill="#FFFFFF" />
          <circle cx="37" cy="49" r="2.5" fill="#1A1A1A" />
          <circle cx="64" cy="49" r="5" fill="#FFFFFF" />
          <circle cx="63" cy="49" r="2.5" fill="#1A1A1A" />
          {/* Snout */}
          <ellipse cx="50" cy="62" rx="14" ry="10" fill="#EFEBE9" />
          <ellipse cx="50" cy="58" rx="4" ry="3" fill="#212121" />
          <path d="M47 63 Q50 67 53 63" stroke="#212121" strokeWidth="2" strokeLinecap="round" />
          {/* Leaf on head */}
          <path d="M50 20 C42 12 50 4 58 10 C62 16 56 22 50 20 Z" fill="#4CAF50" />
          <path d="M50 20 Q54 13 58 10" stroke="#2E7D32" strokeWidth="1.5" />
        </svg>
      );

    case 'avatar-ninja':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ninja Cowl / Hood */}
          <circle cx="50" cy="50" r="40" fill="#212529" />
          {/* Face opening */}
          <rect x="22" y="38" width="56" height="24" rx="8" fill="#FAD7A0" />
          {/* Mask lower fold */}
          <path d="M20 54 Q50 64 80 54 L80 82 Q50 92 20 82 Z" fill="#1A1D20" />
          {/* Forehead Protector Band */}
          <rect x="20" y="24" width="60" height="14" rx="3" fill="#343A40" />
          <rect x="32" y="26" width="36" height="10" rx="2" fill="#CED4DA" stroke="#6C757D" strokeWidth="1" />
          {/* Metal plate symbol: Shuriken star */}
          <circle cx="50" cy="31" r="2" fill="#212529" />
          <path d="M47 31 L53 31 M50 28 L50 34" stroke="#212529" strokeWidth="1.5" strokeLinecap="round" />
          {/* Fierce Ninja Eyes */}
          <path d="M30 46 Q38 43 45 47" stroke="#212529" strokeWidth="3" strokeLinecap="round" />
          <path d="M70 46 Q62 43 55 47" stroke="#212529" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="38" cy="50" rx="3.5" ry="3" fill="#E74C3C" />
          <circle cx="39" cy="49" r="1.5" fill="#FFFFFF" />
          <ellipse cx="62" cy="50" rx="3.5" ry="3" fill="#E74C3C" />
          <circle cx="63" cy="49" r="1.5" fill="#FFFFFF" />
          {/* Shuriken corner accent */}
          <path d="M84 18 L88 24 L94 24 L90 28 L92 34 L86 30 L80 34 L82 28 L78 24 L84 24 Z" fill="#E5A84B" />
        </svg>
      );

    case 'avatar-samurai':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Samurai Helmet (Kabuto) Base */}
          <path d="M20 52 C20 30 32 18 50 18 C68 18 80 30 80 52 L86 64 L14 64 Z" fill="#991B1B" />
          {/* Gold Kuwagata (Crescent crest) */}
          <path d="M50 24 C40 6 22 10 16 18 C28 20 44 26 48 30 Z" fill="#F59E0B" />
          <path d="M50 24 C60 6 78 10 84 18 C72 20 56 26 52 30 Z" fill="#F59E0B" />
          <circle cx="50" cy="27" r="5" fill="#D97706" stroke="#FEF3C7" strokeWidth="1.5" />
          {/* Face Area */}
          <rect x="28" y="50" width="44" height="24" rx="4" fill="#FAD7A0" />
          {/* Eyes */}
          <ellipse cx="40" cy="58" rx="3" ry="2" fill="#1E293B" />
          <ellipse cx="60" cy="58" rx="3" ry="2" fill="#1E293B" />
          {/* Samurai Menpo (Face mask) */}
          <path d="M26 62 Q50 72 74 62 L70 82 Q50 90 30 82 Z" fill="#1C1917" />
          {/* White Mustache */}
          <path d="M38 70 Q45 66 50 69 Q55 66 62 70" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
          {/* Crossed Katana swords below */}
          <line x1="20" y1="88" x2="80" y2="88" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="88" x2="30" y2="88" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
        </svg>
      );

    case 'avatar-anime-hero':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Fiery Spiky Hair */}
          <path d="M50 8 L38 24 L22 18 L26 36 L12 40 L26 54 L18 70 L34 66 L50 92 L66 66 L82 70 L74 54 L88 40 L74 36 L78 18 L62 24 Z" fill="#F97316" />
          <path d="M50 16 L42 28 L28 24 L32 38 L20 42 L32 52 L26 64 L38 60 L50 80 L62 60 L74 64 L68 52 L80 42 L68 38 L72 24 L58 28 Z" fill="#FBBF24" />
          {/* Face */}
          <circle cx="50" cy="52" r="22" fill="#FED7AA" />
          {/* Headband */}
          <path d="M28 44 Q50 38 72 44 L72 40 Q50 34 28 40 Z" fill="#EF4444" />
          {/* Bright Anime Eyes */}
          <ellipse cx="42" cy="54" rx="4" ry="5" fill="#1E293B" />
          <circle cx="43" cy="52" r="2" fill="#FFFFFF" />
          <ellipse cx="58" cy="54" rx="4" ry="5" fill="#1E293B" />
          <circle cx="59" cy="52" r="2" fill="#FFFFFF" />
          {/* Confident Smile */}
          <path d="M45 62 Q50 67 55 62" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'avatar-anime-miko':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shinto Torii Gate & Miko theme */}
          {/* Torii Pillars */}
          <rect x="22" y="24" width="8" height="66" fill="#DC2626" rx="2" />
          <rect x="70" y="24" width="8" height="66" fill="#DC2626" rx="2" />
          {/* Top Beams */}
          <path d="M12 24 Q50 16 88 24 L86 16 Q50 8 14 16 Z" fill="#B91C1C" />
          <rect x="18" y="28" width="64" height="6" fill="#DC2626" rx="1" />
          <rect x="46" y="24" width="8" height="10" fill="#B91C1C" />
          {/* White Sacred Shide Ribbons */}
          <path d="M38 34 L42 42 L36 48 L42 56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M62 34 L58 42 L64 48 L58 56" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Golden Bell in Center */}
          <circle cx="50" cy="54" r="14" fill="#F59E0B" />
          <circle cx="50" cy="54" r="11" fill="#FBBF24" />
          <circle cx="50" cy="58" r="3" fill="#78350F" />
          <line x1="50" y1="58" x2="50" y2="68" stroke="#78350F" strokeWidth="2" />
          <circle cx="50" cy="69" r="2.5" fill="#DC2626" />
        </svg>
      );

    case 'avatar-kitsune':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Kitsune Mask Silhouette */}
          <path d="M50 86 C24 74 16 48 20 34 L32 14 L42 32 C46 30 54 30 58 32 L68 14 L80 34 C84 48 76 74 50 86 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
          {/* Ear inners (Red) */}
          <path d="M26 30 L32 18 L36 28 Z" fill="#EF4444" />
          <path d="M74 30 L68 18 L64 28 Z" fill="#EF4444" />
          {/* Red Swirl Markings on Cheeks */}
          <path d="M26 50 Q36 46 32 58 Q40 50 42 60" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M74 50 Q64 46 68 58 Q60 50 58 60" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Slit Eyes */}
          <path d="M30 46 Q38 42 44 48" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M70 46 Q62 42 56 48" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Black Nose & Whiskers */}
          <polygon points="50,68 47,64 53,64" fill="#0F172A" />
          <path d="M47 70 Q50 73 53 70" stroke="#0F172A" strokeWidth="1.5" />
        </svg>
      );

    case 'avatar-shiba':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shiba Face */}
          <circle cx="50" cy="54" r="36" fill="#F59E0B" />
          {/* Pointy Ears */}
          <polygon points="20,44 14,16 40,26" fill="#D97706" />
          <polygon points="22,40 18,22 36,28" fill="#FDE68A" />
          <polygon points="80,44 86,16 60,26" fill="#D97706" />
          <polygon points="78,40 82,22 64,28" fill="#FDE68A" />
          {/* White Cheeks & Muzzle */}
          <path d="M26 62 Q50 86 74 62 Q50 48 26 62 Z" fill="#FFFBEB" />
          {/* White Eyebrow dots */}
          <circle cx="36" cy="40" r="4" fill="#FFFBEB" />
          <circle cx="64" cy="40" r="4" fill="#FFFBEB" />
          {/* Eyes */}
          <ellipse cx="38" cy="48" rx="4" ry="3" fill="#1C1917" />
          <ellipse cx="62" cy="48" rx="4" ry="3" fill="#1C1917" />
          {/* Nose & Smile */}
          <ellipse cx="50" cy="62" rx="4.5" ry="3.5" fill="#1C1917" />
          <path d="M45 68 Q50 72 55 68" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" />
          {/* Victory Band */}
          <rect x="20" y="28" width="60" height="7" rx="2" fill="#DC2626" />
          <circle cx="50" cy="31.5" r="3" fill="#FFFFFF" />
        </svg>
      );

    case 'avatar-manekineko':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Lucky Cat Body */}
          <circle cx="50" cy="56" r="36" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
          {/* Ears with Red Inners */}
          <polygon points="18,46 16,18 42,30" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <polygon points="22,42 20,24 38,32" fill="#EF4444" />
          <polygon points="82,46 84,18 58,30" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <polygon points="78,42 80,24 62,32" fill="#EF4444" />
          {/* Closed Happy Eyes */}
          <path d="M32 48 Q40 56 46 48" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M68 48 Q60 56 54 48" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          {/* Nose & Whiskers */}
          <circle cx="50" cy="54" r="2.5" fill="#F43F5E" />
          <line x1="22" y1="52" x2="34" y2="54" stroke="#64748B" strokeWidth="1.5" />
          <line x1="22" y1="58" x2="34" y2="57" stroke="#64748B" strokeWidth="1.5" />
          <line x1="78" y1="52" x2="66" y2="54" stroke="#64748B" strokeWidth="1.5" />
          <line x1="78" y1="58" x2="66" y2="57" stroke="#64748B" strokeWidth="1.5" />
          {/* Red Collar with Gold Bell */}
          <path d="M26 70 Q50 82 74 70" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
          <circle cx="50" cy="78" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          {/* Raised Lucky Paw */}
          <ellipse cx="78" cy="38" rx="8" ry="12" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" transform="rotate(-20 78 38)" />
          <path d="M74 32 Q78 30 82 34" stroke="#DC2626" strokeWidth="1.5" />
        </svg>
      );

    case 'avatar-daruma':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Round Red Body */}
          <circle cx="50" cy="54" r="40" fill="#DC2626" />
          {/* White Face Plate */}
          <circle cx="50" cy="44" r="26" fill="#FEF2F2" />
          {/* Crane Eyebrows */}
          <path d="M30 36 Q38 30 46 36" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          <path d="M70 36 Q62 30 54 36" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          {/* Wide Open Determined Eyes */}
          <circle cx="38" cy="44" r="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="38" cy="44" r="4" fill="#1E293B" />
          <circle cx="62" cy="44" r="7" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
          <circle cx="62" cy="44" r="4" fill="#1E293B" />
          {/* Turtle Mustache */}
          <path d="M34 54 Q50 62 66 54" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
          {/* Gold Kanji on belly: 必勝 (Victory) */}
          <rect x="36" y="68" width="28" height="18" rx="3" fill="#B91C1C" />
          <text x="50" y="81" textAnchor="middle" fill="#FDE047" fontSize="12" fontWeight="900" fontFamily="sans-serif">
            必勝
          </text>
        </svg>
      );

    case 'avatar-sensei':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sensei Head & Hair */}
          <circle cx="50" cy="50" r="32" fill="#FED7AA" />
          {/* Dark Hair with Parting */}
          <path d="M22 42 C24 20 40 16 50 16 C60 16 76 20 78 42 C74 34 64 28 50 28 C36 28 26 34 22 42 Z" fill="#1E293B" />
          {/* Round Glasses */}
          <circle cx="40" cy="50" r="9" stroke="#0284C7" strokeWidth="2.5" fill="rgba(255,255,255,0.4)" />
          <circle cx="60" cy="50" r="9" stroke="#0284C7" strokeWidth="2.5" fill="rgba(255,255,255,0.4)" />
          <line x1="49" y1="50" x2="51" y2="50" stroke="#0284C7" strokeWidth="2.5" />
          {/* Kind Eyes behind glasses */}
          <circle cx="40" cy="50" r="2.5" fill="#0F172A" />
          <circle cx="60" cy="50" r="2.5" fill="#0F172A" />
          {/* Friendly Smile */}
          <path d="M44 64 Q50 68 56 64" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          {/* Blue Sensei Kimono Collar */}
          <path d="M26 84 L50 68 L74 84" stroke="#0284C7" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );

    case 'avatar-mecha':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Mecha Head Armor */}
          <path d="M24 30 L50 16 L76 30 L80 66 L68 84 L32 84 L20 66 Z" fill="#334155" stroke="#0284C7" strokeWidth="2" />
          {/* Glowing Neon Visor */}
          <path d="M28 44 L72 44 L66 58 L34 58 Z" fill="#06B6D4" />
          <line x1="30" y1="51" x2="70" y2="51" stroke="#E0F2FE" strokeWidth="2" />
          {/* Crest / Antenna */}
          <polygon points="50,6 44,22 56,22" fill="#F59E0B" />
          {/* Mouth Guard Vents */}
          <line x1="42" y1="68" x2="58" y2="68" stroke="#94A3B8" strokeWidth="2" />
          <line x1="44" y1="74" x2="56" y2="74" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );

    case 'avatar-dragon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dragon Head */}
          <circle cx="50" cy="50" r="36" fill="#15803D" />
          {/* Golden Horns */}
          <path d="M34 26 C30 10 20 8 16 6 C20 14 24 22 28 28 Z" fill="#EAB308" />
          <path d="M66 26 C70 10 80 8 84 6 C80 14 76 22 72 28 Z" fill="#EAB308" />
          {/* Snout */}
          <rect x="34" y="44" width="32" height="30" rx="8" fill="#16A34A" />
          {/* Nostrils */}
          <ellipse cx="44" cy="62" rx="2.5" ry="3.5" fill="#14532D" />
          <ellipse cx="56" cy="62" rx="2.5" ry="3.5" fill="#14532D" />
          {/* Fierce Eyes */}
          <circle cx="36" cy="40" r="6" fill="#FEF08A" />
          <circle cx="36" cy="40" r="3" fill="#854D0E" />
          <circle cx="64" cy="40" r="6" fill="#FEF08A" />
          <circle cx="64" cy="40" r="3" fill="#854D0E" />
          {/* Long Whiskers */}
          <path d="M34 60 C16 62 10 74 6 82" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M66 60 C84 62 90 74 94 82" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // ==================== COSTUMES ====================
    case 'costume-school':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* School Uniform Blazer */}
          <path d="M20 28 L50 20 L80 28 L84 82 L16 82 Z" fill="#1E293B" />
          {/* White Shirt Collar */}
          <polygon points="50,22 40,42 60,42" fill="#FFFFFF" />
          <polygon points="50,22 34,30 42,42" fill="#F8FAFC" />
          <polygon points="50,22 66,30 58,42" fill="#F8FAFC" />
          {/* Red Tie */}
          <polygon points="48,42 52,42 54,64 50,70 46,64" fill="#DC2626" />
          <circle cx="50" cy="42" r="3" fill="#B91C1C" />
          {/* Gold Buttons */}
          <circle cx="50" cy="54" r="2.5" fill="#F59E0B" />
          <circle cx="50" cy="66" r="2.5" fill="#F59E0B" />
          <circle cx="50" cy="78" r="2.5" fill="#F59E0B" />
        </svg>
      );

    case 'costume-yukata':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Pink Sakura Yukata */}
          <path d="M22 26 L50 18 L78 26 L82 84 L18 84 Z" fill="#FBCFE8" />
          {/* Kimono V-fold Neck */}
          <path d="M32 24 L50 56 L68 24" stroke="#F472B6" strokeWidth="5" strokeLinecap="round" />
          {/* Red Obi Sash with Bow */}
          <rect x="22" y="52" width="56" height="14" fill="#E11D48" rx="2" />
          <ellipse cx="50" cy="59" rx="8" ry="5" fill="#BE123C" />
          {/* Cherry Blossom Petals */}
          <circle cx="34" cy="74" r="3" fill="#FB7185" />
          <circle cx="66" cy="72" r="3" fill="#FB7185" />
        </svg>
      );

    case 'costume-haori':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deep Teal Wave Haori */}
          <path d="M18 24 L50 16 L82 24 L84 84 L16 84 Z" fill="#0F766E" />
          {/* White Wave Patterns */}
          <path d="M20 74 Q35 60 50 74 Q65 60 80 74" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M24 82 Q37 72 50 82 Q63 72 76 82" stroke="#5EEAD4" strokeWidth="2.5" fill="none" />
          {/* Haori Lapel & Ties */}
          <line x1="42" y1="24" x2="42" y2="84" stroke="#134E4A" strokeWidth="3" />
          <line x1="58" y1="24" x2="58" y2="84" stroke="#134E4A" strokeWidth="3" />
          <circle cx="50" cy="46" r="3.5" fill="#FDE047" />
        </svg>
      );

    case 'costume-ninja':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Black Shinobi Suit */}
          <path d="M20 24 L50 16 L80 24 L82 84 L18 84 Z" fill="#18181B" />
          {/* Crossed chest straps */}
          <line x1="26" y1="26" x2="74" y2="74" stroke="#71717A" strokeWidth="4" />
          <line x1="74" y1="26" x2="26" y2="74" stroke="#71717A" strokeWidth="4" />
          {/* Red Sash Belt */}
          <rect x="20" y="54" width="60" height="10" fill="#DC2626" rx="2" />
          {/* Metallic Shuriken on Belt */}
          <circle cx="50" cy="59" r="6" fill="#E4E4E7" stroke="#71717A" strokeWidth="1.5" />
          <polygon points="50,51 53,57 60,59 53,61 50,67 47,61 40,59 47,57" fill="#71717A" />
        </svg>
      );

    case 'costume-samurai':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Samurai Yoroi Armor */}
          <path d="M22 26 L50 18 L78 26 L80 84 L20 84 Z" fill="#991B1B" />
          {/* Lacquered Armor Scales */}
          <rect x="26" y="34" width="48" height="8" rx="2" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
          <rect x="26" y="46" width="48" height="8" rx="2" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
          <rect x="26" y="58" width="48" height="8" rx="2" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
          <rect x="26" y="70" width="48" height="8" rx="2" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
          {/* Shoulder Guards (Sode) */}
          <rect x="10" y="30" width="12" height="24" rx="2" fill="#7F1D1D" stroke="#F59E0B" strokeWidth="1" />
          <rect x="78" y="30" width="12" height="24" rx="2" fill="#7F1D1D" stroke="#F59E0B" strokeWidth="1" />
        </svg>
      );

    case 'costume-miko':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* White Kosode Top */}
          <path d="M24 24 L50 16 L76 24 L78 52 L22 52 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M34 22 L50 48 L66 22" stroke="#E2E8F0" strokeWidth="3" />
          {/* Crimson Hakama Pleats */}
          <path d="M20 52 L80 52 L86 86 L14 86 Z" fill="#DC2626" />
          <line x1="38" y1="52" x2="36" y2="86" stroke="#991B1B" strokeWidth="2" />
          <line x1="50" y1="52" x2="50" y2="86" stroke="#991B1B" strokeWidth="2" />
          <line x1="62" y1="52" x2="64" y2="86" stroke="#991B1B" strokeWidth="2" />
        </svg>
      );

    case 'costume-sensu':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Japanese Sensu Folding Fan */}
          <path d="M50 82 L12 40 C32 20 68 20 88 40 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          {/* Fan Ribs */}
          <line x1="50" y1="82" x2="26" y2="28" stroke="#A16207" strokeWidth="1.5" />
          <line x1="50" y1="82" x2="42" y2="22" stroke="#A16207" strokeWidth="1.5" />
          <line x1="50" y1="82" x2="58" y2="22" stroke="#A16207" strokeWidth="1.5" />
          <line x1="50" y1="82" x2="74" y2="28" stroke="#A16207" strokeWidth="1.5" />
          {/* Red Sun in Center */}
          <circle cx="50" cy="46" r="12" fill="#DC2626" />
          {/* Pivot Pin */}
          <circle cx="50" cy="82" r="3.5" fill="#78350F" />
        </svg>
      );

    case 'costume-hachimaki':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* White Headband with Red Sun */}
          <rect x="10" y="38" width="80" height="24" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="50" cy="50" r="9" fill="#DC2626" />
          <text x="32" y="55" fill="#1E293B" fontSize="12" fontWeight="900" fontFamily="sans-serif">必</text>
          <text x="68" y="55" fill="#1E293B" fontSize="12" fontWeight="900" fontFamily="sans-serif">勝</text>
          {/* Knot Tails on sides */}
          <path d="M88 42 Q96 46 94 62 L88 56 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M90 48 Q98 56 92 70 L86 60 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        </svg>
      );

    default:
      return <span className="text-4xl">{fallbackEmoji}</span>;
  }
};
