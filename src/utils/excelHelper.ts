import * as XLSX from 'xlsx';
import { VocabularyItem, VocabPartOfSpeech } from '../types';
import { generateNaturalVocabExample } from './exampleGenerator';

/**
 * Downloads standard 4-column Excel template for Mimikara N3 Vocabulary
 * Column 1: Từ vựng Kanji
 * Column 2: Âm Hán Việt
 * Column 3: Hiragana
 * Column 4: Nghĩa Tiếng Việt
 */
export function downloadExcelTemplate() {
  const sampleData = [
    {
      'Từ vựng Kanji': '限界',
      'Âm Hán Việt': 'HẠN GIỚI',
      'Hiragana': 'げんかい',
      'Nghĩa Tiếng Việt': 'Giới hạn, ranh giới cao nhất',
    },
    {
      'Từ vựng Kanji': '期待',
      'Âm Hán Việt': 'KỲ ĐÃI',
      'Hiragana': 'きたい',
      'Nghĩa Tiếng Việt': 'Sự kỳ vọng, mong đợi',
    },
    {
      'Từ vựng Kanji': '惜しい',
      'Âm Hán Việt': 'TÍCH',
      'Hiragana': 'おしい',
      'Nghĩa Tiếng Việt': 'Đáng tiếc, uổng phí',
    },
    {
      'Từ vựng Kanji': '穏やか',
      'Âm Hán Việt': 'ỔN',
      'Hiragana': 'おだやか',
      'Nghĩa Tiếng Việt': 'Ôn hòa, bình tĩnh',
    },
    {
      'Từ vựng Kanji': '抱える',
      'Âm Hán Việt': 'BÃO',
      'Hiragana': 'かかえる',
      'Nghĩa Tiếng Việt': 'Ôm, gánh vác (vấn đề, nợ nần)',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);
  // Set column widths
  worksheet['!cols'] = [
    { wch: 18 }, // Từ vựng Kanji
    { wch: 16 }, // Âm Hán Việt
    { wch: 18 }, // Hiragana
    { wch: 35 }, // Nghĩa Tiếng Việt
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'N3_Vocab_Template');
  XLSX.writeFile(workbook, 'N3_Trong_Tay_Mau_Tu_Vung_4Cot.xlsx');
}

/**
 * Parses uploaded Excel file into Vocabulary items
 */
export async function parseExcelVocabularyFile(file: File): Promise<VocabularyItem[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const rawRows: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        if (!rawRows || rawRows.length < 2) {
          resolve([]);
          return;
        }

        const items: VocabularyItem[] = [];
        // Skip header row (index 0)
        for (let i = 1; i < rawRows.length; i++) {
          const row = rawRows[i];
          if (!row || row.length === 0) continue;

          const kanji = String(row[0] || '').trim();
          const sinoVietnamese = String(row[1] || '').trim();
          const hiragana = String(row[2] || '').trim();
          const meaningVi = String(row[3] || '').trim();

          if (!kanji && !hiragana) continue;

          // Determine part of speech intelligently
          let pos: VocabPartOfSpeech = 'noun';
          if (kanji.endsWith('い') || hiragana.endsWith('い')) {
            pos = 'i_adj';
          } else if (kanji.endsWith('な') || meaningVi.toLowerCase().includes('tính từ') || hiragana.endsWith('だ')) {
            pos = 'na_adj';
          } else if (
            kanji.endsWith('る') || kanji.endsWith('う') || kanji.endsWith('く') ||
            kanji.endsWith('す') || kanji.endsWith('つ') || kanji.endsWith('ぬ') ||
            kanji.endsWith('ふ') || kanji.endsWith('む') || kanji.endsWith('ぐ')
          ) {
            pos = 'verb';
          }

          const wordKanji = kanji || hiragana;
          const naturalSentence = generateNaturalVocabExample(wordKanji, hiragana || wordKanji, meaningVi, pos);

          items.push({
            id: `imported-${Date.now()}-${i}`,
            kanji: wordKanji,
            sinoVietnamese: sinoVietnamese || '',
            hiragana: hiragana || kanji,
            meaningVi: meaningVi || 'Đang cập nhật nghĩa',
            partOfSpeech: pos,
            sentenceJa: naturalSentence.sentenceJa,
            sentenceFurigana: naturalSentence.sentenceFurigana,
            sentenceVi: naturalSentence.sentenceVi,
            isCustom: true,
          });
        }

        resolve(items);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
}
