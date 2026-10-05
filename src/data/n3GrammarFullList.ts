import { GrammarItem } from '../types';

export const EXTRA_N3_GRAMMAR: GrammarItem[] = [
  // 11. Nhóm: Cảm xúc / Đánh giá & Phán đoán tiếp theo
  {
    id: 'gram-46',
    title: '〜に違いない',
    titleFurigana: '〜に<ruby>違<rt>ちが</rt></ruby>いない',
    formula: 'Thể thông thường / N / A-na + に違いない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Chắc chắn là, không thể sai được...',
    explanationVi: 'Khẳng định niềm tin chắc chắn 90-99% của người nói dựa trên trực giác hoặc chứng cứ.',
    examples: [
      {
        ja: '夜遅くまで電気がついているから、彼はまだ勉強しているに違いない。',
        furigana: '<ruby>夜遅<rt>よるおそ</rt></ruby>くまで<ruby>電気<rt>でんき</rt></ruby>がついているから、<ruby>彼<rt>かれ</rt></ruby>はまだ<ruby>勉強<rt>べんきょう</rt></ruby>しているに<ruby>違<rt>ちが</rt></ruby>いない。',
        vi: 'Đèn phòng vẫn sáng đến khuya thế kia, chắc chắn anh ấy vẫn còn đang học.',
      },
      {
        ja: '犯人は現場の鍵を持っていた人物に違いない。',
        furigana: '<ruby>犯人<rt>はんにん</rt></ruby>は<ruby>現場<rt>げんば</rt></ruby>の<ruby>鍵<rt>かぎ</rt></ruby>を<ruby>持<rt>も</rt></ruby>っていた<ruby>人物<rt>じんぶつ</rt></ruby>に<ruby>違<rt>ちが</rt></ruby>いない。',
        vi: 'Thủ phạm chắc chắn là người nắm giữ chìa khóa hiện trường.',
      },
      {
        ja: 'こんなに美味しい料理を作れるのは彼女に違いない。',
        furigana: 'こんなに<ruby>美味<rt>おい</rt></ruby>しい<ruby>料理<rt>りょうり</rt></ruby>を<ruby>作<rt>つく</rt></ruby>れるのは<ruby>彼女<rt>かのじょ</rt></ruby>に<ruby>違<rt>ちが</rt></ruby>いない。',
        vi: 'Nấu được món ăn ngon đến thế này chắc chắn chỉ có thể là cô ấy.',
      },
    ],
  },
  {
    id: 'gram-47',
    title: '〜かもしれない',
    titleFurigana: '〜かもしれない',
    formula: 'Thể thông thường / N / A-na + かもしれない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Có lẽ là, có thể là...',
    explanationVi: 'Phán đoán khả năng xảy ra khoảng 50%, người nói không hoàn toàn đoan chắc.',
    examples: [
      {
        ja: '午後は天気が崩れて雨が降るかもしれない。',
        furigana: '<ruby>午後<rt>ごご</rt></ruby>は<ruby>天気<rt>てんき</rt></ruby>が<ruby>崩<rt>くず</rt></ruby>れて<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>るかもしれない。',
        vi: 'Chiều nay thời tiết có thể chuyển biến xấu và đổ mưa.',
      },
      {
        ja: '約束の時間に少し遅れるかもしれません。',
        furigana: '<ruby>約束<rt>やくそく</rt></ruby>の<ruby>時間<rt>じかん</rt></ruby>に<ruby>少<rt>すこ</rt></ruby>し<ruby>遅<rt>おく</rt></ruby>れるかもしれません。',
        vi: 'Có lẽ tôi sẽ đến trễ giờ hẹn một chút.',
      },
      {
        ja: 'この機械は故障しているかもしれないので触らないでください。',
        furigana: 'この<ruby>機械<rt>きかい</rt></ruby>は<ruby>故障<rt>こしょう</rt></ruby>しているかもしれないので<ruby>触<rt>さわ</rt></ruby>らないでください。',
        vi: 'Chiếc máy này có thể đang bị hỏng nên xin đừng chạm vào.',
      },
    ],
  },
  {
    id: 'gram-48',
    title: '〜かねない',
    titleFurigana: '〜かねない',
    formula: 'V-masu (bỏ masu) + かねない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Có thể dẫn đến kết quả xấu, có nguy cơ...',
    explanationVi: 'Dự báo hành động đó rất có khả năng gây ra tai họa hoặc rủi ro tiêu cực.',
    examples: [
      {
        ja: 'スピードを出しすぎると、大事故を起こしかねない。',
        furigana: 'スピードを<ruby>出<rt>だ</rt></ruby>しすぎると、<ruby>大事故<rt>だいじこ</rt></ruby>を<ruby>起<rt>お</rt></ruby>こしかねない。',
        vi: 'Nếu phóng xe quá tốc độ thì rất dễ gây ra tai nạn thảm khốc.',
      },
      {
        ja: 'そんな暴言を吐いたら、相手を怒らせかねない。',
        furigana: 'そんな<ruby>暴言<rt>ぼうげん</rt></ruby>を<ruby>吐<rt>は</rt></ruby>いたら、<ruby>相手<rt>あいて</rt></ruby>を<ruby>怒<rt>おこ</rt></ruby>らせかねない。',
        vi: 'Nếu ăn nói lỗ mãng như thế thì hoàn toàn có nguy cơ làm đối phương nổi đóa.',
      },
      {
        ja: 'このまま放置すると、事態が悪化しかねません。',
        furigana: 'このまま<ruby>放置<rt>ほうち</rt></ruby>すると、<ruby>事態<rt>じたい</rt></ruby>が<ruby>悪化<rt>あっか</rt></ruby>しかねません。',
        vi: 'Nếu cứ mặc kệ để thế này thì tình hình có nguy cơ chuyển biến xấu hơn.',
      },
    ],
  },
  {
    id: 'gram-49',
    title: '〜かねる',
    titleFurigana: '〜かねる',
    formula: 'V-masu (bỏ masu) + かねる',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Khó lòng, không thể... (từ chối lịch sự)',
    explanationVi: 'Dùng trong môi trường kinh doanh trang trọng để từ chối khéo léo một yêu cầu.',
    examples: [
      {
        ja: 'そのご提案には賛成しかねます。',
        furigana: 'そのご<ruby>提案<rt>ていあん</rt></ruby>には<ruby>賛成<rt>さんせい</rt></ruby>しかねます。',
        vi: 'Đề xuất đó tôi thật khó lòng tán thành được.',
      },
      {
        ja: '個人情報に関することは、お答えしかねます。',
        furigana: '<ruby>個人情報<rt>こじんじょうほう</rt></ruby>に<ruby>関<rt>かん</rt></ruby>することは、お<ruby>答<rt>こた</rt></ruby>えしかねます。',
        vi: 'Những việc liên quan đến thông tin cá nhân thì chúng tôi không thể giải đáp được.',
      },
      {
        ja: '見かねて手伝いを買って出た。',
        furigana: '<ruby>見<rt>み</rt></ruby>かねて<ruby>手伝<rt>てつだ</rt></ruby>いを<ruby>買<rt>か</rt></ruby>って<ruby>出<rt>で</rt></ruby>た。',
        vi: 'Thấy cảnh tượng chật vật không nỡ đứng nhìn nên tôi đã xung phong giúp một tay.',
      },
    ],
  },
  {
    id: 'gram-50',
    title: '〜っこない',
    titleFurigana: '〜っこない',
    formula: 'V-masu (bỏ masu) + っこない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Tuyệt đối không thể nào... (văn nói thân mật)',
    explanationVi: 'Phủ định quyết liệt khả năng của một sự việc dựa trên đánh giá cá nhân trong hội thoại hàng ngày.',
    examples: [
      {
        ja: '一日でこの分厚い本を全部読めっこないよ。',
        furigana: '<ruby>一日<rt>いちにち</rt></ruby>でこの<ruby>分厚<rt>ぶあつ</rt></ruby>い<ruby>本<rt>ほん</rt></ruby>を<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>読<rt>よ</rt></ruby>めっこないよ。',
        vi: 'Làm sao mà trong một ngày đọc hết nổi cuốn sách dày cộp thế này được chứ.',
      },
      {
        ja: 'あんな強い相手に勝てっこない。',
        furigana: 'あんな<ruby>強<rt>つよ</rt></ruby>い<ruby>相手<rt>あいて</rt></ruby>に<ruby>勝<rt>か</rt></ruby>てっこない。',
        vi: 'Làm sao mà thắng nổi đối thủ mạnh nhường ấy cơ chứ.',
      },
      {
        ja: '今から走っても、終電に間に合いっこない。',
        furigana: '<ruby>今<rt>いま</rt></ruby>から<ruby>走<rt>はし</rt></ruby>っても、<ruby>終電<rt>しゅうでん</rt></ruby>に<ruby>間<rt>ま</rt></ruby>に<ruby>合<rt>あ</rt></ruby>いっこない。',
        vi: 'Giờ này có cắm đầu chạy cũng không tài nào kịp chuyến tàu cuối đâu.',
      },
    ],
  },

  // 12. Nhóm: Phủ định - Nhượng bộ & Đối lập (51 - 65)
  {
    id: 'gram-51',
    title: '〜わけではない / 〜わけじゃない',
    titleFurigana: '〜わけではない / 〜わけじゃない',
    formula: 'Thể thông thường (A-na な, N な/である) + わけではない',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Không hẳn là, không có nghĩa là...',
    explanationVi: 'Phủ định một phần, đính chính lại sự hiểu lầm của đối phương.',
    examples: [
      {
        ja: '日本料理が嫌いなわけではないが、納豆は苦手だ。',
        furigana: '<ruby>日本料理<rt>にほんりょうり</rt></ruby>が<ruby>嫌<rt>きら</rt></ruby>いなわけではないが、<ruby>納豆<rt>なっとう</rt></ruby>は<ruby>苦手<rt>にがて</rt></ruby>だ。',
        vi: 'Không hẳn là tôi ghét món Nhật, chỉ là tôi không nuốt nổi món Natto.',
      },
      {
        ja: 'お金があれば幸せになれるというわけではない。',
        furigana: 'お<ruby>金<rt>かね</rt></ruby>があれば<ruby>幸<rt>しあわ</rt></ruby>せになれるというわけではない。',
        vi: 'Không có nghĩa là cứ có nhiều tiền thì ắt sẽ hạnh phúc.',
      },
      {
        ja: '暇なわけではないが、少しなら手伝えるよ。',
        furigana: '<ruby>暇<rt>ひま</rt></ruby>なわけではないが、<ruby>少<rt>すこ</rt></ruby>しなら<ruby>手伝<rt>てつだ</rt></ruby>えるよ。',
        vi: 'Không hẳn là tôi rảnh rỗi đâu, nhưng nếu chút ít thì tôi có thể giúp được.',
      },
    ],
  },
  {
    id: 'gram-52',
    title: '〜どころか',
    titleFurigana: '〜どころか',
    formula: 'Thể thông thường / N / A-na + どころか',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Nói gì đến..., Đâu chỉ có thế, trái lại còn...',
    explanationVi: 'Thực tế không những không đạt được điều nhỏ mà còn xảy ra điều hoàn toàn ngược lại hoặc tồi tệ hơn.',
    examples: [
      {
        ja: '貯金どころか、借金までしてしまった。',
        furigana: '<ruby>貯金<rt>ちょきん</rt></ruby>どころか、<ruby>借金<rt>しゃっきん</rt></ruby>までしてしまった。',
        vi: 'Tiết kiệm đâu chẳng thấy, trái lại tôi còn vướng vào nợ nần.',
      },
      {
        ja: '喉が痛くて、ご飯を食べるどころか水も飲めない。',
        furigana: '<ruby>喉<rt>のど</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>くて、ご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べるどころか<ruby>水<rt>みず</rt></ruby>も<ruby>飲<rt>の</rt></ruby>めない。',
        vi: 'Cổ họng đau buốt, nói gì đến ăn cơm, ngay cả ngụm nước cũng không nuốt nổi.',
      },
      {
        ja: '彼は親切どころか、冷たく追い払った。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>親切<rt>しんせつ</rt></ruby>どころか、<ruby>冷<rt>つめ</rt></ruby>たく<ruby>追<rt>お</rt></ruby>い<ruby>払<rt>はら</rt></ruby>った。',
        vi: 'Anh ta tốt bụng nỗi gì, trái lại còn lạnh lùng xua đuổi người khác.',
      },
    ],
  },
  {
    id: 'gram-53',
    title: '〜どころではない',
    titleFurigana: '〜どころではない',
    formula: 'V-ru / N + どころではない',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Không phải là lúc, tâm trí đâu mà...',
    explanationVi: 'Vì hoàn cảnh quá bận rộn, ồn ào hoặc khốn đốn nên không thể có tâm trí làm việc đó.',
    examples: [
      {
        ja: '明日は大事な試験なので、遊んでいるどころではない。',
        furigana: '<ruby>明日<rt>あす</rt></ruby>は<ruby>大事<rt>だいじ</rt></ruby>な<ruby>試験<rt>しけん</rt></ruby>なので、<ruby>遊<rt>あそ</rt></ruby>んでいるどころではない。',
        vi: 'Ngày mai là kỳ thi trọng đại rồi nên đây đâu phải lúc đi chơi bời.',
      },
      {
        ja: '台風で停電になり、テレビを見るどころではなかった。',
        furigana: '<ruby>台風<rt>たいふう</rt></ruby>で<ruby>停電<rt>ていでん</rt></ruby>になり、テレビを<ruby>見<rt>み</rt></ruby>るどころではなかった。',
        vi: 'Vì bão gây mất điện nên tâm trí đâu mà còn xem tivi nữa.',
      },
      {
        ja: '仕事が山積みで、昼休みを取るどころではない。',
        furigana: '<ruby>仕事<rt>しごと</rt></ruby>が<ruby>山積<rt>やまづ</rt></ruby>みで、<ruby>昼休<rt>ひるやす</rt></ruby>みを<ruby>取<rt>と</rt></ruby>るどころではない。',
        vi: 'Công việc chất đống như núi, thời gian đâu mà nghỉ trưa.',
      },
    ],
  },

  // 13. Nhóm: Giới hạn & Phạm vi (54 - 70)
  {
    id: 'gram-54',
    title: '〜に限って / 〜に限らず',
    titleFurigana: '〜に<ruby>限<rt>かぎ</rt></ruby>って / 〜に<ruby>限<rt>かぎ</rt></ruby>らず',
    formula: 'N + に限って / に限らず',
    category: 'Mức độ - Phạm vi',
    meaningVi: '1. Riêng đối tượng đó... | 2. Không chỉ... mà khắp nơi',
    explanationVi: 'に限って: nhấn mạnh sự trùng hợp xui xẻo hoặc niềm tin đặc biệt. に限らず: không chỉ phạm vi đó.',
    examples: [
      {
        ja: '傘を持っていない日に限って、雨が降る。',
        furigana: '<ruby>傘<rt>かさ</rt></ruby>を<ruby>持<rt>も</rt></ruby>っていない<ruby>日<rt>ひ</rt></ruby>に<ruby>限<rt>かぎ</rt></ruby>って、<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る。',
        vi: 'Cứ đúng vào những hôm không mang ô thì trời lại đổ mưa.',
      },
      {
        ja: 'このアニメは子供に限らず、大人にも大人気だ。',
        furigana: 'このアニメは<ruby>子供<rt>こども</rt></ruby>に<ruby>限<rt>かぎ</rt></ruby>らず、<ruby>大人<rt>おとな</rt></ruby>にも<ruby>大人気<rt>だいにんき</rt></ruby>だ。',
        vi: 'Bộ phim hoạt hình này không chỉ trẻ con mà ngay cả người lớn cũng vô cùng mến mộ.',
      },
      {
        ja: 'うちの子に限って、そんな悪戯をするはずがありません。',
        furigana: 'うちの<ruby>子<rt>こ</rt></ruby>に<ruby>限<rt>かぎ</rt></ruby>って、そんな<ruby>悪戯<rt>いたずら</rt></ruby>をするはずがありません。',
        vi: 'Riêng con nhà tôi thì tuyệt đối không thể nào làm trò nghịch dại như thế.',
      },
    ],
  },
  {
    id: 'gram-55',
    title: '〜のみならず',
    titleFurigana: '〜のみならず',
    formula: 'Thể thông thường / N / A-na である + のみならず',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Không chỉ... mà còn... (văn viết trang trọng)',
    explanationVi: 'Tương đương だけでなく nhưng mang sắc thái văn phong trang trọng, phát biểu, báo chí.',
    examples: [
      {
        ja: '地球温暖化は日本のみならず、世界全体の問題である。',
        furigana: '<ruby>地球温暖化<rt>ちきゅうおんだんか</rt></ruby>は<ruby>日本<rt>にほん</rt></ruby>のみならず、<ruby>世界全体<rt>せかいぜんたい</rt></ruby>の<ruby>問題<rt>もんだい</rt></ruby>である。',
        vi: 'Hiện tượng nóng lên toàn cầu không chỉ của riêng Nhật Bản mà là vấn đề của toàn nhân loại.',
      },
      {
        ja: 'この薬は痛みを抑えるのみならず、炎症も静める効果がある。',
        furigana: 'この<ruby>薬<rt>くすり</rt></ruby>は<ruby>痛<rt>いた</rt></ruby>みを<ruby>抑<rt>おさ</rt></ruby>えるのみならず、<ruby>炎症<rt>えんしょう</rt></ruby>も<ruby>静<rt>しず</rt></ruby>める<ruby>効果<rt>こうか</rt></ruby>がある。',
        vi: 'Loại thuốc này không chỉ giảm đau mà còn có công hiệu tiêu viêm.',
      },
      {
        ja: '彼は勉強のみならず、スポーツにおいても優れた成績を残した。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>勉強<rt>べんきょう</rt></ruby>のみならず、スポーツにおいても<ruby>優<rt>すぐ</rt></ruby>れた<ruby>成績<rt>せいせき</rt></ruby>を<ruby>残<rt>のこ</rt></ruby>した。',
        vi: 'Cậu ấy không chỉ học giỏi mà trong thể thao cũng gặt hái thành tích xuất sắc.',
      },
    ],
  },
  {
    id: 'gram-56',
    title: '〜に応えて / 〜に応える',
    titleFurigana: '〜に<ruby>応<rt>こた</rt></ruby>えて / 〜に<ruby>応<rt>こた</rt></ruby>える',
    formula: 'N + に応えて / に応える N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Đáp ứng, đáp lại (kỳ vọng, mong mỏi, yêu cầu)',
    explanationVi: 'Hành động nhằm đáp ứng nguyện vọng của người khác hoặc khán giả.',
    examples: [
      {
        ja: 'ファンの熱いアンコールに応えて、もう一曲歌った。',
        furigana: 'ファンの<ruby>熱<rt>あつ</rt></ruby>いアンコールに<ruby>応<rt>こた</rt></ruby>えて、もう<ruby>一曲<rt>いっきょく</rt></ruby><ruby>歌<rt>うた</rt></ruby>った。',
        vi: 'Đáp lại tiếng reo hò cuồng nhiệt của người hâm mộ, ca sĩ đã hát thêm một ca khúc nữa.',
      },
      {
        ja: '親の期待に応えられるよう、一生懸命勉強する。',
        furigana: '<ruby>親<rt>おや</rt></ruby>の<ruby>期待<rt>きたい</rt></ruby>に<ruby>応<rt>こた</rt></ruby>えられるよう、<ruby>一生懸命<rt>いっしょうけんめい</rt></ruby><ruby>勉強<rt>べんきょう</rt></ruby>する。',
        vi: 'Để đáp lại sự kỳ vọng của cha mẹ, em sẽ nỗ lực học tập hết mình.',
      },
      {
        ja: 'お客様のご要望に応えて、営業時間を延長いたしました。',
        furigana: 'お<ruby>客様<rt>きゃくさま</rt></ruby>のご<ruby>要望<rt>ようぼう</rt></ruby>に<ruby>応<rt>こた</rt></ruby>えて、<ruby>営業時間<rt>えいぎょうじかん</rt></ruby>を<ruby>延長<rt>えんちょう</rt></ruby>いたしました。',
        vi: 'Nhằm đáp ứng yêu cầu của quý khách, chúng tôi đã kéo dài thời gian mở cửa.',
      },
    ],
  },
  {
    id: 'gram-57',
    title: '〜に応じて / 〜に応じた',
    titleFurigana: '〜に<ruby>応<rt>おう</rt></ruby>じて / 〜に<ruby>応<rt>おう</rt></ruby>じた',
    formula: 'N + に応じて / に応じた N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Ứng với, tùy theo (tương xứng với khả năng, độ tuổi, hoàn cảnh)',
    explanationVi: 'Điều chỉnh hành động hoặc chính sách để tương thích với từng hoàn cảnh cụ thể.',
    examples: [
      {
        ja: '能力や経験に応じて、給料が決定される。',
        furigana: '<ruby>能力<rt>のうりょく</rt></ruby>や<ruby>経験<rt>けいけん</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じて、<ruby>給料<rt>きゅうりょう</rt></ruby>が<ruby>決定<rt>けってい</rt></ruby>される。',
        vi: 'Mức lương được định đoạt tương xứng tùy theo năng lực và kinh nghiệm.',
      },
      {
        ja: '天候に応じて、旅行のコースを変更することがあります。',
        furigana: '<ruby>天候<rt>てんこう</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じて、<ruby>旅行<rt>りょこう</rt></ruby>のコースを<ruby>変更<rt>へんこう</rt></ruby>することがあります。',
        vi: 'Tùy theo tình hình thời tiết, lộ trình chuyến du lịch có thể sẽ thay đổi.',
      },
      {
        ja: '年齢に応じた適切な運動を心がけましょう。',
        furigana: '<ruby>年齢<rt>ねんれい</rt></ruby>に<ruby>応<rt>おう</rt></ruby>じた<ruby>適切<rt>てきせつ</rt></ruby>な<ruby>運動<rt>うんどう</rt></ruby>を<ruby>心<rt>こころ</rt></ruby>がけましょう。',
        vi: 'Hãy chú ý vận động thể chất phù hợp với lứa tuổi của mình.',
      },
    ],
  },
  {
    id: 'gram-58',
    title: '〜に基づいて / 〜に基づいた',
    titleFurigana: '〜に<ruby>基<rt>もと</rt></ruby>づいて / 〜に<ruby>基<rt>もと</rt></ruby>づいた',
    formula: 'N + に基づいて / に基づいた N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Dựa trên căn cứ pháp lý, dữ liệu, nguyên tắc chuẩn mực...',
    explanationVi: 'Thực hiện hành động dựa trên tiêu chuẩn, luật pháp hoặc dữ liệu thống kê khách quan.',
    examples: [
      {
        ja: '法律に基づいて正しく手続きを行ってください。',
        furigana: '<ruby>法律<rt>ほうりつ</rt></ruby>に<ruby>基<rt>もと</rt></ruby>づいて<ruby>正<rt>ただ</rt></ruby>しく<ruby>手続<rt>てつづ</rt></ruby>きを<ruby>行<rt>おこな</rt></ruby>ってください。',
        vi: 'Xin vui lòng tiến hành thủ tục một cách chuẩn xác dựa trên các quy định của pháp luật.',
      },
      {
        ja: '最新の調査データに基づいた報告書を提出した。',
        furigana: '<ruby>最新<rt>さいしん</rt></ruby>の<ruby>調査<rt>ちょうさ</rt></ruby>データに<ruby>基<rt>もと</rt></ruby>づいた<ruby>報告書<rt>ほうこくしょ</rt></ruby>を<ruby>提出<rt>ていしゅつ</rt></ruby>した。',
        vi: 'Tôi đã nộp bản báo cáo xây dựng dựa trên số liệu điều tra mới nhất.',
      },
      {
        ja: '事実に基づいて公平に判断する。',
        furigana: '<ruby>事実<rt>じじつ</rt></ruby>に<ruby>基<rt>もと</rt></ruby>づいて<ruby>公平<rt>こうへい</rt></ruby>に<ruby>判断<rt>はんだん</rt></ruby>する。',
        vi: 'Đưa ra phán quyết công tâm dựa trên sự thật khách quan.',
      },
    ],
  },
  {
    id: 'gram-59',
    title: '〜に沿って / 〜に沿った',
    titleFurigana: '〜に<ruby>沿<rt>そ</rt></ruby>って / 〜に<ruby>沿<rt>そ</rt></ruby>った',
    formula: 'N + に沿って / に沿った N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Men theo (con đường) / Dọc theo, Bám sát theo (kế hoạch, chính sách)',
    explanationVi: 'Đi theo dọc tuyến đường hoặc thực hiện tuần tự bám sát tôn chỉ, kế hoạch.',
    examples: [
      {
        ja: '川に沿って桜の木がずっと並んでいる。',
        furigana: '<ruby>川<rt>かわ</rt></ruby>に<ruby>沿<rt>そ</rt></ruby>って<ruby>桜<rt>さくら</rt></ruby>の<ruby>木<rt>き</rt></ruby>がずっと<ruby>並<rt>なら</rt></ruby>んでいる。',
        vi: 'Men theo bờ sông có hàng cây hoa anh đào trải dài tít tắp.',
      },
      {
        ja: 'マニュアルの指示に沿って作業を進めてください。',
        furigana: 'マニュアルの<ruby>指示<rt>しじ</rt></ruby>に<ruby>沿<rt>そ</rt></ruby>って<ruby>作業<rt>さぎょう</rt></ruby>を<ruby>進<rt>すす</rt></ruby>めてください。',
        vi: 'Xin hãy bám sát theo các chỉ dẫn trong sách hướng dẫn để làm việc.',
      },
      {
        ja: 'お客様のご希望に沿ったプランをご提案します。',
        furigana: 'お<ruby>客様<rt>きゃくさま</rt></ruby>のご<ruby>希望<rt>きぼう</rt></ruby>に<ruby>沿<rt>そ</rt></ruby>ったプランをご<ruby>提案<rt>ていあん</rt></ruby>します。',
        vi: 'Chúng tôi xin đề xuất phương án bám sát đúng nguyện vọng của quý khách.',
      },
    ],
  },
  {
    id: 'gram-60',
    title: '〜次第(しだい)',
    titleFurigana: '〜<ruby>次第<rt>しだい</rt></ruby>',
    formula: 'V-masu (bỏ masu) + 次第',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Ngay sau khi... xong là sẽ lập tức...',
    explanationVi: 'Dùng trong thông báo công việc: ngay khi giai đoạn trước hoàn thành sẽ tiến hành bước kế tiếp.',
    examples: [
      {
        ja: '準備ができ次第、すぐに出発しましょう。',
        furigana: '<ruby>準備<rt>じゅんび</rt></ruby>ができ<ruby>次第<rt>しだい</rt></ruby>、すぐに出発しましょう。',
        vi: 'Ngay sau khi chuẩn bị xong xuôi là chúng ta sẽ xuất phát ngay.',
      },
      {
        ja: '詳しい日程が決まり次第、ご連絡いたします。',
        furigana: '<ruby>詳<rt>くわ</rt></ruby>しい<ruby>日程<rt>にってい</rt></ruby>が<ruby>決<rt>き</rt></ruby>まり<ruby>次第<rt>しだい</rt></ruby>、ご<ruby>連絡<rt>れんらく</rt></ruby>いたします。',
        vi: 'Ngay sau khi lịch trình chi tiết được ấn định, chúng tôi sẽ liên lạc ngay với quý vị.',
      },
      {
        ja: '荷物が届き次第、中身を確認してください。',
        furigana: '<ruby>荷物<rt>にもつ</rt></ruby>が<ruby>届<rt>とど</rt></ruby>き<ruby>次第<rt>しだい</rt></ruby>、<ruby>中身<rt>なかみ</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>してください。',
        vi: 'Ngay khi kiện hàng được giao tới, bạn hãy kiểm tra các món đồ bên trong nhé.',
      },
    ],
  },
  {
    id: 'gram-61',
    title: '〜次第で / 〜次第だ',
    titleFurigana: '〜<ruby>次第<rt>しだい</rt></ruby>で / 〜<ruby>次第<rt>しだい</rt></ruby>だ',
    formula: 'N + 次第で / 次第だ',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Tùy thuộc vào... mà kết quả sẽ thay đổi',
    explanationVi: 'Kết quả tốt hay xấu hoàn toàn quyết định bởi yếu tố đứng trước.',
    examples: [
      {
        ja: '合格できるかどうかは、これからの努力次第だ。',
        furigana: '<ruby>合格<rt>ごうかく</rt></ruby>できるかどうかは、これからの<ruby>努力次第<rt>どりょくしだい</rt></ruby>だ。',
        vi: 'Có đỗ được hay không hoàn toàn tùy thuộc vào sự nỗ lực từ giờ trở đi.',
      },
      {
        ja: '考え方次第で、人生は楽しくも辛くもなる。',
        furigana: '<ruby>考<rt>かんが</rt></ruby>え<ruby>方次第<rt>かたしだい</rt></ruby>で、<ruby>人生<rt>じんせい</rt></ruby>は<ruby>楽<rt>たの</rt></ruby>しくも<ruby>辛<rt>つら</rt></ruby>くもなる。',
        vi: 'Tùy vào cách suy nghĩ mà cuộc đời có thể trở nên vui vẻ hay khổ ải.',
      },
      {
        ja: '明日の天気次第で、バーベキューを中止にするか決めます。',
        furigana: '<ruby>明日<rt>あす</rt></ruby>の<ruby>天気次第<rt>てんきしだい</rt></ruby>で、バーベキューを<ruby>中止<rt>ちゅうし</rt></ruby>にするか<ruby>決<rt>き</rt></ruby>めます。',
        vi: 'Tùy vào thời tiết ngày mai mà chúng tôi sẽ quyết định có hoãn tiệc nướng hay không.',
      },
    ],
  },
  {
    id: 'gram-62',
    title: '〜うえで(は) / 〜うえでの',
    titleFurigana: '〜うえで(は) / 〜うえでの',
    formula: 'V-ta / N の + うえで',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Sau khi đã... xong thì mới tiến hành bước tiếp theo',
    explanationVi: 'Hành động vế trước là tiền đề bắt buộc, phải hoàn tất thận trọng trước khi đưa ra quyết định vế sau.',
    examples: [
      {
        ja: '家族と相談したうえで、進路を決めます。',
        furigana: '<ruby>家族<rt>かぞく</rt></ruby>と<ruby>相談<rt>そうだん</rt></ruby>したうえで、<ruby>進路<rt>しんろ</rt></ruby>を<ruby>決<rt>き</rt></ruby>めます。',
        vi: 'Sau khi đã bàn bạc kỹ với gia đình, tôi mới quyết định con đường tương lai.',
      },
      {
        ja: '実物を見たうえで、購入するかどうか決めたい。',
        furigana: '<ruby>実物<rt>じつぶつ</rt></ruby>を<ruby>見<rt>み</rt></ruby>たうえで、<ruby>購入<rt>こうにゅう</rt></ruby>するかどうか<ruby>決<rt>き</rt></ruby>めたい。',
        vi: 'Sau khi tận mắt xem đồ thật rồi tôi mới muốn quyết định có mua hay không.',
      },
      {
        ja: '契約書の内容をよく確認したうえでサインしてください。',
        furigana: '<ruby>契約書<rt>けいやくしょ</rt></ruby>の<ruby>内容<rt>ないよう</rt></ruby>をよく<ruby>確認<rt>かくにん</rt></ruby>したうえでサインしてください。',
        vi: 'Xin hãy kiểm tra kỹ lưỡng nội dung hợp đồng rồi sau đó mới ký tên.',
      },
    ],
  },
  {
    id: 'gram-63',
    title: '〜うえ(に)',
    titleFurigana: '〜うえ(に)',
    formula: 'Thể thông thường (A-na な/である, N の/である) + うえ(に)',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Hơn nữa, thêm vào đó, đã... lại còn...',
    explanationVi: 'Cùng một chiều hướng: đã tốt lại càng tốt hơn, hoặc đã xấu lại càng tệ hại thêm.',
    examples: [
      {
        ja: 'このアパートは家賃が安いうえに、駅からも近くて便利だ。',
        furigana: 'このアパートは<ruby>家賃<rt>やちん</rt></ruby>が<ruby>安<rt>やす</rt></ruby>いうえに、<ruby>駅<rt>えき</rt></ruby>からも<ruby>近<rt>ちか</rt></ruby>くて<ruby>便利<rt>べんり</rt></ruby>だ。',
        vi: 'Căn hộ này tiền thuê vừa rẻ, hơn nữa lại gần nhà ga nên rất tiện lợi.',
      },
      {
        ja: '今日は道が混んでいたうえに、雨まで降ってきた。',
        furigana: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>道<rt>みち</rt></ruby>が<ruby>混<rt>こ</rt></ruby>んでいたうえに、<ruby>雨<rt>あめ</rt></ruby>まで<ruby>降<rt>ふ</rt></ruby>ってきた。',
        vi: 'Hôm nay đường sá đã kẹt xe, thêm vào đó trời lại còn đổ mưa.',
      },
      {
        ja: '彼女は歌がうまいうえに、ピアノも上手に弾ける。',
        furigana: '<ruby>彼女<rt>かのじょ</rt></ruby>は<ruby>歌<rt>うた</rt></ruby>がうまいうえに、ピアノも<ruby>上手<rt>じょうず</rt></ruby>に<ruby>弾<rt>ひ</rt></ruby>ける。',
        vi: 'Cô ấy đã hát hay lại còn chơi đàn piano rất cừ khôi.',
      },
    ],
  },
  {
    id: 'gram-64',
    title: '〜ざるを得ない',
    titleFurigana: '〜ざるを<ruby>得<rt>え</rt></ruby>ない',
    formula: 'V-nai (bỏ nai) + ざるを得ない (suru -> せざるを得ない)',
    category: 'Bắt buộc - Khuyên nhủ',
    meaningVi: 'Đành phải, không thể không... (miễn cưỡng)',
    explanationVi: 'Dù trong lòng không muốn nhưng do tình thế ép buộc nên đành phải làm như vậy.',
    examples: [
      {
        ja: '台風が直撃するため、旅行は延期せざるを得ない。',
        furigana: '<ruby>台風<rt>たいふう</rt></ruby>が<ruby>直撃<rt>ちょくげき</rt></ruby>するため、<ruby>旅行<rt>りょこう</rt></ruby>は<ruby>延期<rt>えんき</rt></ruby>せざるを<ruby>得<rt>え</rt></ruby>ない。',
        vi: 'Vì cơn bão đổ bộ trực tiếp nên chúng tôi đành phải hoãn chuyến đi.',
      },
      {
        ja: '証拠が揃っているので、罪を認めざるを得ない。',
        furigana: '<ruby>証拠<rt>しょうこ</rt></ruby>が<ruby>揃<rt>そろ</rt></ruby>っているので、<ruby>罪<rt>つみ</rt></ruby>を<ruby>認<rt>みと</rt></ruby>めざるを<ruby>得<rt>え</rt></ruby>ない。',
        vi: 'Vì chứng cứ đã rành rành nên hắn đành phải cúi đầu nhận tội.',
      },
      {
        ja: '上司の命令なので、残業せざるを得なかった。',
        furigana: '<ruby>上司<rt>じょうし</rt></ruby>の<ruby>命令<rt>めいれい</rt></ruby>なので、<ruby>残業<rt>ざんぎょう</rt></ruby>せざるを<ruby>得<rt>え</rt></ruby>なかった。',
        vi: 'Vì là mệnh lệnh của cấp trên nên tôi đành phải ở lại làm thêm giờ.',
      },
    ],
  },
  {
    id: 'gram-65',
    title: '〜ずにはいられない',
    titleFurigana: '〜ずにはいられない',
    formula: 'V-nai (bỏ nai) + ずにはいられない (suru -> せずにはいられない)',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Không thể không..., Không kìm nổi...',
    explanationVi: 'Cảm xúc hoặc phản xạ tự nhiên mạnh đến mức không thể nào kìm hãm được.',
    examples: [
      {
        ja: 'その冗談がおかしくて、笑わずにはいられなかった。',
        furigana: 'その<ruby>冗談<rt>じょうだん</rt></ruby>がおかしくて、<ruby>笑<rt>わら</rt></ruby>わずにはいられなかった。',
        vi: 'Trò đùa đó buồn cười quá khiến tôi không tài nào nhịn cười nổi.',
      },
      {
        ja: '悲しい映画を見て、泣かずにはいられなかった。',
        furigana: '<ruby>悲<rt>かな</rt></ruby>しい<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>て、<ruby>泣<rt>な</rt></ruby>かずにはいられなかった。',
        vi: 'Xem bộ phim bi thương ấy, tôi không kìm nổi dòng nước mắt.',
      },
      {
        ja: '困っている人を見ると、助けずにはいられない性格だ。',
        furigana: '<ruby>困<rt>こま</rt></ruby>っている<ruby>人<rt>ひと</rt></ruby>を<ruby>見<rt>み</rt></ruby>ると、<ruby>助<rt>たす</rt></ruby>けずにはいられない<ruby>性格<rt>せいかく</rt></ruby>だ。',
        vi: 'Tính cách tôi hễ cứ thấy ai gặp hoạn nạn là không thể đứng nhìn mà phải giúp ngay.',
      },
    ],
  },
];
