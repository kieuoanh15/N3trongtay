import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCcw, 
  Eye, 
  EyeOff, 
  Volume2, 
  Check, 
  Sparkles, 
  PenTool, 
  Trophy,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { KanjiItem } from '../types';
import { ThemePreset } from '../utils/themePresets';
import { playJapaneseAudio } from '../utils/speechHelper';
import { FuriganaText } from './FuriganaText';

interface KanjiSectionProps {
  kanjiList: KanjiItem[];
  isDarkMode: boolean;
  activePreset: ThemePreset;
  onAddGold: (amount: number) => void;
}

export const KanjiSection: React.FC<KanjiSectionProps> = ({
  kanjiList,
  isDarkMode,
  activePreset,
  onAddGold,
}) => {
  const [selectedKanjiIndex, setSelectedKanjiIndex] = useState(0);
  const [showGuide, setShowGuide] = useState(true);
  const [userStrokeCount, setUserStrokeCount] = useState(0);
  const [strokeWarning, setStrokeWarning] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<number | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  const currentKanji = kanjiList[selectedKanjiIndex] || kanjiList[0];

  // Canvas Dimensions
  const CANVAS_SIZE = 320;

  // Clear Canvas and Draw Standard Japanese Grid
  const drawGrid = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Border of standard Japanese square
    ctx.strokeStyle = isDarkMode ? '#3A4759' : '#CBD5E1';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Dotted cross lines (đường nét đứt chữ thập mờ)
    ctx.beginPath();
    ctx.setLineDash([6, 6]);
    ctx.strokeStyle = isDarkMode ? '#2D3748' : '#E2E8F0';
    ctx.lineWidth = 1.5;

    // Horizontal center line
    ctx.moveTo(0, CANVAS_SIZE / 2);
    ctx.lineTo(CANVAS_SIZE, CANVAS_SIZE / 2);

    // Vertical center line
    ctx.moveTo(CANVAS_SIZE / 2, 0);
    ctx.lineTo(CANVAS_SIZE / 2, CANVAS_SIZE);

    ctx.stroke();
    ctx.setLineDash([]); // Reset dash
  };

  // Reset Canvas on Kanji change
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGrid(ctx);
    setUserStrokeCount(0);
    setStrokeWarning(null);
    setScoreResult(null);
  };

  useEffect(() => {
    clearCanvas();
  }, [selectedKanjiIndex, isDarkMode]);

  // Touch / Mouse Drawing Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    isDrawingRef.current = true;
    lastPointRef.current = { x, y };
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || !lastPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.strokeStyle = isDarkMode ? '#FFFFFF' : '#1E293B';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPointRef.current = { x, y };
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;

    const newCount = userStrokeCount + 1;
    setUserStrokeCount(newCount);

    // Stroke order verification logic
    if (newCount > currentKanji.strokeCount) {
      setStrokeWarning(`⚠️ Cảnh báo: Chữ này chỉ có ${currentKanji.strokeCount} nét. Bạn vừa vẽ nét thứ ${newCount}!`);
    } else {
      setStrokeWarning(null);
    }
  };

  // Check and Score Kanji Writing
  const handleScoreDrawing = () => {
    if (userStrokeCount === 0) {
      setStrokeWarning('Vui lòng viết vào ô trước khi chấm điểm!');
      return;
    }

    if (userStrokeCount === currentKanji.strokeCount) {
      const score = 100;
      setScoreResult(score);
      onAddGold(25);
      setStrokeWarning(`Xuất sắc! Bạn đã viết chuẩn xác ${currentKanji.strokeCount}/${currentKanji.strokeCount} nét theo chuẩn Nhật Bản. (+25 Vàng)`);
    } else {
      const diff = Math.abs(userStrokeCount - currentKanji.strokeCount);
      const score = Math.max(50, 100 - diff * 15);
      setScoreResult(score);
      setStrokeWarning(`Điểm: ${score}/100. Số nét bạn vẽ (${userStrokeCount}) chưa khớp với số nét chuẩn (${currentKanji.strokeCount} nét).`);
    }
  };

  const playAudio = (text: string) => {
    playJapaneseAudio(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
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
              Ô Chuẩn Nhật Bản
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Chữ {selectedKanjiIndex + 1} / {kanjiList.length}
            </span>
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-gray-100">
            Luyện Viết Chữ Hán Kanji N3 Theo Thứ Tự Nét
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Khung lưới chữ thập nét đứt mờ, hướng dẫn số thứ tự từng nét và hệ thống chấm điểm tự động.
          </p>
        </div>

        {/* Navigation Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedKanjiIndex(prev => Math.max(0, prev - 1))}
            disabled={selectedKanjiIndex === 0}
            className="p-2 rounded-xl border disabled:opacity-30 hover:opacity-80 transition-all"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
              borderColor: isDarkMode ? '#4A5568' : '#E2E8F0',
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setSelectedKanjiIndex(prev => Math.min(kanjiList.length - 1, prev + 1))}
            disabled={selectedKanjiIndex === kanjiList.length - 1}
            className="p-2 rounded-xl border disabled:opacity-30 hover:opacity-80 transition-all"
            style={{
              backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
              borderColor: isDarkMode ? '#4A5568' : '#E2E8F0',
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Canvas Area + Right Kanji Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left: Canvas & Drawing Controls */}
        <div className="md:col-span-6 flex flex-col items-center space-y-4">
          {/* Canvas Box */}
          <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            {/* Guide SVG Overlay with Stroke Numbers */}
            {showGuide && (
              <div 
                className="absolute inset-0 pointer-events-none flex items-center justify-center select-none"
                style={{ opacity: isDarkMode ? 0.25 : 0.2 }}
              >
                <span className="text-[180px] font-serif font-black text-gray-500 leading-none">
                  {currentKanji.kanji}
                </span>
              </div>
            )}

            {/* Stroke Sequence Number Hints Overlay positioned at exact starting point (KanjiVG standard) */}
            {showGuide && currentKanji.strokePaths.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {currentKanji.strokePaths.map((_, index) => {
                  const pt = currentKanji.strokeStartPoints?.[index] || {
                    x: 20 + (index * 15) % 65,
                    y: 18 + (index * 17) % 65,
                  };
                  return (
                    <div
                      key={index}
                      className="absolute w-5 h-5 -ml-2.5 -mt-2.5 rounded-full bg-rose-500/90 text-white font-black text-[10px] flex items-center justify-center shadow-md ring-1 ring-white"
                      style={{
                        left: `${pt.x}%`,
                        top: `${pt.y}%`,
                      }}
                      title={`Nét thứ ${index + 1}`}
                    >
                      {index + 1}
                    </div>
                  );
                })}
              </div>
            )}

            <canvas
              ref={canvasRef}
              width={CANVAS_SIZE}
              height={CANVAS_SIZE}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="cursor-crosshair touch-none"
            />
          </div>

          {/* Stroke Progress & Warning */}
          <div className="w-full max-w-xs text-center space-y-1">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-500">
                Nét đã viết: <span className="text-blue-500 font-mono text-sm">{userStrokeCount}</span> / {currentKanji.strokeCount}
              </span>
              {scoreResult !== null && (
                <span className="text-emerald-500 flex items-center gap-1 font-bold">
                  <Trophy className="w-3.5 h-3.5" />
                  {scoreResult} Điểm
                </span>
              )}
            </div>

            {strokeWarning && (
              <p className="text-xs font-semibold p-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200">
                {strokeWarning}
              </p>
            )}
          </div>

          {/* Action Buttons below Canvas */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-80"
              style={{
                backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                color: isDarkMode ? '#E2E8F0' : '#334155',
              }}
            >
              {showGuide ? <EyeOff className="w-4 h-4 text-rose-500" /> : <Eye className="w-4 h-4 text-emerald-500" />}
              <span>{showGuide ? 'Ẩn nét mẫu' : 'Hiện nét mẫu'}</span>
            </button>

            <button
              onClick={clearCanvas}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all hover:opacity-80"
              style={{
                backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
                borderColor: isDarkMode ? '#4A5568' : '#CBD5E1',
                color: isDarkMode ? '#E2E8F0' : '#334155',
              }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Xóa viết lại</span>
            </button>

            <button
              onClick={handleScoreDrawing}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-transform active:scale-95 shadow-xs"
              style={{ backgroundColor: activePreset.primary }}
            >
              <Check className="w-4 h-4" />
              <span>Chấm điểm nét</span>
            </button>
          </div>
        </div>

        {/* Right: Kanji Details & Vocabulary Examples */}
        <div 
          className="md:col-span-6 p-6 rounded-3xl border shadow-sm space-y-4"
          style={{
            backgroundColor: isDarkMode ? '#1E232A' : '#FFFFFF',
            borderColor: isDarkMode ? '#2D3748' : '#E8EEF5',
          }}
        >
          {/* Top Title Info */}
          <div className="flex items-start justify-between border-b pb-4"
            style={{ borderColor: isDarkMode ? '#2D3748' : '#E8EEF5' }}
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-gray-900 dark:text-gray-50">
                  {currentKanji.kanji}
                </span>
                <div>
                  <span 
                    className="text-xs font-black uppercase px-2.5 py-0.5 rounded-md"
                    style={{ backgroundColor: activePreset.badgeBg, color: activePreset.primary }}
                  >
                    Hán Việt: {currentKanji.sinoVietnamese}
                  </span>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mt-1">
                    {currentKanji.meaningVi}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => playAudio(currentKanji.kanji)}
              className="p-2 rounded-xl text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              title="Phát âm chữ Hán"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>

          {/* Stroke Count & Readings */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div 
              className="p-3 rounded-2xl border"
              style={{
                backgroundColor: isDarkMode ? '#252D37' : activePreset.light,
                borderColor: isDarkMode ? '#374151' : '#E2E8F0',
              }}
            >
              <span className="text-gray-400 font-bold block mb-0.5">Số nét vẽ chuẩn:</span>
              <span className="text-base font-black" style={{ color: activePreset.primary }}>
                {currentKanji.strokeCount} nét
              </span>
            </div>

            <div 
              className="p-3 rounded-2xl border"
              style={{
                backgroundColor: isDarkMode ? '#252D37' : activePreset.light,
                borderColor: isDarkMode ? '#374151' : '#E2E8F0',
              }}
            >
              <span className="text-gray-400 font-bold block mb-0.5">Bộ thủ (Radical):</span>
              <span className="text-base font-black text-gray-800 dark:text-gray-200">
                {currentKanji.radical}
              </span>
            </div>
          </div>

          {/* On-yomi and Kun-yomi */}
          <div className="space-y-2 text-xs">
            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-400 shrink-0 w-20">Âm On (Âm Hán):</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 font-mono">
                {currentKanji.onyomi.join('、 ')}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-bold text-gray-400 shrink-0 w-20">Âm Kun (Thuần Nhật):</span>
              <span className="font-bold text-gray-900 dark:text-gray-100 font-mono">
                {currentKanji.kunyomi.join('、 ')}
              </span>
            </div>
          </div>

          {/* Example Words with Furigana */}
          <div className="pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Từ Vựng N3 Đi Cùng (Kèm Furigana & Hán Việt)
            </h4>
            <div className="space-y-2">
              {currentKanji.exampleWords.map((word, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? '#232933' : '#F8FAFC',
                    borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
                  }}
                >
                  <div>
                    <div className="text-sm font-black text-gray-900 dark:text-gray-100">
                      <FuriganaText content={word.furigana || word.word} />
                    </div>
                    <p className="text-xs font-bold text-gray-950 dark:text-gray-100 mt-0.5">
                      {word.meaningVi}
                    </p>
                  </div>

                  <button
                    onClick={() => playAudio(word.word)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 transition-colors"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
