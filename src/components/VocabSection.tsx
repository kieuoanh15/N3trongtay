import React, { useState } from 'react';
import { 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Volume2, 
  Sparkles, 
  Check, 
  X,
  RefreshCw,
  Info
} from 'lucide-react';
import { VocabularyItem, VocabPartOfSpeech } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { downloadExcelTemplate, parseExcelVocabularyFile } from '../utils/excelHelper';
import { generateNaturalVocabExample } from '../utils/exampleGenerator';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface VocabSectionProps {
  vocabulary: VocabularyItem[];
  setVocabulary: React.Dispatch<React.SetStateAction<VocabularyItem[]>>;
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const VocabSection: React.FC<VocabSectionProps> = ({
  vocabulary,
  setVocabulary,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [activePos, setActivePos] = useState<VocabPartOfSpeech>('noun');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form State for Adding / Editing Vocab
  const [formKanji, setFormKanji] = useState('');
  const [formSinoVi, setFormSinoVi] = useState('');
  const [formHiragana, setFormHiragana] = useState('');
  const [formMeaning, setFormMeaning] = useState('');
  const [formPos, setFormPos] = useState<VocabPartOfSpeech>('noun');
  const [formSentenceJa, setFormSentenceJa] = useState('');
  const [formSentenceFurigana, setFormSentenceFurigana] = useState('');
  const [formSentenceVi, setFormSentenceVi] = useState('');

  // 4 POS category tabs as specified in requirements
  const posTabs = [
    { id: 'noun', label: '1. Danh từ', count: vocabulary.filter(v => v.partOfSpeech === 'noun').length },
    { id: 'i_adj', label: '2. Tính từ đuôi i', count: vocabulary.filter(v => v.partOfSpeech === 'i_adj').length },
    { id: 'na_adj', label: '3. Tính từ đuôi na', count: vocabulary.filter(v => v.partOfSpeech === 'na_adj').length },
    { id: 'verb', label: '4. Động từ', count: vocabulary.filter(v => v.partOfSpeech === 'verb').length },
  ];

  const filteredVocab = vocabulary.filter(item => {
    const matchesPos = item.partOfSpeech === activePos;
    if (!matchesPos) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (
      item.kanji.toLowerCase().includes(query) ||
      item.hiragana.toLowerCase().includes(query) ||
      item.sinoVietnamese.toLowerCase().includes(query) ||
      item.meaningVi.toLowerCase().includes(query)
    );
  });

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Play Japanese Text-To-Speech with clean pronunciation
  const playAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  // Auto-generate sentence via AI
  const handleAutoGenerateSentence = async () => {
    if (!formKanji && !formHiragana) {
      showToast('Vui lòng nhập Từ vựng Kanji hoặc Hiragana trước khi tạo câu ví dụ!');
      return;
    }
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/gemini/generate-example', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kanji: formKanji,
          hiragana: formHiragana,
          meaning: formMeaning,
          partOfSpeech: formPos,
        }),
      });
      const data = await res.json();
      if (data.sentenceJa) {
        setFormSentenceJa(data.sentenceJa);
        setFormSentenceFurigana(data.sentenceFurigana || data.sentenceJa);
        setFormSentenceVi(data.sentenceVi || 'Nghĩa tiếng Việt ví dụ');
        showToast('AI đã tự động sinh câu ví dụ N3 chuẩn ngữ pháp!');
      } else {
        const naturalExample = generateNaturalVocabExample(formKanji, formHiragana, formMeaning, formPos);
        setFormSentenceJa(naturalExample.sentenceJa);
        setFormSentenceFurigana(naturalExample.sentenceFurigana);
        setFormSentenceVi(naturalExample.sentenceVi);
        showToast('Đã tạo câu ví dụ N3 tự nhiên bám sát ngữ nghĩa!');
      }
    } catch {
      // Natural Contextual Fallback tailored to word & part of speech
      const naturalExample = generateNaturalVocabExample(formKanji, formHiragana, formMeaning, formPos);
      setFormSentenceJa(naturalExample.sentenceJa);
      setFormSentenceFurigana(naturalExample.sentenceFurigana);
      setFormSentenceVi(naturalExample.sentenceVi);
      showToast('Đã tạo câu ví dụ N3 bám sát ngữ cảnh!');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  // Save new or edited vocab
  const handleSaveVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formKanji.trim() && !formHiragana.trim()) {
      showToast('Vui lòng nhập Kanji hoặc Hiragana!');
      return;
    }

    let finalSentenceJa = formSentenceJa;
    let finalSentenceFurigana = formSentenceFurigana;
    let finalSentenceVi = formSentenceVi;

    // If user didn't write an example sentence, auto-generate realistic natural sentence immediately
    if (!finalSentenceJa) {
      const generated = generateNaturalVocabExample(formKanji, formHiragana, formMeaning, formPos);
      finalSentenceJa = generated.sentenceJa;
      finalSentenceFurigana = generated.sentenceFurigana;
      finalSentenceVi = generated.sentenceVi;
    }

    if (isEditing) {
      setVocabulary(prev => prev.map(item => {
        if (item.id === isEditing) {
          return {
            ...item,
            kanji: formKanji.trim(),
            sinoVietnamese: formSinoVi.trim(),
            hiragana: formHiragana.trim(),
            meaningVi: formMeaning.trim(),
            partOfSpeech: formPos,
            sentenceJa: finalSentenceJa,
            sentenceFurigana: finalSentenceFurigana,
            sentenceVi: finalSentenceVi,
          };
        }
        return item;
      }));
      showToast('Đã cập nhật từ vựng thành công!');
    } else {
      const newItem: VocabularyItem = {
        id: `custom-vocab-${Date.now()}`,
        kanji: formKanji.trim(),
        sinoVietnamese: formSinoVi.trim(),
        hiragana: formHiragana.trim(),
        meaningVi: formMeaning.trim(),
        partOfSpeech: formPos,
        sentenceJa: finalSentenceJa,
        sentenceFurigana: finalSentenceFurigana,
        sentenceVi: finalSentenceVi,
        isCustom: true,
      };
      setVocabulary(prev => [newItem, ...prev]);
      onAddGold(15); // Reward 15 gold for adding vocabulary
      showToast('Thêm từ vựng mới thành công! (+15 Vàng thưởng)');
    }

    // Reset
    setIsModalOpen(false);
    setIsEditing(null);
    setFormKanji('');
    setFormSinoVi('');
    setFormHiragana('');
    setFormMeaning('');
    setFormSentenceJa('');
    setFormSentenceFurigana('');
    setFormSentenceVi('');
  };

  // Open Edit
  const handleEditClick = (item: VocabularyItem) => {
    setIsEditing(item.id);
    setFormKanji(item.kanji);
    setFormSinoVi(item.sinoVietnamese);
    setFormHiragana(item.hiragana);
    setFormMeaning(item.meaningVi);
    setFormPos(item.partOfSpeech);
    setFormSentenceJa(item.sentenceJa);
    setFormSentenceFurigana(item.sentenceFurigana);
    setFormSentenceVi(item.sentenceVi);
    setIsModalOpen(true);
  };

  // Delete
  const handleDeleteVocab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Bạn có chắc chắn muốn xóa từ vựng này? Flashcard liên quan cũng sẽ tự động được cập nhật.')) {
      setVocabulary(prev => prev.filter(item => item.id !== id));
      showToast('Đã xóa từ vựng!');
    }
  };

  // Handle Excel Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast('Đang phân tích file Excel 4 cột chuẩn...');
      const imported = await parseExcelVocabularyFile(file);
      if (imported.length === 0) {
        showToast('Không tìm thấy dữ liệu từ vựng hợp lệ trong file!');
        return;
      }
      setVocabulary(prev => [...imported, ...prev]);
      onAddGold(imported.length * 5);
      showToast(`Đã import thành công ${imported.length} từ vựng từ Excel! (+${imported.length * 5} Vàng)`);
    } catch {
      showToast('Lỗi khi đọc file Excel. Vui lòng kiểm tra định dạng!');
    } finally {
      e.target.value = '';
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

      {/* Header Controls Banner */}
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
              <span 
                className="text-xs font-semibold"
                style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
              >
                Tổng {vocabulary.length} từ vựng
              </span>
            </div>
            <h2 
              className="text-xl font-black"
              style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
            >
              Kho Từ Vựng N3 Chuẩn Âm & Furigana
            </h2>
            <p 
              className="text-xs mt-0.5 font-medium"
              style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}
            >
              Bỏ hình ảnh minh họa theo chuẩn đề thi. Tự động sinh câu ví dụ & Furigana chuẩn Nhật.
            </p>
          </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download Excel Template */}
          <button
            id="btn-download-excel-template"
            onClick={downloadExcelTemplate}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-85 active:scale-95 shadow-2xs"
            style={{
              backgroundColor: isDarkMode ? '#28313E' : '#F8FAFC',
              borderColor: isDarkMode ? '#3A4759' : '#CBD5E1',
              color: isDarkMode ? '#E2E8F0' : '#334155',
            }}
            title="Tải file Excel mẫu 4 cột chuẩn"
          >
            <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="nowrap-label">Tải Excel Mẫu</span>
          </button>

          {/* Upload Excel Button */}
          <label
            id="btn-upload-excel"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all hover:opacity-85 active:scale-95 shadow-2xs"
            style={{
              backgroundColor: isDarkMode ? '#28313E' : '#F8FAFC',
              borderColor: isDarkMode ? '#3A4759' : '#CBD5E1',
              color: isDarkMode ? '#E2E8F0' : '#334155',
            }}
            title="Tải lên file Excel từ vựng"
          >
            <Upload className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="nowrap-label">Import Excel</span>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Add Manual Vocab */}
          <button
            id="btn-add-vocab-manual"
            onClick={() => {
              setIsEditing(null);
              setFormKanji('');
              setFormSinoVi('');
              setFormHiragana('');
              setFormMeaning('');
              setFormPos(activePos);
              setFormSentenceJa('');
              setFormSentenceFurigana('');
              setFormSentenceVi('');
              setIsModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow-xs"
            style={{ backgroundColor: activePreset.primary }}
          >
            <Plus className="w-4 h-4" />
            <span className="nowrap-label">Thêm Từ Vựng</span>
          </button>
        </div>
      </div>

      {/* 4 Part of Speech Menu Tabs (Danh từ, Tính từ đuôi i, Tính từ đuôi na, Động từ) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div 
          className="p-1 rounded-2xl border flex flex-wrap gap-1"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#F1F5F9',
            borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
          }}
        >
          {posTabs.map((tab) => {
            const isCurrent = activePos === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-pos-${tab.id}`}
                onClick={() => setActivePos(tab.id as VocabPartOfSpeech)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                style={{
                  backgroundColor: isCurrent ? activePreset.primary : (isDarkMode ? '#242C37' : '#FFFFFF'),
                  color: isCurrent ? '#FFFFFF' : (isDarkMode ? '#E2E8F0' : '#1E293B'),
                }}
              >
                <span>{tab.label}</span>
                <span 
                  className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                  style={{
                    backgroundColor: isCurrent ? 'rgba(255, 255, 255, 0.25)' : (isDarkMode ? '#374151' : '#E2E8F0'),
                    color: isCurrent ? '#FFFFFF' : (isDarkMode ? '#CBD5E1' : '#475569'),
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm Kanji, Hán Việt, Hiragana, nghĩa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl text-xs border outline-none transition-colors"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#2D3748' : '#CBD5E1',
              color: isDarkMode ? '#F8FAFC' : '#1E293B',
            }}
          />
        </div>
      </div>

      {/* Vocabulary Card Grid */}
      {filteredVocab.length === 0 ? (
        <div 
          className="p-12 text-center rounded-3xl border border-dashed"
          style={{ borderColor: isDarkMode ? '#374151' : '#CBD5E1' }}
        >
          <Info className="w-8 h-8 mx-auto text-gray-400 mb-2" />
          <p className="text-sm font-semibold text-gray-500">Chưa có từ vựng nào trong mục này hoặc không tìm thấy kết quả.</p>
          <p className="text-xs text-gray-400 mt-1">Bấm "Thêm Từ Vựng" hoặc "Import Excel" để tải thêm dữ liệu N3.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredVocab.map((item) => (
            <div
              key={item.id}
              id={`vocab-card-${item.id}`}
              className="p-4 rounded-2xl border transition-all hover:shadow-md flex flex-col justify-between group"
              style={{
                backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
                color: isDarkMode ? '#F8FAFC' : '#0F172A',
              }}
            >
              <div>
                {/* Top Row: Word Kanji with Furigana + Sino-Vietnamese + Audio */}
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    {/* Furigana Display */}
                    <ruby 
                      className="text-2xl font-black tracking-wide"
                      style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                    >
                      {item.kanji}
                      <rt 
                        className="text-xs font-bold"
                        style={{ color: isDarkMode ? '#CBD5E1' : '#334155' }}
                      >
                        {item.hiragana}
                      </rt>
                    </ruby>

                    {/* Âm Hán Việt */}
                    {item.sinoVietnamese && (
                      <span 
                        className="text-[11px] font-black uppercase px-2 py-0.5 rounded-md border"
                        style={{
                          backgroundColor: isDarkMode ? '#2D3748' : activePreset.badgeBg,
                          color: isDarkMode ? '#F8FAFC' : activePreset.dark,
                          borderColor: activePreset.primary,
                        }}
                      >
                        {item.sinoVietnamese}
                      </span>
                    )}
                  </div>

                  {/* Actions: Audio + Edit + Delete */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => playAudio(item.kanji || item.hiragana)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: isDarkMode ? '#94A3B8' : '#475569' }}
                      title="Phát âm tiếng Nhật chuẩn"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: isDarkMode ? '#94A3B8' : '#64748B' }}
                      title="Chỉnh sửa từ vựng"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => handleDeleteVocab(item.id, e)}
                      className="p-1.5 rounded-lg transition-colors hover:text-rose-600"
                      style={{ color: isDarkMode ? '#94A3B8' : '#94A3B8' }}
                      title="Xóa từ vựng"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Meaning */}
                <p 
                  className="text-base font-extrabold mb-3"
                  style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                >
                  {item.meaningVi}
                </p>

                {/* Example sentence with Furigana */}
                {item.sentenceJa && (
                  <div 
                    className="p-3.5 rounded-xl border space-y-1.5"
                    style={{
                      backgroundColor: isDarkMode ? '#202630' : '#F1F5F9',
                      borderColor: isDarkMode ? '#333F4E' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#0F172A',
                    }}
                  >
                    <div className="flex items-center justify-between text-xs font-black mb-1">
                      <span 
                        className="flex items-center gap-1 font-black"
                        style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                      >
                        💬 Ví dụ thực tế:
                      </span>
                      <button 
                        onClick={() => playAudio(item.sentenceJa)}
                        className="hover:underline flex items-center gap-1 font-bold"
                        style={{ color: activePreset.primary }}
                      >
                        <Volume2 className="w-3.5 h-3.5" /> Nghe ví dụ
                      </button>
                    </div>

                    <div 
                      className="font-bold text-sm sm:text-[15px] leading-relaxed"
                      style={{ color: isDarkMode ? '#F8FAFC' : '#0F172A' }}
                    >
                      <FuriganaText content={item.sentenceFurigana || item.sentenceJa} />
                    </div>

                    <p 
                      className="font-bold text-xs sm:text-sm pt-1.5 border-t"
                      style={{ 
                        color: isDarkMode ? '#E2E8F0' : '#1E293B',
                        borderColor: isDarkMode ? '#374151' : '#CBD5E1',
                      }}
                    >
                      → {item.sentenceVi}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Vocab Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div 
            className="w-full max-w-lg p-6 rounded-3xl shadow-2xl border animate-in zoom-in-95 duration-150"
            style={{
              backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
              borderColor: isDarkMode ? '#374151' : '#E2E8F0',
            }}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                {isEditing ? 'Chỉnh Sửa Từ Vựng N3' : 'Thêm Từ Vựng N3 Mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVocab} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                {/* Kanji */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Chữ Kanji <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 限界"
                    value={formKanji}
                    onChange={(e) => setFormKanji(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>

                {/* Âm Hán Việt */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Âm Hán Việt (Cột 2)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: HẠN GIỚI"
                    value={formSinoVi}
                    onChange={(e) => setFormSinoVi(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium uppercase"
                    style={{
                      backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Hiragana */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Hiragana / Furigana <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: げんかい"
                    value={formHiragana}
                    onChange={(e) => setFormHiragana(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>

                {/* Part of Speech */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Loại từ N3
                  </label>
                  <select
                    value={formPos}
                    onChange={(e) => setFormPos(e.target.value as VocabPartOfSpeech)}
                    className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium"
                    style={{
                      backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  >
                    <option value="noun">Danh từ</option>
                    <option value="i_adj">Tính từ đuôi i</option>
                    <option value="na_adj">Tính từ đuôi na</option>
                    <option value="verb">Động từ</option>
                  </select>
                </div>
              </div>

              {/* Nghĩa Tiếng Việt */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Nghĩa Tiếng Việt (Cột 4) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Giới hạn, mức độ cao nhất"
                  value={formMeaning}
                  onChange={(e) => setFormMeaning(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs border outline-none font-medium"
                  style={{
                    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                    borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                    color: isDarkMode ? '#F8FAFC' : '#1E293B',
                  }}
                />
              </div>

              {/* Auto Generate Example Sentence using AI Button */}
              <div 
                className="p-3 rounded-2xl border"
                style={{
                  backgroundColor: isDarkMode ? '#252D37' : activePreset.light,
                  borderColor: isDarkMode ? '#374151' : '#E2E8F0',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Tự động hóa sinh câu ví dụ N3:
                  </span>
                  <button
                    type="button"
                    onClick={handleAutoGenerateSentence}
                    disabled={isGeneratingAi}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: activePreset.primary }}
                  >
                    {isGeneratingAi ? (
                      <>
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        AI đang sinh câu...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3" />
                        AI Tạo Ví Dụ
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Câu tiếng Nhật (hoặc bấm nút AI để tự tạo)"
                    value={formSentenceJa}
                    onChange={(e) => {
                      setFormSentenceJa(e.target.value);
                      if (!formSentenceFurigana) setFormSentenceFurigana(e.target.value);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg text-xs border outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Nghĩa tiếng Việt của câu ví dụ"
                    value={formSentenceVi}
                    onChange={(e) => setFormSentenceVi(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-xs border outline-none"
                    style={{
                      backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
                      borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                      color: isDarkMode ? '#F8FAFC' : '#1E293B',
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
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
                  {isEditing ? 'Lưu Thay Đổi' : 'Thêm Vào Kho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
