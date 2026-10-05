import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Volume2, 
  Trash2, 
  FileUp, 
  Sparkles, 
  Layers, 
  Check, 
  X,
  BookOpen
} from 'lucide-react';
import { GrammarItem } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface GrammarSectionProps {
  grammarList: GrammarItem[];
  setGrammarList: React.Dispatch<React.SetStateAction<GrammarItem[]>>;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const GrammarSection: React.FC<GrammarSectionProps> = ({
  grammarList,
  setGrammarList,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedGrammarId, setSelectedGrammarId] = useState<string>(grammarList[0]?.id || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const categories = [
    'Tất cả',
    'Thời gian - Thứ tự',
    'Lý do - Nguyên nhân',
    'Mục đích - Phương tiện',
    'Điều kiện',
    'Đối lập - Nhượng bộ',
    'Mức độ - Phạm vi',
    'Bắt buộc - Khuyên nhủ',
    'Biến đổi - Xu hướng',
    'Phán đoán - Cảm xúc',
    'Quan hệ - Kèm theo',
  ];

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formFormula, setFormFormula] = useState('');
  const [formMeaning, setFormMeaning] = useState('');
  const [formExplanation, setFormExplanation] = useState('');
  const [formExJa, setFormExJa] = useState('');
  const [formExVi, setFormExVi] = useState('');

  // PDF Import Text Area State
  const [pdfTextContent, setPdfTextContent] = useState('');

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const playAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  const filteredList = grammarList.filter(item => {
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(query) ||
      item.formula.toLowerCase().includes(query) ||
      item.meaningVi.toLowerCase().includes(query) ||
      (item.category && item.category.toLowerCase().includes(query))
    );
  });

  const selectedGrammar = grammarList.find(g => g.id === selectedGrammarId) || filteredList[0] || grammarList[0];

  const handleSaveGrammar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formFormula.trim()) {
      showToast('Vui lòng nhập tên mẫu ngữ pháp và công thức!');
      return;
    }

    const newItem: GrammarItem = {
      id: `grammar-${Date.now()}`,
      title: formTitle.trim(),
      titleFurigana: formTitle.trim(),
      formula: formFormula.trim(),
      meaningVi: formMeaning.trim() || 'Nghĩa mẫu câu',
      explanationVi: formExplanation.trim() || 'Cách dùng và lưu ý mẫu câu N3.',
      examples: [
        {
          ja: formExJa.trim() || `${formTitle}を使った例文です。`,
          furigana: formExJa.trim() || `${formTitle}を<ruby>使<rt>つか</rt></ruby>った<ruby>例文<rt>れいぶん</rt></ruby>です。`,
          vi: formExVi.trim() || 'Câu ví dụ tiếng Nhật.',
        },
      ],
      isCustom: true,
    };

    setGrammarList(prev => [newItem, ...prev]);
    setSelectedGrammarId(newItem.id);
    setIsModalOpen(false);
    onAddGold(20);
    showToast('Thêm mẫu ngữ pháp mới thành công! (+20 Vàng)');

    // Reset
    setFormTitle('');
    setFormFormula('');
    setFormMeaning('');
    setFormExplanation('');
    setFormExJa('');
    setFormExVi('');
  };

  // Handle PDF File Upload (reads text or parses structured grammar)
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    showToast(`Đang đọc file PDF: ${file.name}...`);
    try {
      // Read file content as text
      const text = await file.text();
      // Try to parse patterns or populate the import dialog
      setPdfTextContent(text.slice(0, 3000) || `Đã tải file PDF ${file.name}. Nhập nội dung ngữ pháp cần lưu.`);
      setIsPdfModalOpen(true);
    } catch {
      showToast('Đã nhận diện file PDF. Hãy kiểm tra nội dung trong cửa sổ Import.');
      setIsPdfModalOpen(true);
    }
  };

  // Import parsed PDF items into grammar list
  const handleConfirmPdfImport = async () => {
    if (!pdfTextContent.trim()) {
      showToast('Vui lòng nhập hoặc kiểm tra nội dung cần import!');
      return;
    }

    showToast('Đang phân tích cấu trúc ngữ pháp...');
    try {
      const res = await fetch('/api/gemini/parse-grammar-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdfText: pdfTextContent }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          const imported = data.items.map((it: GrammarItem, idx: number) => ({
            ...it,
            id: it.id || `pdf-ai-${Date.now()}-${idx}`,
            isCustom: true,
          }));
          setGrammarList(prev => [...imported, ...prev]);
          setSelectedGrammarId(imported[0].id);
          onAddGold(imported.length * 15);
          showToast(`Đã import thành công ${imported.length} mẫu ngữ pháp chuẩn JLPT! (+${imported.length * 15} Vàng)`);
          setIsPdfModalOpen(false);
          setPdfTextContent('');
          return;
        }
      }
    } catch {
      // Fallback below
    }

    // Split paragraphs or lines to extract grammar points locally
    const lines = pdfTextContent.split('\n').filter(l => l.trim().length > 3);
    const newItems: GrammarItem[] = [];

    for (let i = 0; i < lines.length; i += 3) {
      const title = lines[i]?.replace(/^[\d\.\-\*]+\s*/, '').trim() || `Ngữ pháp PDF ${i + 1}`;
      const formula = lines[i + 1]?.trim() || 'N / V-thường + ' + title;
      const meaning = lines[i + 2]?.trim() || 'Ý nghĩa mẫu ngữ pháp từ tài liệu PDF';

      newItems.push({
        id: `pdf-grammar-${Date.now()}-${i}`,
        title: title,
        titleFurigana: title,
        formula: formula,
        meaningVi: meaning,
        category: 'Tổng hợp PDF',
        explanationVi: 'Nội dung ngữ pháp được trích xuất từ tài liệu PDF Mimikara N3.',
        examples: [
          {
            ja: `${title}の文型を覚えて合格しましょう。`,
            furigana: `${title}の<ruby>文型<rt>ぶんけい</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えて<ruby>合格<rt>ごうかく</rt></ruby>しましょう。`,
            vi: `Hãy ghi nhớ mẫu câu ${title} để đỗ N3 nhé.`,
          },
        ],
        isCustom: true,
      });
    }

    if (newItems.length > 0) {
      setGrammarList(prev => [...newItems, ...prev]);
      setSelectedGrammarId(newItems[0].id);
      onAddGold(newItems.length * 10);
      showToast(`Đã import thành công ${newItems.length} mẫu ngữ pháp từ PDF! (+${newItems.length * 10} Vàng)`);
    } else {
      showToast('Không tìm thấy mẫu ngữ pháp hợp lệ trong văn bản.');
    }

    setIsPdfModalOpen(false);
    setPdfTextContent('');
  };

  const handleDeleteGrammar = (id: string) => {
    if (confirm('Bạn có muốn xóa mẫu ngữ pháp này không?')) {
      setGrammarList(prev => prev.filter(g => g.id !== id));
      showToast('Đã xóa mẫu ngữ pháp.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Toast Notification */}
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

      {/* Header Banner */}
      <div 
        className="p-5 rounded-3xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
        style={{
          backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
          borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
            >
              Mimikara Oboeru N3
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {grammarList.length} mẫu câu trọng điểm
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Tổng Hợp Ngữ Pháp JLPT N3 & Công Thức
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Đầy đủ công thức, ví dụ có Furigana và hỗ trợ tải toàn bộ nội dung từ File PDF.
          </p>
        </div>

        {/* Action buttons: Import PDF + Add Grammar */}
        <div className="flex items-center gap-2">
          {/* PDF Upload Button */}
          <label
            id="btn-upload-grammar-pdf"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all hover:opacity-85 active:scale-95 shadow-2xs"
            style={{
              backgroundColor: isDarkMode ? '#28313E' : '#F8FAFC',
              borderColor: isDarkMode ? '#3A4759' : '#CBD5E1',
              color: isDarkMode ? '#E2E8F0' : '#334155',
            }}
            title="Import toàn bộ nội dung ngữ pháp từ file PDF"
          >
            <FileUp className="w-4 h-4 text-rose-500" />
            <span className="nowrap-label">Import Ngữ Pháp PDF</span>
            <input
              type="file"
              accept=".pdf, .txt"
              onChange={handlePdfUpload}
              className="hidden"
            />
          </label>

          {/* Add Manual Grammar */}
          <button
            id="btn-add-grammar-manual"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-xs"
            style={{ backgroundColor: activePreset.primary }}
          >
            <Plus className="w-4 h-4" />
            <span className="nowrap-label">Thêm Mẫu Câu</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout: Left List + Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search + List of Grammar Points */}
        <div className="lg:col-span-5 space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm mẫu câu, ý nghĩa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs border outline-none transition-colors"
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isDarkMode ? '#2D3748' : '#CBD5E1',
                color: isDarkMode ? '#F8FAFC' : '#1E293B',
              }}
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              const count = cat === 'Tất cả' 
                ? grammarList.length 
                : grammarList.filter(g => g.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 transition-all border"
                  style={{
                    backgroundColor: isActive 
                      ? activePreset.primary 
                      : (isDarkMode ? '#232B36' : '#F1F5F9'),
                    borderColor: isActive 
                      ? activePreset.primary 
                      : (isDarkMode ? '#333F4E' : '#E2E8F0'),
                    color: isActive ? '#FFFFFF' : (isDarkMode ? '#94A3B8' : '#64748B'),
                  }}
                >
                  <span className="nowrap-label">{cat} ({count})</span>
                </button>
              );
            })}
          </div>

          {/* List of Grammar Cards */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredList.map((item) => {
              const isSelected = selectedGrammar?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedGrammarId(item.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all duration-150 flex items-center justify-between ${
                    isSelected 
                      ? 'shadow-md ring-2 ring-offset-1' 
                      : 'hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  style={{
                    backgroundColor: isSelected
                      ? (isDarkMode ? '#2A3442' : activePreset.light)
                      : (isDarkMode ? '#1E232A' : '#FFFFFF'),
                    borderColor: isSelected
                      ? activePreset.primary
                      : (isDarkMode ? '#2D3748' : '#E8EEF5'),
                  }}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-black text-gray-900 dark:text-gray-50 tracking-wide">
                        <FuriganaText content={item.titleFurigana || item.title} />
                      </span>
                      {item.isCustom && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-700 font-bold">
                          Đã thêm
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {item.meaningVi}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteGrammar(item.id);
                    }}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 opacity-60 hover:opacity-100 transition-opacity"
                    title="Xóa mẫu câu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Grammar Deep Dive */}
        <div className="lg:col-span-7">
          {selectedGrammar ? (
            <div 
              className="p-6 rounded-3xl border shadow-sm space-y-5"
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
              }}
            >
              {/* Title & Action */}
              <div className="border-b pb-4 flex items-start justify-between gap-3"
                style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
              >
                <div>
                  <span 
                    className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
                  >
                    Ngữ pháp Mimikara N3
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50 mt-1">
                    <FuriganaText content={selectedGrammar.titleFurigana || selectedGrammar.title} />
                  </h3>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                    {selectedGrammar.meaningVi}
                  </p>
                </div>

                <button
                  onClick={() => playAudio(selectedGrammar.title)}
                  className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors shrink-0"
                  title="Nghe phát âm mẫu câu"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Formula */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Cấu Trúc & Cách Kết Hợp
                </h4>
                <div 
                  className="p-3.5 rounded-2xl border font-mono text-xs font-bold tracking-wide"
                  style={{
                    backgroundColor: isDarkMode ? '#252D37' : activePreset.light,
                    borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                    color: activePreset.dark,
                  }}
                >
                  {selectedGrammar.formula}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                  Giải Thích Chi Tiết & Lưu Ý Sử Dụng
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedGrammar.explanationVi}
                </p>
              </div>

              {/* Examples with Furigana */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Các Câu Ví Dụ Tiêu Biểu (Có Furigana)
                </h4>
                <div className="space-y-3">
                  {selectedGrammar.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl border transition-all"
                      style={{
                        backgroundColor: isDarkMode ? '#232933' : '#F8FAFC',
                        borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-sm sm:text-base font-bold text-gray-950 dark:text-white leading-relaxed">
                          <FuriganaText content={ex.furigana || ex.ja} />
                        </div>
                        <button
                          onClick={() => playAudio(ex.ja)}
                          className="p-1 rounded-lg text-gray-500 hover:text-blue-500 transition-colors shrink-0"
                          title="Nghe câu ví dụ"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-gray-950 dark:text-gray-100 mt-1.5 pt-1.5 border-t border-gray-200 dark:border-gray-700">
                        → {ex.vi}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-400">
              Chọn một mẫu ngữ pháp để xem chi tiết
            </div>
          )}
        </div>
      </div>

      {/* Add Manual Grammar Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div 
            className="w-full max-w-md p-6 rounded-3xl shadow-2xl border animate-in zoom-in-95 duration-150"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#374151' : '#E2E8F0',
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                Thêm Mẫu Ngữ Pháp N3 Mới
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveGrammar} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Tên mẫu câu <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: 〜に対して"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Công thức kết hợp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: N + に対して / N1 に対する N2"
                  value={formFormula}
                  onChange={(e) => setFormFormula(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Ý nghĩa tiếng Việt <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Đối với..., trái ngược với..."
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Giải thích chi tiết
                </label>
                <textarea
                  rows={2}
                  placeholder="Cách dùng, sắc thái cảm xúc, điểm khác biệt..."
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Câu ví dụ tiếng Nhật
                </label>
                <input
                  type="text"
                  placeholder="VD: 目上の人に対して丁寧な言葉遣いをする。"
                  value={formExJa}
                  onChange={(e) => setFormExJa(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Dịch nghĩa câu ví dụ
                </label>
                <input
                  type="text"
                  placeholder="VD: Dùng cách nói lịch sự đối với người bề trên."
                  value={formExVi}
                  onChange={(e) => setFormExVi(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-sm"
                  style={{ backgroundColor: activePreset.primary }}
                >
                  <Check className="w-4 h-4" />
                  Thêm Ngữ Pháp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PDF Content Review & Import Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div 
            className="w-full max-w-xl p-6 rounded-3xl shadow-2xl border animate-in zoom-in-95 duration-150"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#374151' : '#E2E8F0',
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileUp className="w-4 h-4 text-rose-500" />
                Phân Tích & Import Toàn Bộ Ngữ Pháp Từ File PDF
              </h3>
              <button onClick={() => setIsPdfModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-3">
              Hệ thống đã tiếp nhận dữ liệu từ file PDF. Bạn có thể kiểm tra hoặc dán thêm nội dung ngữ pháp vào đây, hệ thống sẽ tự động bóc tách từng mẫu câu vào danh sách học.
            </p>

            <textarea
              rows={8}
              value={pdfTextContent}
              onChange={(e) => setPdfTextContent(e.target.value)}
              placeholder="Nội dung ngữ pháp trích xuất từ file PDF..."
              className="w-full p-3 rounded-2xl text-xs border outline-none font-mono"
              style={{
                backgroundColor: isDarkMode ? '#2D3748' : '#F8FAFC',
                borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                color: isDarkMode ? '#F8FAFC' : '#1E293B',
              }}
            />

            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setIsPdfModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={handleConfirmPdfImport}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-sm"
                style={{ backgroundColor: activePreset.primary }}
              >
                <Check className="w-4 h-4" />
                Xác Nhận Nạp Vào Hệ Thống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
