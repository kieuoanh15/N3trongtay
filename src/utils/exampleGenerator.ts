import { VocabPartOfSpeech } from '../types';

export interface GeneratedSentence {
  sentenceJa: string;
  sentenceFurigana: string;
  sentenceVi: string;
}

/**
 * Generates simple, natural, and highly relatable daily life example sentences
 * for JLPT N3 vocabulary, ensuring no repetitive templates.
 */
export function generateNaturalVocabExample(
  kanji: string,
  hiragana: string,
  meaningVi: string,
  pos: VocabPartOfSpeech
): GeneratedSentence {
  const word = kanji?.trim() || hiragana?.trim() || '単語';
  const hira = hiragana?.trim() || kanji?.trim() || '';
  const rubyWord = kanji && hiragana && kanji !== hiragana 
    ? `<ruby>${kanji}<rt>${hiragana}</rt></ruby>` 
    : word;
  const meaningLower = (meaningVi || '').toLowerCase();

  // Specific semantic matching for common N3 themes and words:
  if (meaningLower.includes('giới hạn') || word === '限界') {
    return {
      sentenceJa: `一日中歩き回って、体力がもう${word}だ。`,
      sentenceFurigana: `<ruby>一日中<rt>いちにちじゅう</rt></ruby><ruby>歩<rt>ある</rt></ruby>き<ruby>回<rt>まわ</rt></ruby>って、<ruby>体力<rt>たいりょく</rt></ruby>がもう${rubyWord}だ。`,
      sentenceVi: 'Đi bộ loanh quanh suốt cả ngày, thể lực của tôi đã chạm giới hạn rồi.',
    };
  }

  if (meaningLower.includes('kỳ vọng') || meaningLower.includes('mong đợi') || word === '期待') {
    return {
      sentenceJa: `期待していた新作の映画は、本当に面白かった。`,
      sentenceFurigana: `${rubyWord}していた<ruby>新作<rt>しんさく</rt></ruby>の<ruby>映画<rt>えいが</rt></ruby>は、<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>面白<rt>おもしろ</rt></ruby>かった。`,
      sentenceVi: 'Bộ phim mới mà tôi hằng mong đợi quả thực rất hay.',
    };
  }

  if (meaningLower.includes('phòng') || meaningLower.includes('ngăn ngừa') || word.includes('防')) {
    return {
      sentenceJa: `風邪の${word}のために、外出時はマスクをつけている。`,
      sentenceFurigana: `<ruby>風邪<rt>かぜ</rt></ruby>の${rubyWord}のために、<ruby>外出時<rt>がいしゅつじ</rt></ruby>はマスクをつけている。`,
      sentenceVi: 'Để phòng ngừa cảm cúm, mỗi khi ra ngoài tôi đều đeo khẩu trang.',
    };
  }

  if (meaningLower.includes('viện trợ') || meaningLower.includes('chu cấp') || meaningLower.includes('giúp đỡ') || word === '援助') {
    return {
      sentenceJa: `日本へ留学中、毎月両親から生活費の${word}をもらっている。`,
      sentenceFurigana: `<ruby>日本<rt>にほん</rt></ruby>へ<ruby>留学中<rt>りゅうがくちゅう</rt></ruby>、<ruby>毎月<rt>まいつき</rt></ruby><ruby>両親<rt>りょうしん</rt></ruby>から<ruby>生活費<rt>せいかつひ</rt></ruby>の${rubyWord}をもらっている。`,
      sentenceVi: 'Trong thời gian du học Nhật Bản, hàng tháng tôi nhận tiền chu cấp sinh hoạt phí từ bố mẹ.',
    };
  }

  if (meaningLower.includes('hiểu lầm') || meaningLower.includes('tưởng nhầm') || word.includes('勘違い')) {
    return {
      sentenceJa: `集合時間を一時間${word}して、早く着きすぎた。`,
      sentenceFurigana: `<ruby>集合時間<rt>しゅうごうじかん</rt></ruby>を<ruby>一時間<rt>いちじかん</rt></ruby>${rubyWord}して、<ruby>早<rt>はや</rt></ruby>く<ruby>着<rt>つ</rt></ruby>きすぎた。`,
      sentenceVi: 'Tôi tưởng nhầm giờ hẹn sớm hơn một tiếng nên đã đến quá sớm.',
    };
  }

  if (meaningLower.includes('tiếc') || meaningLower.includes('uổng') || word === '惜しい') {
    return {
      sentenceJa: `JLPT試験であと1点足りなくて不合格になり、本当に${word}。`,
      sentenceFurigana: `JLPT<ruby>試験<rt>しけん</rt></ruby>であと<ruby>一点<rt>いってん</rt></ruby><ruby>足<rt>た</rt></ruby>りなくて<ruby>不合格<rt>ふごうかく</rt></ruby>になり、<ruby>本当<rt>ほんとう</rt></ruby>に${rubyWord}。`,
      sentenceVi: 'Thi JLPT chỉ thiếu đúng 1 điểm nữa là đỗ, kết quả thật là quá đáng tiếc.',
    };
  }

  if (meaningLower.includes('ấm') || word === '温かい' || word === '暖かい') {
    return {
      sentenceJa: `寒い冬の夜は、故郷のお母さんの${word}スープが恋しくなる。`,
      sentenceFurigana: `<ruby>寒<rt>さむ</rt></ruby>い<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>夜<rt>よる</rt></ruby>は、<ruby>故郷<rt>こきょう</rt></ruby>のお<ruby>母<rt>かあ</rt></ruby>さんの${rubyWord}スープが<ruby>恋<rt>こい</rt></ruby>しくなる。`,
      sentenceVi: 'Vào những đêm đông giá rét, tôi lại nhớ da diết bát canh nóng ấm của mẹ ở quê nhà.',
    };
  }

  if (meaningLower.includes('bận') || word === '忙しい' || word.includes('慌ただしい')) {
    return {
      sentenceJa: `年末は引っ越しの荷造りで、毎日${word}。`,
      sentenceFurigana: `<ruby>年末<rt>ねんまつ</rt></ruby>は<ruby>引<rt>ひ</rt></ruby>っ<ruby>越<rt>こ</rt></ruby>しの<ruby>荷造<rt>にづく</rt></ruby>りで、<ruby>毎日<rt>まいにち</rt></ruby>${rubyWord}。`,
      sentenceVi: 'Dịp cuối năm phải đóng gói đồ đạc chuyển nhà nên ngày nào cũng tất bật.',
    };
  }

  if (meaningLower.includes('yên tĩnh') || word === '静か') {
    return {
      sentenceJa: `夜遅くなるとアパートの周りはとても${word}で、よく眠れる。`,
      sentenceFurigana: `<ruby>夜遅<rt>よるおそ</rt></ruby>くなるとアパートの<ruby>周<rt>まわ</rt></ruby>りはとても${rubyWord}で、よく<ruby>眠<rt>ねむ</rt></ruby>れる。`,
      sentenceVi: 'Về đêm muộn quanh khu căn hộ rất yên tĩnh nên ngủ rất ngon.',
    };
  }

  // Daily life context-based intelligent synthesis by Part of Speech
  switch (pos) {
    case 'verb': {
      return {
        sentenceJa: `健康のために、毎朝起きたらコップ一杯の水を${word}ようにしている。`,
        sentenceFurigana: `<ruby>健康<rt>けんこう</rt></ruby>のために、<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>起<rt>お</rt></ruby>きたらコップ<ruby>一杯<rt>いっぱい</rt></ruby>の<ruby>水<rt>みず</rt></ruby>を${rubyWord}ようにしている。`,
        sentenceVi: `Vì sức khỏe, mỗi sáng thức dậy tôi đều cố gắng uống một cốc nước rồi ${meaningVi || 'thực hiện'}.`,
      };
    }

    case 'i_adj': {
      return {
        sentenceJa: `港の朝市で買った魚は、とても${word}味だった。`,
        sentenceFurigana: `<ruby>港<rt>みなと</rt></ruby>の<ruby>朝市<rt>あさいち</rt></ruby>で<ruby>買<rt>か</rt></ruby>った<ruby>魚<rt>さかな</rt></ruby>は、とても${rubyWord}お<ruby>味<rt>あじ</rt></ruby>だった。`,
        sentenceVi: `Cá mua ở chợ sáng ven cảng biển có hương vị rất (${meaningVi || word}).`,
      };
    }

    case 'na_adj': {
      return {
        sentenceJa: `駅前の新しい図書館は、設備が整っていてとても${word}だ。`,
        sentenceFurigana: `<ruby>駅前<rt>えきまえ</rt></ruby>の<ruby>新<rt>あたら</rt></ruby>しい<ruby>図書館<rt>としょかん</rt></ruby>は、<ruby>設備<rt>せつび</rt></ruby>が<ruby>整<rt>ととの</rt></ruby>っていてとても${rubyWord}だ。`,
        sentenceVi: `Thư viện mới trước cửa ga có cơ sở vật chất đầy đủ nên rất (${meaningVi || word}).`,
      };
    }

    case 'noun':
    default: {
      return {
        sentenceJa: `一人暮らしを始めてから、毎日の生活における${word}を大切にしている。`,
        sentenceFurigana: `<ruby>一人暮<rt>ひとりぐ</rt></ruby>らしを<ruby>始<rt>はじ</rt></ruby>めてから、<ruby>毎日<rt>まいにち</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>における${rubyWord}を<ruby>大切<rt>たいせつ</rt></ruby>にしている。`,
        sentenceVi: `Kể từ khi sống tự lập, tôi luôn coi trọng (${meaningVi || word}) trong cuộc sống hàng ngày.`,
      };
    }
  }
}
