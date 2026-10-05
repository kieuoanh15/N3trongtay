/**
 * Reliable SpeechSynthesis Helper for Japanese Text-to-Speech
 * - Strips any HTML tags or <rt> furigana annotations before speaking
 * - Automatically finds Japanese voice (ja-JP)
 * - Reads user speech rate preference from localStorage if set
 */
export function playJapaneseAudio(text: string, customRate?: number) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    
    // Strip HTML and <rt> tags cleanly so TTS only pronounces the pure kanji/hiragana
    let cleanText = text
      .replace(/<rt[\s\S]*?<\/rt>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/[{}\[\]|]/g, '')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ja-JP';

    const savedRate = localStorage.getItem('n3_speech_rate');
    const rateVal = customRate || (savedRate ? parseFloat(savedRate) : 0.85);
    utterance.rate = isNaN(rateVal) ? 0.85 : Math.max(0.5, Math.min(1.5, rateVal));

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(v => v.lang === 'ja-JP' || v.lang.startsWith('ja') || v.name.toLowerCase().includes('japan'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
  }
}
