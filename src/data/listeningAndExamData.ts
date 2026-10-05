import { ExamMock } from '../types';

export const INITIAL_N3_EXAMS: ExamMock[] = [
  {
    id: 'exam-2023-1',
    title: 'Đề thi Thử Chuẩn JLPT N3 - Đợt 1',
    year: '2023 Kỳ 1',
    totalTimeMinutes: 45,
    questions: [
      // 1. Chữ Hán - Từ Vựng
      {
        id: 'ex-v-1',
        section: 'Chữ Hán - Từ Vựng',
        questionJa: '問題１：下線の言葉の読み方として最もよいものを、１・２・３・４から一つ選びなさい。\nその意見には賛成しかねます。',
        questionFurigana: '<ruby>問題<rt>もんだい</rt></ruby>１：<ruby>下線<rt>かせん</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>の<ruby>読<rt>よ</rt></ruby>み<ruby>方<rt>かた</rt></ruby>として<ruby>最<rt>もっと</rt></ruby>もよいものを、１・２・３・４から<ruby>一<rt>ひと</rt></ruby>つ<ruby>選<rt>えら</rt></ruby>びなさい。\nその<ruby>意見<rt>いけん</rt></ruby>には<ruby>賛成<rt>さんせい</rt></ruby>しかねます。',
        options: [
          { textJa: 'さんせい', textFurigana: 'さんせい' },
          { textJa: 'さんしょう', textFurigana: 'さんしょう' },
          { textJa: 'しんせい', textFurigana: 'しんせい' },
          { textJa: 'ざんせい', textFurigana: 'ざんせい' },
        ],
        correctIndex: 0,
        explanationVi: 'Giải thích chi tiết: Chữ Hán 「賛成」 có âm đọc On-yomi chuẩn là 「さんせい」 (Tán thành, đồng ý). Đáp án đúng là 1.',
      },
      {
        id: 'ex-v-2',
        section: 'Chữ Hán - Từ Vựng',
        questionJa: '問題２：下線の言葉を漢字で書くとき、最もよいものを一つ選びなさい。\n駅前で昔の友達をみかけた。',
        questionFurigana: '<ruby>問題<rt>もんだい</rt></ruby>２：<ruby>下線<rt>かせん</rt></ruby>の<ruby>言葉<rt>ことば</rt></ruby>を<ruby>漢字<rt>かんじ</rt></ruby>で<ruby>書<rt>か</rt></ruby>くとき、<ruby>最<rt>もっと</rt></ruby>もよいものを<ruby>一<rt>ひと</rt></ruby>つ<ruby>選<rt>えら</rt></ruby>びなさい。\n<ruby>駅前<rt>えきまえ</rt></ruby>で<ruby>昔<rt>むかし</rt></ruby>の<ruby>友達<rt>ともだち</rt></ruby>をみかけた。',
        options: [
          { textJa: '見掛けた', textFurigana: '<ruby>見掛<rt>みか</rt></ruby>けた' },
          { textJa: '観掛けた', textFurigana: '<ruby>観掛<rt>みか</rt></ruby>けた' },
          { textJa: '見付けた', textFurigana: '<ruby>見付<rt>みつ</rt></ruby>けた' },
          { textJa: '視掛けた', textFurigana: '<ruby>視掛<rt>みか</rt></ruby>けた' },
        ],
        correctIndex: 0,
        explanationVi: 'Giải thích chi tiết: 「みかける」 viết bằng chữ Hán chuẩn là 「見掛ける」 (bắt gặp, tình cờ trông thấy). 「見付ける」 đọc là mitsukeru (tìm thấy). Vì vậy đáp án 1 là chính xác.',
      },

      // 2. Ngữ Pháp
      {
        id: 'ex-g-1',
        section: 'Ngữ Pháp',
        questionJa: '問題３：次の文の（　　）に入れるのに最もよいものを一つ選びなさい。\n天気予報（　　）、明日は全国的に大雨になるそうです。',
        questionFurigana: '<ruby>問題<rt>もんだい</rt></ruby>３：<ruby>次<rt>つぎ</rt></ruby>の<ruby>文<rt>ぶん</rt></ruby>の（　　）に<ruby>入<rt>い</rt></ruby>れるのに<ruby>最<rt>もっと</rt></ruby>もよいものを<ruby>一<rt>ひと</rt></ruby>つ<ruby>選<rt>えら</rt></ruby>びなさい。\n<ruby>天気<rt>てんき</rt></ruby><ruby>予報<rt>よほう</rt></ruby>（　　）、<ruby>明日<rt>あした</rt></ruby>は<ruby>全国的<rt>ぜんこくてき</rt></ruby>に<ruby>大雨<rt>おおあめ</rt></ruby>になるそうです。',
        options: [
          { textJa: 'によると', textFurigana: 'によると' },
          { textJa: 'について', textFurigana: 'について' },
          { textJa: 'に対して', textFurigana: 'に<ruby>対<rt>たい</rt></ruby>して' },
          { textJa: 'によって', textFurigana: 'によって' },
        ],
        correctIndex: 0,
        explanationVi: 'Giải thích chi tiết: Mẫu câu N + によると/によれば đi với đuôi câu truyền đạt 〜そうだ / 〜ということだ (Theo như nguồn tin N thì...). Do đó đáp án đúng là 1 (によると).',
      },

      // 3. Đọc Hiểu
      {
        id: 'ex-r-1',
        section: 'Đọc Hiểu',
        questionJa: '次の文章を読んで、後の問いに対する答えとして最もよいものを一つ選びなさい。\n人間は失敗することで多くのことを学ぶ。失敗を恐れて何もしない人間よりも、果敢に挑戦して失敗した人間のほうがずっと価値のある経験を積んでいるのだ。\n問い：筆者が最も伝えたいことは何か。',
        questionFurigana: '<ruby>次<rt>つぎ</rt></ruby>の<ruby>文章<rt>ぶんしょう</rt></ruby>を<ruby>読<rt>よ</rt></ruby>んで、<ruby>後<rt>あと</rt></ruby>の<ruby>問<rt>と</rt></ruby>いに対する<ruby>答<rt>こた</rt></ruby>えとして<ruby>最<rt>もっと</rt></ruby>もよいものを<ruby>一<rt>ひと</rt></ruby>つ<ruby>選<rt>えら</rt></ruby>びなさい。\n<ruby>人間<rt>にんげん</rt></ruby>は<ruby>失敗<rt>しっぱい</rt></ruby>することで<ruby>多<rt>おお</rt></ruby>くのことを<ruby>学<rt>まな</rt></ruby>ぶ。<ruby>失敗<rt>しっぱい</rt></ruby>を<ruby>恐<rt>おそ</rt></ruby>れて<ruby>何<rt>なに</rt></ruby>もしない<ruby>人間<rt>にんげん</rt></ruby>よりも、<ruby>果敢<rt>かかん</rt></ruby>に<ruby>挑戦<rt>ちょうせん</rt></ruby>して<ruby>失敗<rt>しっぱい</rt></ruby>した<ruby>人間<rt>にんげん</rt></ruby>のほうがずっと<ruby>価値<rt>かち</rt></ruby>のある<ruby>経験<rt>けいけん</rt></ruby>を<ruby>積<rt>つ</rt></ruby>んでいるのだ。\n<ruby>問<rt>と</rt></ruby>い：<ruby>筆者<rt>ひっしゃ</rt></ruby>が<ruby>最<rt>もっと</rt></ruby>も<ruby>伝<rt>つた</rt></ruby>えたいことは<ruby>何<rt>なに</rt></ruby>か。',
        options: [
          { textJa: '失敗することは絶対に避けるべきである', textFurigana: '<ruby>失敗<rt>しっぱい</rt></ruby>することは<ruby>絶対<rt>ぜったい</rt></ruby>に<ruby>避<rt>さ</rt></ruby>けるべきである' },
          { textJa: '失敗を恐れずに挑戦して経験を積むことが大切である', textFurigana: '<ruby>失敗<rt>しっぱい</rt></ruby>を<ruby>恐<rt>おそ</rt></ruby>れずに<ruby>挑戦<rt>ちょうせん</rt></ruby>して<ruby>経験<rt>けいけん</rt></ruby>を<ruby>積<rt>つ</rt></ruby>むことが<ruby>大切<rt>たいせつ</rt></ruby>である' },
          { textJa: '何もしないほうが安全で賢い生き方である', textFurigana: '<ruby>何<rt>なに</rt></ruby>もしないほうが<ruby>安全<rt>あんぜん</rt></ruby>で<ruby>賢<rt>かしこ</rt></ruby>い<ruby>生<rt>い</rt></ruby>き<ruby>方<rt>かた</rt></ruby>である' },
          { textJa: '勉強さえすれば失敗はしなくなる', textFurigana: '<ruby>勉強<rt>べんきょう</rt></ruby>さえすれば<ruby>失敗<rt>しっぱい</rt></ruby>はしなくなる' },
        ],
        correctIndex: 1,
        explanationVi: 'Giải thích chi tiết: Tác giả nhấn mạnh việc dám dũng cảm thử thách dù thất bại còn tích lũy được nhiều kinh nghiệm quý giá hơn người sợ hãi không dám làm gì. Do đó đáp án đúng là câu 2.',
      },

      // 4. Nghe Hiểu (Choukai) - 100% TIẾNG NHẬT
      {
        id: 'ex-l-1',
        section: 'Nghe Hiểu (Choukai)',
        audioScriptJa: '男の人と女の人が会社で話しています。女の人はこれからまず何をしなければなりませんか。\n男：田中さん、昨日の会議の議事録はもう作成できましたか。\n女：はい、下書きは完成しております。\n男：じゃあ、課長に提出する前に、一度私が目を通しますから、先に私のパソコンへメールで送ってください。\n女：かしこまりました。今すぐ送信いたします。\n質問：女の人はこれからまず何をしますか。',
        audioScriptFurigana: '<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>と<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>が<ruby>会社<rt>かいしゃ</rt></ruby>で<ruby>話<rt>はな</rt></ruby>しています。<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>はこれからまず<ruby>何<rt>なに</rt></ruby>をしなければなりませんか。\n<ruby>男<rt>おとこ</rt></ruby>：<ruby>田中<rt>たなか</rt></ruby>さん、<ruby>昨日<rt>きのう</rt></ruby>の<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>議事録<rt>ぎじろく</rt></ruby>はもう<ruby>作成<rt>さくせい</rt></ruby>できましたか。\n<ruby>女<rt>おんな</rt></ruby>：はい、<ruby>下書<rt>したが</rt></ruby>きは<ruby>完成<rt>かんせい</rt></ruby>しております。\n<ruby>男<rt>おとこ</rt></ruby>：じゃあ、<ruby>課長<rt>かちょう</rt></ruby>に<ruby>提出<rt>ていしゅつ</rt></ruby>する<ruby>前<rt>まえ</rt></ruby>に、<ruby>一度<rt>いちど</rt></ruby><ruby>私<rt>わたし</rt></ruby>が<ruby>目<rt>め</rt></ruby>を<ruby>通<rt>とお</rt></ruby>しますから、<ruby>先<rt>さき</rt></ruby>に<ruby>私<rt>わたし</rt></ruby>のパソコンへメールで<ruby>送<rt>おく</rt></ruby>ってください。\n<ruby>女<rt>おんな</rt></ruby>：かしこまりました。<ruby>今<rt>いま</rt></ruby>すぐ<ruby>送信<rt>そうしん</rt></ruby>いたします。\n<ruby>質問<rt>しつもん</rt></ruby>：<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>はこれからまず<ruby>何<rt>なに</rt></ruby>をしますか。',
        questionJa: '【聴解・課題理解】女の人はこれからまず何をしますか。',
        questionFurigana: '【<ruby>聴解<rt>ちょうかい</rt></ruby>・<ruby>課題<rt>かだい</rt></ruby><ruby>理解<rt>りかい</rt></ruby>】<ruby>女<rt>おんな</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>はこれからまず<ruby>何<rt>なに</rt></ruby>をしますか。',
        options: [
          { textJa: '１．課長に議事録を提出する', textFurigana: '１．<ruby>課長<rt>かちょう</rt></ruby>に<ruby>議事録<rt>ぎじろく</rt></ruby>を<ruby>提出<rt>ていしゅつ</rt></ruby>する' },
          { textJa: '２．男の人のパソコンにメールで下書きを送る', textFurigana: '２．<ruby>男<rt>おとこ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>のパソコンにメールで<ruby>下書<rt>したが</rt></ruby>きを<ruby>送<rt>おく</rt></ruby>る' },
          { textJa: '３．もう一度会議のメモを書き直す', textFurigana: '３．もう<ruby>一度<rt>いちど</rt></ruby><ruby>会議<rt>かいぎ</rt></ruby>のメモを<ruby>書<rt>か</rt></ruby>き<ruby>直<rt>なお</rt></ruby>す' },
          { textJa: '４．明日の会議の準備をする', textFurigana: '４．<ruby>明日<rt>あした</rt></ruby>の<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>準備<rt>じゅんび</rt></ruby>をする' },
        ],
        correctIndex: 1,
        explanationVi: 'Giải thích chi tiết bài nghe: Người nam dặn "課長に提出する前に、一度私が目を通しますから、先に私のパソコンへメールで送ってください" (Trước khi nộp cho Trưởng nhóm, tôi sẽ xem qua một lượt nên trước hết hãy gửi email vào máy tính cho tôi). Người nữ trả lời "今すぐ送信いたします" (Tôi sẽ gửi ngay bây giờ). Do đó hành động đầu tiên của người nữ là gửi bản thảo qua email cho người nam (đáp án 2).',
      },
      {
        id: 'ex-l-2',
        section: 'Nghe Hiểu (Choukai)',
        audioScriptJa: '大学で留学生と先生が話しています。留学生は来週、何を持ってこなければなりませんか。\n先生：アインさん、来週の月曜日に奨学金の面接がありますね。\n学生：はい、準備しています。\n先生：申請書はすでに提出してもらいましたが、当日は在留カードと学生証の両方を必ず持ってきてください。印鑑は今回必要ありません。\n学生：分かりました。在留カードと学生証ですね。\n質問：留学生は来週、何を持ってこなければなりませんか。',
        audioScriptFurigana: '<ruby>大学<rt>だいがく</rt></ruby>で<ruby>留学生<rt>りゅうがくせい</rt></ruby>と<ruby>先生<rt>せんせい</rt></ruby>が<ruby>話<rt>はな</rt></ruby>しています。<ruby>留学生<rt>りゅうがくせい</rt></ruby>は<ruby>来週<rt>らいしゅう</rt></ruby>、<ruby>何<rt>なに</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってこなければなりませんか。\n<ruby>先生<rt>せんせい</rt></ruby>：アインさん、<ruby>来週<rt>らいしゅう</rt></ruby>の<ruby>月曜日<rt>げつようび</rt></ruby>に<ruby>奨学金<rt>しょうがくきん</rt></ruby>の<ruby>面接<rt>めんせつ</rt></ruby>がありますね。\n<ruby>学生<rt>がくせい</rt></ruby>：はい、<ruby>準備<rt>じゅんび</rt></ruby>しています。\n<ruby>先生<rt>せんせい</rt></ruby>：<ruby>申請書<rt>しんせいしょ</rt></ruby>はすでに<ruby>提出<rt>ていしゅつ</rt></ruby>してもらいましたが、<ruby>当日<rt>とうじつ</rt></ruby>は<ruby>在留<rt>ざいりゅう</rt></ruby>カードと<ruby>学生証<rt>がくせいしょう</rt></ruby>の<ruby>両方<rt>りょうほう</rt></ruby>を<ruby>必<rt>かなら</rt></ruby>ず<ruby>持<rt>も</rt></ruby>ってきてください。<ruby>印鑑<rt>いんかん</rt></ruby>は<ruby>今回<rt>こんかい</rt></ruby><ruby>必要<rt>ひつよう</rt></ruby>ありません。\n<ruby>学生<rt>がくせい</rt></ruby>：<ruby>分<rt>わ</rt></ruby>かりました。<ruby>在留<rt>ざいりゅう</rt></ruby>カードと<ruby>学生証<rt>がくせいしょう</rt></ruby>ですね。\n<ruby>質問<rt>しつもん</rt></ruby>：<ruby>留学生<rt>りゅうがくせい</rt></ruby>は<ruby>来週<rt>らいしゅう</rt></ruby>、<ruby>何<rt>なに</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってこなければなりませんか。',
        questionJa: '【聴解・ポイント理解】留学生は来週、何を持ってこなければなりませんか。',
        questionFurigana: '【<ruby>聴解<rt>ちょうかい</rt></ruby>・ポイント<ruby>理解<rt>りかい</rt></ruby>】<ruby>留学生<rt>りゅうがくせい</rt></ruby>は<ruby>来週<rt>らいしゅう</rt></ruby>、<ruby>何<rt>なに</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってこなければなりませんか。',
        options: [
          { textJa: '１．申請書と印鑑', textFurigana: '１．<ruby>申請書<rt>しんせいしょ</rt></ruby>と<ruby>印鑑<rt>いんかん</rt></ruby>' },
          { textJa: '２．在留カードと学生証', textFurigana: '２．<ruby>在留<rt>ざいりゅう</rt></ruby>カードと<ruby>学生証<rt>がくせいしょう</rt></ruby>' },
          { textJa: '３．学生証と印鑑', textFurigana: '３．<ruby>学生証<rt>がくせいしょう</rt></ruby>と<ruby>印鑑<rt>いんかん</rt></ruby>' },
          { textJa: '４．在留カードのみ', textFurigana: '４．<ruby>在留<rt>ざいりゅう</rt></ruby>カードのみ' },
        ],
        correctIndex: 1,
        explanationVi: 'Giải thích chi tiết: Thầy giáo nói rõ: "申請書はすでに提出してもらいましたが、当日は在留カードと学生証の両方を必ず持ってきてください。印鑑は今回必要ありません" (Đơn đăng ký thì đã nộp rồi, ngày thi hãy nhớ mang theo CẢ HAI là Thẻ cư trú và Thẻ sinh viên. Con dấu lần này không cần thiết). Vì vậy đáp án đúng là 2.',
      },
    ],
  },
];
