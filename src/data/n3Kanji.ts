import { KanjiItem } from '../types';

/**
 * Standard JLPT N3 Kanji list with accurate stroke order according to standard KanjiVG
 * and precise start points (x, y percentages 0-100) for stroke numbers.
 */
export const INITIAL_KANJI: KanjiItem[] = [
  {
    id: 'kanji-1',
    kanji: '界',
    sinoVietnamese: 'GIỚI',
    onyomi: ['カイ (kai)'],
    kunyomi: ['—'],
    meaningVi: 'Cõi, ranh giới, phạm vi, thế giới',
    strokeCount: 9,
    radical: '田 (Điền)',
    // KanjiVG stroke order for 界:
    // 1: left vertical of 田
    // 2: top & right of 田 (hook)
    // 3: middle horizontal of 田
    // 4: middle vertical of 田
    // 5: bottom horizontal of 田
    // 6: left diagonal of 介
    // 7: right diagonal/stroke of 介
    // 8: left vertical stroke
    // 9: right vertical/stroke
    strokePaths: [
      'M 28,18 L 28,48',
      'M 28,19 L 72,19 L 72,48',
      'M 50,19 L 50,48',
      'M 28,33 L 72,33',
      'M 28,48 L 72,48',
      'M 48,52 C 40,65 28,78 18,84',
      'M 52,53 C 58,62 70,75 82,83',
      'M 38,64 L 38,88',
      'M 62,64 L 62,88',
    ],
    strokeStartPoints: [
      { x: 25, y: 18 }, // Stroke 1: Đỉnh nét sổ trái bộ Điền
      { x: 38, y: 14 }, // Stroke 2: Nét ngang gập bộ Điền
      { x: 50, y: 22 }, // Stroke 3: Nét sổ giữa bộ Điền
      { x: 32, y: 31 }, // Stroke 4: Nét ngang giữa bộ Điền
      { x: 30, y: 47 }, // Stroke 5: Nét ngang đáy bộ Điền
      { x: 44, y: 52 }, // Stroke 6: Nét phẩy trái bộ Giới/Giới hạn
      { x: 58, y: 53 }, // Stroke 7: Nét mác phải
      { x: 34, y: 64 }, // Stroke 8: Nét sổ trái phía dưới
      { x: 65, y: 64 }, // Stroke 9: Nét sổ phải phía dưới
    ],
    exampleWords: [
      { word: '限界', furigana: '<ruby>限界<rt>げんかい</rt></ruby>', meaningVi: 'Giới hạn' },
      { word: '世界', furigana: '<ruby>世界<rt>せかい</rt></ruby>', meaningVi: 'Thế giới' },
      { word: '財界', furigana: '<ruby>財界<rt>ざいかい</rt></ruby>', meaningVi: 'Giới tài chính' },
    ],
  },
  {
    id: 'kanji-2',
    kanji: '期',
    sinoVietnamese: 'KỲ',
    onyomi: ['キ (ki)', 'ゴ (go)'],
    kunyomi: ['—'],
    meaningVi: 'Thời kỳ, kỳ vọng, hạn định, ngày hẹn',
    strokeCount: 12,
    radical: '月 (Nguyệt)',
    // KanjiVG order for 期: 其 (strokes 1-8) then 月 (strokes 9-12)
    // 1: top horizontal of 其
    // 2: left vertical of 其
    // 3: right vertical of 其
    // 4: middle horizontal
    // 5: lower horizontal
    // 6: bottom horizontal connecting
    // 7: bottom-left diagonal leg
    // 8: bottom-right dot/diagonal leg
    // 9: left vertical/curve of 月
    // 10: top & right border of 月
    // 11: inner horizontal 1 of 月
    // 12: inner horizontal 2 of 月
    strokePaths: [
      'M 18,28 L 52,28',
      'M 28,16 L 28,60',
      'M 42,15 L 42,59',
      'M 20,40 L 50,40',
      'M 20,51 L 50,51',
      'M 14,64 L 56,64',
      'M 24,73 L 15,86',
      'M 42,72 L 53,85',
      'M 64,18 L 64,88',
      'M 64,19 L 85,19 L 85,88',
      'M 64,40 L 85,40',
      'M 64,60 L 85,60',
    ],
    strokeStartPoints: [
      { x: 15, y: 26 }, // Stroke 1: Ngang trên bộ Kỳ (trái)
      { x: 26, y: 13 }, // Stroke 2: Sổ dọc trái
      { x: 42, y: 12 }, // Stroke 3: Sổ dọc phải
      { x: 18, y: 38 }, // Stroke 4: Ngang giữa 1
      { x: 18, y: 49 }, // Stroke 5: Ngang giữa 2
      { x: 10, y: 62 }, // Stroke 6: Ngang đáy dài
      { x: 22, y: 72 }, // Stroke 7: Nét phẩy chân trái
      { x: 44, y: 71 }, // Stroke 8: Nét chấm chân phải
      { x: 61, y: 16 }, // Stroke 9: Sổ cong trái bộ Nguyệt
      { x: 74, y: 15 }, // Stroke 10: Ngang gập móc bộ Nguyệt
      { x: 67, y: 38 }, // Stroke 11: Ngang trong 1 bộ Nguyệt
      { x: 67, y: 58 }, // Stroke 12: Ngang trong 2 bộ Nguyệt
    ],
    exampleWords: [
      { word: '期待', furigana: '<ruby>期待<rt>きたい</rt></ruby>', meaningVi: 'Kỳ vọng, mong đợi' },
      { word: '期間', furigana: '<ruby>期間<rt>きかん</rt></ruby>', meaningVi: 'Thời kỳ, thời hạn' },
      { word: '時期', furigana: '<ruby>時期<rt>じき</rt></ruby>', meaningVi: 'Thời điểm' },
    ],
  },
  {
    id: 'kanji-3',
    kanji: '防',
    sinoVietnamese: 'PHÒNG',
    onyomi: ['ボウ (bou)'],
    kunyomi: ['ふせ・ぐ (fusegu)'],
    meaningVi: 'Phòng ngừa, phòng thủ, ngăn chặn',
    strokeCount: 7,
    radical: '阝 (Phụ)',
    // KanjiVG order for 防: 阝 (strokes 1-3) then 方 (strokes 4-7)
    // 1: 阝 top hook / curve
    // 2: 阝 lower loop
    // 3: 阝 vertical line
    // 4: 方 top dot/vertical
    // 5: 方 horizontal
    // 6: 方 curved hook
    // 7: 方 diagonal slash
    strokePaths: [
      'M 18,22 L 34,22 L 30,40',
      'M 30,40 C 40,43 38,62 25,66',
      'M 20,24 L 20,90',
      'M 64,15 L 64,28',
      'M 44,30 L 88,30',
      'M 68,34 L 68,64 C 68,76 60,78 52,74',
      'M 58,45 C 54,58 45,74 38,82',
    ],
    strokeStartPoints: [
      { x: 15, y: 19 }, // Stroke 1: Nét ngang gập tai bộ Phụ
      { x: 33, y: 40 }, // Stroke 2: Nét cong dưới bộ Phụ
      { x: 17, y: 32 }, // Stroke 3: Nét sổ thẳng đứng bộ Phụ
      { x: 62, y: 12 }, // Stroke 4: Nét chấm/đỉnh đầu chữ Phương
      { x: 42, y: 28 }, // Stroke 5: Nét ngang dài chữ Phương
      { x: 67, y: 35 }, // Stroke 6: Nét móc gập cong
      { x: 58, y: 44 }, // Stroke 7: Nét phẩy xiên trái
    ],
    exampleWords: [
      { word: '防止', furigana: '<ruby>防止<rt>ぼうし</rt></ruby>', meaningVi: 'Phòng ngừa, ngăn chặn' },
      { word: '予防', furigana: '<ruby>予防<rt>よぼう</rt></ruby>', meaningVi: 'Dự phòng' },
      { word: '防犯', furigana: '<ruby>防犯<rt>ぼうはん</rt></ruby>', meaningVi: 'Phòng chống tội phạm' },
    ],
  },
  {
    id: 'kanji-4',
    kanji: '態',
    sinoVietnamese: 'THÁI',
    onyomi: ['タイ (tai)'],
    kunyomi: ['わざ・と (wazato)'],
    meaningVi: 'Trạng thái, hình thái, dáng vẻ',
    strokeCount: 14,
    radical: '心 (Tâm)',
    // KanjiVG order for 態: 能 (strokes 1-10) then 心 (strokes 11-14)
    strokePaths: [
      'M 28,18 C 28,26 23,36 17,42', // 1: 厶 slash
      'M 18,34 L 38,34',             // 2: 厶 horizontal
      'M 30,22 L 30,52',             // 3: 月 left vertical
      'M 30,24 L 46,24 L 46,52',     // 4: 月 right hook
      'M 30,34 L 46,34',             // 5: 月 inner 1
      'M 30,44 L 46,44',             // 6: 月 inner 2
      'M 60,18 C 58,26 54,34 50,40', // 7: 匕 left curve
      'M 54,26 L 78,26',             // 8: 匕 hook
      'M 72,34 C 70,42 66,50 62,56', // 9: 匕 2 left curve
      'M 66,42 L 88,42',             // 10: 匕 2 hook
      'M 22,70 C 22,78 18,86 16,90', // 11: 心 left dot
      'M 32,68 C 38,86 58,88 78,82', // 12: 心 lying hook
      'M 48,72 L 50,82',             // 13: 心 inner dot
      'M 78,66 L 82,76',             // 14: 心 right dot
    ],
    strokeStartPoints: [
      { x: 26, y: 16 }, // Stroke 1
      { x: 14, y: 32 }, // Stroke 2
      { x: 27, y: 24 }, // Stroke 3
      { x: 42, y: 22 }, // Stroke 4
      { x: 33, y: 32 }, // Stroke 5
      { x: 33, y: 42 }, // Stroke 6
      { x: 58, y: 16 }, // Stroke 7
      { x: 70, y: 24 }, // Stroke 8
      { x: 70, y: 32 }, // Stroke 9
      { x: 80, y: 40 }, // Stroke 10
      { x: 20, y: 68 }, // Stroke 11 (Tâm - chấm trái)
      { x: 32, y: 66 }, // Stroke 12 (Tâm - nét nằm móc)
      { x: 48, y: 70 }, // Stroke 13 (Tâm - chấm giữa)
      { x: 78, y: 64 }, // Stroke 14 (Tâm - chấm phải)
    ],
    exampleWords: [
      { word: '状態', furigana: '<ruby>状態<rt>じょうたい</rt></ruby>', meaningVi: 'Trạng thái' },
      { word: '態度', furigana: '<ruby>態度<rt>たいど</rt></ruby>', meaningVi: 'Thái độ' },
      { word: '緊急事態', furigana: '<ruby>緊急<rt>きんきゅう</rt></ruby><ruby>事態<rt>じたい</rt></ruby>', meaningVi: 'Tình trạng khẩn cấp' },
    ],
  },
  {
    id: 'kanji-5',
    kanji: '逆',
    sinoVietnamese: 'NGHỊCH',
    onyomi: ['ギャク (gyaku)', 'ゲキ (geki)'],
    kunyomi: ['さか (saka)', 'さか・らう (sakarau)'],
    meaningVi: 'Ngược, nghịch đảo, chống đối, trái lại',
    strokeCount: 9,
    radical: '辶 (Sước)',
    // KanjiVG order for 逆: 屰 inner part first (strokes 1-6), then 辶 quai xước (strokes 7-9)
    // 1: top horizontal
    // 2: middle horizontal
    // 3: left vertical slant
    // 4: right vertical slant
    // 5: connecting horizontal
    // 6: center vertical
    // 7: 辶 dot
    // 8: 辶 zigzag line
    // 9: 辶 long flat wave/base
    strokePaths: [
      'M 42,16 L 68,16',
      'M 38,28 L 74,28',
      'M 44,30 L 40,50',
      'M 64,30 L 66,50',
      'M 40,48 L 70,48',
      'M 54,20 L 54,64',
      'M 18,24 L 26,30',
      'M 16,44 L 24,42 L 18,60',
      'M 12,68 C 22,70 34,84 88,84',
    ],
    strokeStartPoints: [
      { x: 40, y: 14 }, // Stroke 1: Nét ngang ngắn trên
      { x: 36, y: 26 }, // Stroke 2: Nét ngang thứ hai
      { x: 44, y: 30 }, // Stroke 3: Nét sổ xiên trái
      { x: 65, y: 30 }, // Stroke 4: Nét sổ xiên phải
      { x: 42, y: 46 }, // Stroke 5: Nét ngang nối
      { x: 53, y: 18 }, // Stroke 6: Nét sổ thẳng giữa
      { x: 16, y: 22 }, // Stroke 7: Dấu chấm bộ Sước
      { x: 15, y: 42 }, // Stroke 8: Nét gấp khúc zíc-zắc
      { x: 10, y: 67 }, // Stroke 9: Nét lượn sóng dài nâng đỡ đáy
    ],
    exampleWords: [
      { word: '逆', furigana: '<ruby>逆<rt>ぎゃく</rt></ruby>', meaningVi: 'Ngược lại, trái ngược' },
      { word: '逆転', furigana: '<ruby>逆転<rt>ぎゃくてん</rt></ruby>', meaningVi: 'Xoay chuyển tình thế' },
      { word: '逆らう', furigana: '<ruby>逆<rt>さか</rt></ruby>らう', meaningVi: 'Chống đối lại' },
    ],
  },
  {
    id: 'kanji-6',
    kanji: '責',
    sinoVietnamese: 'TRÁCH',
    onyomi: ['セキ (seki)'],
    kunyomi: ['せ・める (semeru)'],
    meaningVi: 'Trách nhiệm, quở trách, đòi hỏi',
    strokeCount: 11,
    radical: '貝 (Bối)',
    // KanjiVG order for 責: top part 龶 (strokes 1-4), then 貝 (strokes 5-11)
    // 1: horizontal 1
    // 2: center vertical
    // 3: horizontal 2
    // 4: horizontal 3
    // 5: 貝 left vertical
    // 6: 貝 top-right hook
    // 7: 貝 horizontal 1
    // 8: 貝 horizontal 2
    // 9: 貝 bottom closing horizontal
    // 10: 貝 bottom-left leg
    // 11: 貝 bottom-right dot
    strokePaths: [
      'M 28,18 L 72,18',
      'M 50,11 L 50,38',
      'M 22,28 L 78,28',
      'M 25,38 L 75,38',
      'M 34,44 L 34,74',
      'M 34,44 L 66,44 L 66,74',
      'M 34,54 L 66,54',
      'M 34,64 L 66,64',
      'M 34,74 L 66,74',
      'M 40,80 L 26,92',
      'M 60,80 L 74,92',
    ],
    strokeStartPoints: [
      { x: 26, y: 16 }, // Stroke 1: Ngang trên cùng
      { x: 49, y: 9 },  // Stroke 2: Sổ thẳng chính giữa
      { x: 20, y: 26 }, // Stroke 3: Ngang dài thứ hai
      { x: 23, y: 36 }, // Stroke 4: Ngang thứ ba
      { x: 32, y: 43 }, // Stroke 5: Sổ dọc trái khung bộ Bối
      { x: 52, y: 42 }, // Stroke 6: Ngang gập phải bộ Bối
      { x: 38, y: 52 }, // Stroke 7: Ngang trong 1
      { x: 38, y: 62 }, // Stroke 8: Ngang trong 2
      { x: 38, y: 72 }, // Stroke 9: Ngang đóng đáy bộ Bối
      { x: 36, y: 80 }, // Stroke 10: Phẩy chân trái
      { x: 62, y: 80 }, // Stroke 11: Chấm chân phải
    ],
    exampleWords: [
      { word: '責任', furigana: '<ruby>責任<rt>せきにん</rt></ruby>', meaningVi: 'Trách nhiệm' },
      { word: '責める', furigana: '<ruby>責<rt>せ</rt></ruby>める', meaningVi: 'Quở trách, đổ lỗi' },
      { word: '無責任', furigana: '<ruby>無責任<rt>むせきにん</rt></ruby>', meaningVi: 'Vô trách nhiệm' },
    ],
  },
];
