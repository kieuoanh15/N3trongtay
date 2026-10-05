import { GrammarItem } from '../types';

export const INITIAL_N3_GRAMMAR: GrammarItem[] = [
  // 1. Nhóm: Đối lập - Nhượng bộ (1 - 12)
  {
    id: 'gram-1',
    title: '〜に対して',
    titleFurigana: '〜に<ruby>対<rt>たい</rt></ruby>して',
    formula: 'N + に対して / N1 に対する N2',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: '1. Đối với... (thái độ, hành động) | 2. Trái ngược với... (so sánh 2 vế đối lập)',
    explanationVi: 'Biểu thị đối tượng mà hành động hướng tới, hoặc so sánh hai sự vật, hiện tượng có đặc tính hoàn toàn trái ngược nhau.',
    examples: [
      {
        ja: '目上の人に対して丁寧な言葉遣いをする。',
        furigana: '<ruby>目上<rt>めうえ</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>に<ruby>対<rt>たい</rt></ruby>して<ruby>丁寧<rt>ていねい</rt></ruby>な<ruby>言葉遣<rt>ことばづか</rt></ruby>いをする。',
        vi: 'Sử dụng cách nói lịch sự đối với người bề trên.',
      },
      {
        ja: '兄が活発なのに対して、弟はおとなしい性格だ。',
        furigana: '<ruby>兄<rt>あに</rt></ruby>が<ruby>活発<rt>かっぱつ</rt></ruby>なのに対して、<ruby>弟<rt>おとうと</rt></ruby>はおとなしい<ruby>性格<rt>せいかく</rt></ruby>だ。',
        vi: 'Trái ngược với anh trai hoạt bát thì người em lại có tính cách trầm lặng.',
      },
      {
        ja: 'お客様に対する態度を改めなければならない。',
        furigana: 'お<ruby>客様<rt>きゃくさま</rt></ruby>に<ruby>対<rt>たい</rt></ruby>する<ruby>態度<rt>たいど</rt></ruby>を<ruby>改<rt>あらた</rt></ruby>めなければならない。',
        vi: 'Cần phải chỉnh đốn lại thái độ phục vụ đối với khách hàng.',
      },
    ],
  },
  {
    id: 'gram-2',
    title: '〜反面',
    titleFurigana: '〜<ruby>反面<rt>はんめん</rt></ruby>',
    formula: 'Thể thông thường (A-na な/である, N である) + 反面',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Mặt khác, ngược lại, nhưng đồng thời...',
    explanationVi: 'Dùng khi nói về hai mặt đối lập của cùng một sự việc, con người (vừa tiện lợi nhưng vừa tốn kém).',
    examples: [
      {
        ja: '都会の生活は便利な反面、生活費が高い。',
        furigana: '<ruby>都会<rt>とかい</rt></ruby>の<ruby>生活<rt>せいかつ</rt></ruby>は<ruby>便利<rt>べんり</rt></ruby>な<ruby>反面<rt>はんめん</rt></ruby>、<ruby>生活費<rt>せいかつひ</rt></ruby>が<ruby>高<rt>たか</rt></ruby>い。',
        vi: 'Cuộc sống thành thị một mặt thì tiện lợi nhưng mặt khác chi phí sinh hoạt lại đắt đỏ.',
      },
      {
        ja: 'この薬はよく効く反面、強い副作用もある。',
        furigana: 'この<ruby>薬<rt>くすり</rt></ruby>はよく<ruby>効<rt>き</rt></ruby>く<ruby>反面<rt>はんめん</rt></ruby>、<ruby>強<rt>つよ</rt></ruby>い<ruby>副作用<rt>ふくさよう</rt></ruby>もある。',
        vi: 'Thuốc này công hiệu tốt nhưng đồng thời cũng có tác dụng phụ mạnh.',
      },
      {
        ja: '一人暮らしは自由な反面、寂しさを感じることもある。',
        furigana: '<ruby>一人暮<rt>ひとりぐ</rt></ruby>らしは<ruby>自由<rt>じゆう</rt></ruby>な<ruby>反面<rt>はんめん</rt></ruby>、<ruby>寂<rt>さび</rt></ruby>しさを<ruby>感<rt>かん</rt></ruby>じることもある。',
        vi: 'Sống một mình một mặt thì tự do nhưng mặt khác đôi khi cũng thấy cô đơn.',
      },
    ],
  },
  {
    id: 'gram-3',
    title: '〜わりに(は)',
    titleFurigana: '〜わりに(は)',
    formula: 'Thể thông thường / A-na な / N の + わりに(は)',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'So với... thì (kết quả bất ngờ ngoài mức bình thường)',
    explanationVi: 'Dùng khi thực tế khác với mức độ người ta thường suy đoán dựa trên tiêu chuẩn đó.',
    examples: [
      {
        ja: '彼はたくさん食べるわりに、全然太らない。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>はたくさん<ruby>食<rt>た</rt></ruby>べるわりに、<ruby>全然<rt>ぜんぜん</rt></ruby><ruby>太<rt>ふと</rt></ruby>らない。',
        vi: 'So với việc anh ấy ăn rất nhiều thì anh ấy chẳng hề béo lên chút nào.',
      },
      {
        ja: 'このレストランは値段のわりには料理がおいしい。',
        furigana: 'このレストランは<ruby>値段<rt>ねだん</rt></ruby>のわりには<ruby>料理<rt>りょうり</rt></ruby>がおいしい。',
        vi: 'Nhà hàng này đồ ăn ngon bất ngờ so với mức giá rẻ.',
      },
      {
        ja: '祖父は年のわりには体が丈夫で元気だ。',
        furigana: '<ruby>祖父<rt>そふ</rt></ruby>は<ruby>年<rt>とし</rt></ruby>のわりには<ruby>体<rt>からだ</rt></ruby>が<ruby>丈夫<rt>じょうぶ</rt></ruby>で<ruby>元気<rt>げんき</rt></ruby>だ。',
        vi: 'Ông nội tôi so với tuổi tác thì thân thể rất dẻo dai khỏe khoắn.',
      },
    ],
  },
  {
    id: 'gram-4',
    title: '〜くせに',
    titleFurigana: '〜くせに',
    formula: 'Thể thông thường / A-na な / N の + くせに',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Thế mà, vậy mà... (mang sắc thái trách móc, mỉa mai)',
    explanationVi: 'Cùng chủ ngữ ở hai vế, vế sau là điều tiêu cực hoặc mỉa mai vế trước.',
    examples: [
      {
        ja: '何も知らないくせに、偉そうに話さないでほしい。',
        furigana: '<ruby>何<rt>なに</rt></ruby>も<ruby>知<rt>し</rt></ruby>らないくせに、<ruby>偉<rt>えら</rt></ruby>そうに<ruby>話<rt>はな</rt></ruby>さないでほしい。',
        vi: 'Chẳng biết cái gì vậy mà cứ ra vẻ ta đây hiểu biết.',
      },
      {
        ja: 'お金がないと言っているくせに、新しい車を買った。',
        furigana: 'お<ruby>金<rt>かね</rt></ruby>がないと<ruby>言<rt>い</rt></ruby>っているくせに、<ruby>新<rt>あたら</rt></ruby>しい<ruby>車<rt>くるま</rt></ruby>を<ruby>買<rt>か</rt></ruby>った。',
        vi: 'Miệng thì kêu hết tiền thế mà lại đi tậu chiếc ô tô mới.',
      },
      {
        ja: '自分でやらないくせに、文句ばかり言う。',
        furigana: '<ruby>自分<rt>じぶん</rt></ruby>でやらないくせに、<ruby>文句<rt>もんく</rt></ruby>ばかり<ruby>言<rt>い</rt></ruby>う。',
        vi: 'Bản thân thì chẳng chịu làm thế mà chỉ toàn mở mồm phàn nàn.',
      },
    ],
  },
  {
    id: 'gram-5',
    title: '〜にもかかわらず',
    titleFurigana: '〜にもかかわらず',
    formula: 'Thể thông thường (A-na である / N である) + にもかかわらず',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Mặc dù... thế nhưng vẫn, bất chấp...',
    explanationVi: 'Biểu thị sự việc xảy ra hoàn toàn trái với kết quả đương nhiên dự đoán từ vế trước.',
    examples: [
      {
        ja: '雨が激しく降っているにもかかわらず、多くの人が集まった。',
        furigana: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>激<rt>はげ</rt></ruby>しく<ruby>降<rt>ふ</rt></ruby>っているにもかかわらず、<ruby>多<rt>おお</rt></ruby>くの<ruby>人<rt>ひと</rt></ruby>が<ruby>集<rt>あつ</rt></ruby>まった。',
        vi: 'Bất chấp trời mưa tầm tã, rất đông người vẫn tụ họp lại.',
      },
      {
        ja: '忙しいにもかかわらず、私の相談に乗ってくれた。',
        furigana: '<ruby>忙<rt>いそが</rt></ruby>しいにもかかわらず、<ruby>私<rt>わたし</rt></ruby>の<ruby>相談<rt>そうだん</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ってくれた。',
        vi: 'Dù rất bận rộn nhưng anh ấy vẫn lắng nghe và cho tôi lời khuyên.',
      },
      {
        ja: '深夜であるにもかかわらず、電話をかけてきて驚いた。',
        furigana: '<ruby>深夜<rt>しんや</rt></ruby>であるにもかかわらず、<ruby>電話<rt>でんわ</rt></ruby>をかけてきて<ruby>驚<rt>おどろ</rt></ruby>いた。',
        vi: 'Mặc dù đã nửa đêm thế nhưng cậu ấy vẫn gọi điện khiến tôi giật mình.',
      },
    ],
  },
  {
    id: 'gram-6',
    title: '〜一方(で)',
    titleFurigana: '〜<ruby>一方<rt>いっぽう</rt></ruby>(で)',
    formula: 'Thể thông thường (A-na な/である, N である) + 一方(で)',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Một mặt thì... nhưng mặt khác thì...',
    explanationVi: 'So sánh hai mặt đối lập hoặc hai tình trạng diễn ra đồng thời của cùng một chủ thể.',
    examples: [
      {
        ja: '彼は仕事を熱心にする一方で、家族との時間も大切にしている。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>仕事<rt>しごと</rt></ruby>を<ruby>熱心<rt>ねっしん</rt></ruby>にする<ruby>一方<rt>いっぽう</rt></ruby>で、<ruby>家族<rt>かぞく</rt></ruby>との<ruby>時間<rt>じかん</rt></ruby>も<ruby>大切<rt>たいせつ</rt></ruby>にしている。',
        vi: 'Anh ấy một mặt làm việc rất hăng say nhưng mặt khác vẫn coi trọng thời gian bên gia đình.',
      },
      {
        ja: 'この技術は環境に良い一方で、コストが高いのが課題だ。',
        furigana: 'この<ruby>技術<rt>ぎじゅつ</rt></ruby>は<ruby>環境<rt>かんきょう</rt></ruby>に<ruby>良<rt>よ</rt></ruby>い<ruby>一方<rt>いっぽう</rt></ruby>で、コストが<ruby>高<rt>たか</rt></ruby>いのが<ruby>課題<rt>かだい</rt></ruby>だ。',
        vi: 'Công nghệ này một mặt tốt cho môi trường, nhưng chi phí cao lại là vấn đề nan giải.',
      },
      {
        ja: '輸出が増える一方で、国内の消費は落ち込んでいる。',
        furigana: '<ruby>輸出<rt>ゆしゅつ</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>える<ruby>一方<rt>いっぽう</rt></ruby>で、<ruby>国内<rt>こくない</rt></ruby>の<ruby>消費<rt>しょうひ</rt></ruby>は<ruby>落<rt>お</rt></ruby>ち<ruby>込<rt>こ</rt></ruby>んでいる。',
        vi: 'Trong khi xuất khẩu tăng trưởng thì tiêu dùng nội địa lại giảm sút.',
      },
    ],
  },
  {
    id: 'gram-7',
    title: '〜とはいえ',
    titleFurigana: '〜とはいえ',
    formula: 'Thể thông thường / N + とはいえ',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Tuy nói là... thế nhưng mà...',
    explanationVi: 'Thừa nhận sự thật ở vế trước nhưng đưa ra nhận định hạn chế ở vế sau.',
    examples: [
      {
        ja: '春になったとはいえ、まだ朝晩は冷え込む。',
        furigana: '<ruby>春<rt>はる</rt></ruby>になったとはいえ、まだ<ruby>朝晩<rt>あさばん</rt></ruby>は<ruby>冷<rt>ひ</rt></ruby>え<ruby>込<rt>こ</rt></ruby>む。',
        vi: 'Tuy nói là đã sang xuân nhưng sáng tối trời vẫn còn se lạnh.',
      },
      {
        ja: 'プロの選手とはいえ、失敗することもある。',
        furigana: 'プロの<ruby>選手<rt>せんしゅ</rt></ruby>とはいえ、<ruby>失敗<rt>しっぱい</rt></ruby>することもある。',
        vi: 'Dẫu là vận động viên chuyên nghiệp đi nữa thì cũng có lúc thất bại.',
      },
      {
        ja: '給料が上がったとはいえ、税金も高くなった。',
        furigana: '<ruby>給料<rt>きゅうりょう</rt></ruby>が<ruby>上<rt>あ</rt></ruby>がったとはいえ、<ruby>税金<rt>ぜいきん</rt></ruby>も<ruby>高<rt>たか</rt></ruby>くなった。',
        vi: 'Tuy nói là lương tăng đấy nhưng tiền thuế cũng tăng theo.',
      },
    ],
  },
  {
    id: 'gram-8',
    title: '〜ものの',
    titleFurigana: '〜ものの',
    formula: 'Thể thông thường (A-na な / N である) + ものの',
    category: 'Đối lập - Nhượng bộ',
    meaningVi: 'Tuy là... nhưng thực tế thì...',
    explanationVi: 'Thừa nhận một sự thật nhưng vế sau không diễn ra như kỳ vọng hay mong đợi.',
    examples: [
      {
        ja: '大学を卒業したものの、就職先が決まっていない。',
        furigana: '<ruby>大学<rt>だいがく</rt></ruby>を<ruby>卒業<rt>そつぎょう</rt></ruby>したものの、<ruby>就職先<rt>しゅうしょくさき</rt></ruby>が<ruby>決<rt>き</rt></ruby>まっていない。',
        vi: 'Tuy đã tốt nghiệp đại học nhưng tôi vẫn chưa quyết định được nơi làm việc.',
      },
      {
        ja: '申し込みはしたものの、行くかどうか迷っている。',
        furigana: '<ruby>申<rt>もう</rt></ruby>し<ruby>込<rt>こ</rt></ruby>みはしたものの、<ruby>行<rt>い</rt></ruby>くかどうか<ruby>迷<rt>まよ</rt></ruby>っている。',
        vi: 'Tuy đã đăng ký rồi nhưng tôi vẫn đang phân vân không biết có nên đi hay không.',
      },
      {
        ja: '日本語能力試験N3に合格したものの、会話はまだまだだ。',
        furigana: '<ruby>日本語能力試験<rt>にほんごのうりょくしけん</rt></ruby>N3に<ruby>合格<rt>ごうかく</rt></ruby>したものの、<ruby>会話<rt>かいわ</rt></ruby>はまだまだだ。',
        vi: 'Tuy đã đỗ kỳ thi JLPT N3 nhưng khả năng giao tiếp của tôi vẫn còn non kém.',
      },
    ],
  },

  // 2. Nhóm: Lý do - Nguyên nhân (9 - 22)
  {
    id: 'gram-9',
    title: '〜せいで / 〜せいか',
    titleFurigana: '〜せいで / 〜せいか',
    formula: 'Thể thông thường (A-na な / N の) + せいで',
    category: 'Lý do - Nguyên nhân',
    meaningVi: 'Tại vì, do... (dẫn đến kết quả xấu, tiêu cực)',
    explanationVi: 'Đổ lỗi cho một nguyên nhân nào đó gây ra hậu quả không mong muốn. 〜せいか: không chắc chắn có phải do nguyên nhân đó không.',
    examples: [
      {
        ja: '寝不足のせいで、一日中頭が痛かった。',
        furigana: '<ruby>寝不足<rt>ねぶそく</rt></ruby>のせいで、<ruby>一日中<rt>いちにちじゅう</rt></ruby><ruby>頭<rt>あたま</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>かった。',
        vi: 'Tại vì thiếu ngủ nên cả ngày đầu tôi cứ đau nhức.',
      },
      {
        ja: '大雪のせいで電車が止まってしまった。',
        furigana: '<ruby>大雪<rt>おおゆき</rt></ruby>のせいで<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>止<rt>と</rt></ruby>まってしまった。',
        vi: 'Do tuyết rơi dày đặc nên tàu điện đã bị tạm dừng hoạt động.',
      },
      {
        ja: '風邪のせいか、今日は寒気がする。',
        furigana: '<ruby>風邪<rt>かぜ</rt></ruby>のせいか、<ruby>今日<rt>きょう</rt></ruby>は<ruby>寒気<rt>さむけ</rt></ruby>がする。',
        vi: 'Chẳng biết có phải do cảm lạnh hay không mà hôm nay tôi thấy ớn lạnh trong người.',
      },
    ],
  },
  {
    id: 'gram-10',
    title: '〜おかげで / 〜おかげだ',
    titleFurigana: '〜おかげで / 〜おかげだ',
    formula: 'Thể thông thường (A-na な / N の) + おかげで',
    category: 'Lý do - Nguyên nhân',
    meaningVi: 'Nhờ có... mà (kết quả tích cực, tốt đẹp)',
    explanationVi: 'Bày tỏ sự cảm kích, biết ơn vì một nguyên nhân đã đem lại kết quả tốt lành.',
    examples: [
      {
        ja: '先生のご指導のおかげで、無事に合格できました。',
        furigana: '<ruby>先生<rt>せんせい</rt></ruby>のご<ruby>指導<rt>しどう</rt></ruby>のおかげで、<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>合格<rt>ごうかく</rt></ruby>できました。',
        vi: 'Nhờ có sự chỉ bảo tận tình của thầy cô mà em đã đỗ kỳ thi một cách suôn sẻ.',
      },
      {
        ja: '薬を飲んだおかげで熱が下がりました。',
        furigana: '<ruby>薬<rt>くすり</rt></ruby>を<ruby>飲<rt>の</rt></ruby>んだおかげで<ruby>熱<rt>ねつ</rt></ruby>が<ruby>下<rt>さ</rt></ruby>がりました。',
        vi: 'Nhờ uống thuốc kịp thời mà cơn sốt của tôi đã hạ.',
      },
      {
        ja: '毎日こつこつ練習したおかげで、速く走れるようになった。',
        furigana: '<ruby>毎日<rt>まいにち</rt></ruby>こつこつ<ruby>練習<rt>れんしゅう</rt></ruby>したおかげで、<ruby>速<rt>はや</rt></ruby>く<ruby>走<rt>はし</rt></ruby>れるようになった。',
        vi: 'Nhờ kiên trì luyện tập mỗi ngày mà tôi đã chạy nhanh hơn hẳn.',
      },
    ],
  },
  {
    id: 'gram-11',
    title: '〜によって / 〜による',
    titleFurigana: '〜によって / 〜による',
    formula: 'N + によって / N1 による N2',
    category: 'Lý do - Nguyên nhân',
    meaningVi: '1. Do, vì (nguyên nhân) | 2. Bằng cách (phương tiện) | 3. Tùy theo | 4. Bởi (bị động)',
    explanationVi: 'Mẫu ngữ pháp đa dụng xuất hiện cực nhiều trong các bài đọc hiểu và ngữ pháp N3.',
    examples: [
      {
        ja: '地震によって多くの建物が壊れた。',
        furigana: '<ruby>地震<rt>じしん</rt></ruby>によって<ruby>多<rt>おお</rt></ruby>くの<ruby>建物<rt>たてもの</rt></ruby>が<ruby>壊<rt>こわ</rt></ruby>れた。',
        vi: 'Do trận động đất mà nhiều tòa nhà đã bị phá hủy.',
      },
      {
        ja: '人によって考え方が違うのは当然だ。',
        furigana: '<ruby>人<rt>ひと</rt></ruby>によって<ruby>考<rt>かんが</rt></ruby>え<ruby>方<rt>かた</rt></ruby>が<ruby>違<rt>ちが</rt></ruby>うのは<ruby>当然<rt>とうぜん</rt></ruby>だ。',
        vi: 'Tùy theo mỗi người mà cách suy nghĩ khác nhau là điều đương nhiên.',
      },
      {
        ja: 'この小説は有名な作家によって書かれた。',
        furigana: 'この<ruby>小説<rt>しょうせつ</rt></ruby>は<ruby>有名<rt>ゆうめい</rt></ruby>な<ruby>作家<rt>さっか</rt></ruby>によって<ruby>書<rt>か</rt></ruby>かれた。',
        vi: 'Cuốn tiểu thuyết này được sáng tác bởi một nhà văn nổi tiếng.',
      },
    ],
  },
  {
    id: 'gram-12',
    title: '〜ことから',
    titleFurigana: '〜ことから',
    formula: 'Thể thông thường (A-na な/である, N である) + ことから',
    category: 'Lý do - Nguyên nhân',
    meaningVi: 'Từ việc, do... mà (căn cứ phán đoán, nguồn gốc tên gọi)',
    explanationVi: 'Nêu lên căn cứ để rút ra nhận định, hoặc lý do đặt tên cho sự vật.',
    examples: [
      {
        ja: '富士山が見えることから、この坂は富士見坂と呼ばれる。',
        furigana: '<ruby>富士山<rt>ふじさん</rt></ruby>が<ruby>見<rt>み</rt></ruby>えることから、この<ruby>坂<rt>さか</rt></ruby>は<ruby>富士見坂<rt>ふじみざか</rt></ruby>と<ruby>呼<rt>よ</rt></ruby>ばれる。',
        vi: 'Vì có thể ngắm được núi Phú Sĩ nên con dốc này được gọi là dốc Fujimizaka.',
      },
      {
        ja: '声が震えていることから、彼が緊張しているのが分かった。',
        furigana: '<ruby>声<rt>こえ</rt></ruby>が<ruby>震<rt>ふる</rt></ruby>えていることから、<ruby>彼<rt>かれ</rt></ruby>が<ruby>緊張<rt>きんちょう</rt></ruby>しているのが<ruby>分<rt>わ</rt></ruby>かった。',
        vi: 'Từ việc giọng run rẩy, tôi nhận ra ngay anh ấy đang rất hồi hộp.',
      },
      {
        ja: '道がぬれていることから、昨夜雨が降ったのだろう。',
        furigana: '<ruby>道<rt>みち</rt></ruby>がぬれていることから、<ruby>昨夜<rt>さくや</rt></ruby><ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ったのだろう。',
        vi: 'Từ việc mặt đường ướt sũng, chắc hẳn đêm qua trời đã mưa.',
      },
    ],
  },
  {
    id: 'gram-13',
    title: '〜ばかりに',
    titleFurigana: '〜ばかりに',
    formula: 'Thể thông thường (A-na な/である, N である) + ばかりに',
    category: 'Lý do - Nguyên nhân',
    meaningVi: 'Chỉ vì... mà dẫn đến kết quả tệ hại khôn lường',
    explanationVi: 'Biểu thị sự ân hận, nuối tiếc vì một nguyên nhân duy nhất mà gây ra hậu quả xấu.',
    examples: [
      {
        ja: '鍵を忘れたばかりに、家に入れなくなってしまった。',
        furigana: '<ruby>鍵<rt>かぎ</rt></ruby>を<ruby>忘<rt>わす</rt></ruby>れたばかりに、<ruby>家<rt>いえ</rt></ruby>に<ruby>入<rt>はい</rt></ruby>れなくなってしまった。',
        vi: 'Chỉ vì bỏ quên chìa khóa mà tôi không thể vào được nhà.',
      },
      {
        ja: '余計な一言を言ったばかりに、彼女を怒らせてしまった。',
        furigana: '<ruby>余計<rt>よけい</rt></ruby>な<ruby>一言<rt>ひとこと</rt></ruby>を<ruby>言<rt>い</rt></ruby>ったばかりに、<ruby>彼女<rt>かのじょ</rt></ruby>を<ruby>怒<rt>おこ</rt></ruby>らせてしまった。',
        vi: 'Chỉ vì lỡ buông một lời thừa thãi mà tôi đã khiến cô ấy giận tím mặt.',
      },
      {
        ja: '嘘をついたばかりに、信用を完全に失ってしまった。',
        furigana: '<ruby>嘘<rt>うそ</rt></ruby>をついたばかりに、<ruby>信用<rt>しんよう</rt></ruby>を<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>失<rt>うしな</rt></ruby>ってしまった。',
        vi: 'Chỉ vì nói dối một lần mà tôi đã đánh mất hoàn toàn lòng tin.',
      },
    ],
  },

  // 3. Nhóm: Mục đích (14 - 18)
  {
    id: 'gram-14',
    title: '〜ように / 〜ようにと',
    titleFurigana: '〜ように / 〜ようにと',
    formula: 'V-khả năng / V-nai / V-tự động + ように',
    category: 'Mục đích',
    meaningVi: 'Để, cốt để... (trạng thái mong muốn)',
    explanationVi: 'Khác với ために, ように đi với động từ không có ý chí (động từ thể khả năng, tự động từ hoặc phủ định).',
    examples: [
      {
        ja: '試験に合格できるように、毎日夜遅くまで勉強している。',
        furigana: '<ruby>試験<rt>しけん</rt></ruby>に<ruby>合格<rt>ごうかく</rt></ruby>できるように、<ruby>毎日<rt>まいにち</rt></ruby><ruby>夜遅<rt>よるおそ</rt></ruby>くまで<ruby>勉強<rt>べんきょう</rt></ruby>している。',
        vi: 'Để có thể đỗ kỳ thi, ngày nào tôi cũng học đến tận khuya.',
      },
      {
        ja: '風邪を引かないように、手洗いとうがいを徹底する。',
        furigana: '<ruby>風邪<rt>かぜ</rt></ruby>を<ruby>引<rt>ひ</rt></ruby>かないように、<ruby>手洗<rt>てあら</rt></ruby>いとうがいを<ruby>徹底<rt>てってい</rt></ruby>する。',
        vi: 'Để không bị cảm, tôi rửa tay và súc họng thật cẩn thận.',
      },
      {
        ja: '後ろの席の人にもよく聞こえるように、大きな声で話した。',
        furigana: '<ruby>後<rt>うし</rt></ruby>ろの<ruby>席<rt>せき</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>にもよく<ruby>聞<rt>き</rt></ruby>こえるように、<ruby>大<rt>おお</rt></ruby>きな<ruby>声<rt>こえ</rt></ruby>で<ruby>話<rt>はな</rt></ruby>した。',
        vi: 'Tôi đã nói thật to để người ngồi hàng ghế sau cũng nghe rõ.',
      },
    ],
  },
  {
    id: 'gram-15',
    title: '〜ために / 〜ための',
    titleFurigana: '〜ために / 〜ための',
    formula: 'V-ru / N の + ために',
    category: 'Mục đích',
    meaningVi: 'Để làm gì, vì mục đích...',
    explanationVi: 'Đi với động từ tha động từ có ý chí rõ ràng của chủ thể nhằm đạt mục tiêu cụ thể.',
    examples: [
      {
        ja: '将来自分の店を持つために、貯金をしている。',
        furigana: '<ruby>将来<rt>しょうらい</rt></ruby><ruby>自分<rt>じぶん</rt></ruby>の<ruby>店<rt>みせ</rt></ruby>を<ruby>持<rt>も</rt></ruby>つために、<ruby>貯金<rt>ちょきん</rt></ruby>をしている。',
        vi: 'Để sau này mở được cửa hàng của riêng mình, tôi đang tích lũy tiền tiết kiệm.',
      },
      {
        ja: '健康のために、毎朝ジョギングを欠かさない。',
        furigana: '<ruby>健康<rt>けんこう</rt></ruby>のために、<ruby>毎朝<rt>まいあさ</rt></ruby>ジョギングを<ruby>欠<rt>か</rt></ruby>かさない。',
        vi: 'Vì sức khỏe của bản thân, sáng nào tôi cũng chạy bộ đều đặn.',
      },
      {
        ja: '日本語を上達させるために、ドラマを見ている。',
        furigana: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>上達<rt>じょうたつ</rt></ruby>させるために、ドラマを<ruby>見<rt>み</rt></ruby>ている。',
        vi: 'Để nâng cao trình độ tiếng Nhật, tôi thường xuyên xem phim truyền hình.',
      },
    ],
  },

  // 4. Nhóm: Điều kiện - Giả định (16 - 25)
  {
    id: 'gram-16',
    title: '〜さえ〜ば',
    titleFurigana: '〜さえ〜ば',
    formula: 'N さえ V-ba / A-i ければ / A-na なら',
    category: 'Điều kiện',
    meaningVi: 'Chỉ cần... là đủ',
    explanationVi: 'Nêu lên điều kiện tối thiểu, chỉ cần thỏa mãn điều kiện đó là kết quả mong muốn sẽ thành.',
    examples: [
      {
        ja: '体さえ健康なら、どんな困難も乗り越えられる。',
        furigana: '<ruby>体<rt>からだ</rt></ruby>さえ<ruby>健康<rt>けんこう</rt></ruby>なら、どんな<ruby>困難<rt>こんなん</rt></ruby>も<ruby>乗<rt>の</rt></ruby>り<ruby>越<rt>こ</rt></ruby>えられる。',
        vi: 'Chỉ cần cơ thể khỏe mạnh thì mọi khó khăn đều có thể vượt qua.',
      },
      {
        ja: 'あなたさえいれば、他には何もいりません。',
        furigana: 'あなたさえいれば、<ruby>他<rt>ほか</rt></ruby>には<ruby>何<rt>なに</rt></ruby>もいりません。',
        vi: 'Chỉ cần có em bên cạnh, anh chẳng cần gì khác trên đời.',
      },
      {
        ja: 'パスポートさえ忘れなければ、あとは大丈夫です。',
        furigana: 'パスポートさえ<ruby>忘<rt>わす</rt></ruby>れなければ、あとは<ruby>大丈夫<rt>だいじょうぶ</rt></ruby>です。',
        vi: 'Chỉ cần không quên hộ chiếu thì những thứ khác đều ổn thỏa.',
      },
    ],
  },
  {
    id: 'gram-17',
    title: '〜たとえ〜ても',
    titleFurigana: 'たとえ〜ても',
    formula: 'たとえ V-te も / A-i くても / A-na・N でも',
    category: 'Điều kiện',
    meaningVi: 'Cho dù... đi chăng nữa thì vẫn...',
    explanationVi: 'Nhấn mạnh điều kiện giả định nhượng bộ: dù tình huống cực đoan xảy ra thì kết quả vẫn không đổi.',
    examples: [
      {
        ja: 'たとえ両親に反対されても、留学の夢を諦めない。',
        furigana: 'たとえ<ruby>両親<rt>りょうしん</rt></ruby>に<ruby>反対<rt>はんたい</rt></ruby>されても、<ruby>留学<rt>りゅうがく</rt></ruby>の<ruby>夢<rt>ゆめ</rt></ruby>を<ruby>諦<rt>あきら</rt></ruby>めない。',
        vi: 'Dù cho có bị bố mẹ phản đối đi nữa, tôi cũng không từ bỏ ước mơ du học.',
      },
      {
        ja: 'たとえ失敗しても、挑戦した経験は無駄にならない。',
        furigana: 'たとえ<ruby>失敗<rt>しっぱい</rt></ruby>しても、<ruby>挑戦<rt>ちょうせん</rt></ruby>した<ruby>経験<rt>けいけん</rt></ruby>は<ruby>無駄<rt>むだ</rt></ruby>にならない。',
        vi: 'Cho dù có thất bại đi chăng nữa thì trải nghiệm thử sức cũng không bao giờ uổng phí.',
      },
      {
        ja: 'たとえ雨が降っても、明日の試合は予定通り行われる。',
        furigana: 'たとえ<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>っても、<ruby>明日<rt>あす</rt></ruby>の<ruby>試合<rt>しあい</rt></ruby>は<ruby>予定<rt>よてい</rt></ruby><ruby>通<rt>どお</rt></ruby>り<ruby>行<rt>おこな</rt></ruby>われる。',
        vi: 'Dù cho trời có mưa thì trận đấu ngày mai vẫn diễn ra đúng kế hoạch.',
      },
    ],
  },
  {
    id: 'gram-18',
    title: '〜以上(は)',
    titleFurigana: '〜<ruby>以上<rt>いじょう</rt></ruby>(は)',
    formula: 'Thể thông thường (A-na である / N である) + 以上(は)',
    category: 'Điều kiện',
    meaningVi: 'Một khi đã... thì đương nhiên phải...',
    explanationVi: 'Vế sau là nghĩa vụ, ý chí, mệnh lệnh hoặc quyết tâm tương xứng với hoàn cảnh vế trước.',
    examples: [
      {
        ja: '日本で働く以上、日本語をしっかり身につけるべきだ。',
        furigana: '<ruby>日本<rt>にほん</rt></ruby>で<ruby>働<rt>はたら</rt></ruby>く<ruby>以上<rt>いじょう</rt></ruby>、<ruby>日本語<rt>にほんご</rt></ruby>をしっかり<ruby>身<rt>み</rt></ruby>につけるべきだ。',
        vi: 'Một khi đã sang Nhật làm việc thì đương nhiên phải trau dồi tiếng Nhật vững vàng.',
      },
      {
        ja: '約束した以上は、何があっても守らなければならない。',
        furigana: '<ruby>約束<rt>やくそく</rt></ruby>した<ruby>以上<rt>いじょう</rt></ruby>は、<ruby>何<rt>なに</rt></ruby>があっても<ruby>守<rt>まも</rt></ruby>らなければならない。',
        vi: 'Một khi đã hứa thì dù có chuyện gì xảy ra cũng phải giữ lời.',
      },
      {
        ja: '引き受けた以上は最後まで責任を持ってやり遂げる。',
        furigana: '<ruby>引<rt>ひ</rt></ruby>き<ruby>受<rt>う</rt></ruby>けた<ruby>以上<rt>いじょう</rt></ruby>は<ruby>最後<rt>さいご</rt></ruby>まで<ruby>責任<rt>せきにん</rt></ruby>を<ruby>持<rt>も</rt></ruby>ってやり<ruby>遂<rt>と</rt></ruby>げる。',
        vi: 'Một khi đã nhận việc thì tôi sẽ có trách nhiệm làm đến cùng.',
      },
    ],
  },

  // 5. Nhóm: Thời gian - Thứ tự (19 - 28)
  {
    id: 'gram-19',
    title: '〜うちに / 〜ないうちに',
    titleFurigana: '〜うちに / 〜ないうちに',
    formula: 'V-ru / V-te iru / V-nai / A-i / A-na な / N の + うちに',
    category: 'Thời gian - Thứ tự',
    meaningVi: '1. Trong khi còn... (tranh thủ làm việc gì) | 2. Trong lúc đang... thì biến đổi diễn ra',
    explanationVi: 'Tranh thủ thực hiện hành động trước khi trạng thái thuận lợi thay đổi, hoặc sự việc diễn ra tự nhiên trong khoảng thời gian đó.',
    examples: [
      {
        ja: 'スープが温かいうちに召し上がってください。',
        furigana: 'スープが<ruby>温<rt>あたた</rt></ruby>かいうちに<ruby>召<rt>め</rt></ruby>し<ruby>上<rt>あ</rt></ruby>がってください。',
        vi: 'Xin mời dùng súp trong khi súp còn đang nóng hổi.',
      },
      {
        ja: '雨が降らないうちに、急いで買い物を済ませよう。',
        furigana: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>らないうちに、<ruby>急<rt>いそ</rt></ruby>いで<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>を<ruby>済<rt>す</rt></ruby>ませよう。',
        vi: 'Trong khi trời chưa mưa, hãy tranh thủ nhanh chóng đi mua sắm nào.',
      },
      {
        ja: '何度も聞いているうちに、自然と歌詞を覚えた。',
        furigana: '<ruby>何度<rt>なんど</rt></ruby>も<ruby>聞<rt>き</rt></ruby>いているうちに、<ruby>自然<rt>しぜん</rt></ruby>と<ruby>歌詞<rt>かし</rt></ruby>を<ruby>覚<rt>おぼ</rt></ruby>えた。',
        vi: 'Trong lúc nghe đi nghe lại nhiều lần, tôi đã tự nhiên thuộc luôn lời bài hát.',
      },
    ],
  },
  {
    id: 'gram-20',
    title: '〜最中に / 〜最中だ',
    titleFurigana: '〜<ruby>最中<rt>さいちゅう</rt></ruby>に / 〜<ruby>最中<rt>さいちゅう</rt></ruby>だ',
    formula: 'V-te iru / N の + 最中に',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Đúng lúc đang đỉnh điểm làm gì thì có sự cố chen ngang',
    explanationVi: 'Nhấn mạnh hành động đang diễn ra đúng cao trào thì bị một sự việc bất ngờ khác làm gián đoạn.',
    examples: [
      {
        ja: '食事の最中に客が訪ねてきて驚いた。',
        furigana: '<ruby>食事<rt>しょくじ</rt></ruby>の<ruby>最中<rt>さいちゅう</rt></ruby>に<ruby>客<rt>きゃく</rt></ruby>が<ruby>訪<rt>たず</rt></ruby>ねてきて<ruby>驚<rt>おどろ</rt></ruby>いた。',
        vi: 'Đúng lúc cả nhà đang dùng bữa thì có khách ghé thăm bất ngờ.',
      },
      {
        ja: '重要な会議の最中に携帯電話が鳴ってしまった。',
        furigana: '<ruby>重要<rt>じゅうよう</rt></ruby>な<ruby>会議<rt>かいぎ</rt></ruby>の<ruby>最中<rt>さいちゅう</rt></ruby>に<ruby>携帯電話<rt>けいたいでんわ</rt></ruby>が<ruby>鳴<rt>な</rt></ruby>ってしまった。',
        vi: 'Đúng lúc đang họp quan trọng thì chuông điện thoại của tôi lại reo lên.',
      },
      {
        ja: '試験の最中に急にお腹が痛くなった。',
        furigana: '<ruby>試験<rt>しけん</rt></ruby>の<ruby>最中<rt>さいちゅう</rt></ruby>に<ruby>急<rt>きゅう</rt></ruby>にお<ruby>腹<rt>なか</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>くなった。',
        vi: 'Đúng lúc đang làm bài thi thì tôi bỗng nhiên bị đau bụng quằn quại.',
      },
    ],
  },
  {
    id: 'gram-21',
    title: '〜たびに',
    titleFurigana: '〜たびに',
    formula: 'V-ru / N の + たびに',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Mỗi lần, cứ mỗi khi... lại...',
    explanationVi: 'Nhấn mạnh quy luật: cứ mỗi lần hành động đó diễn ra thì luôn đi kèm với cùng một cảm xúc hoặc kết quả tương tự.',
    examples: [
      {
        ja: 'この曲を聞くたびに、学生時代の楽しかった思い出がよみがえる。',
        furigana: 'この<ruby>曲<rt>きょく</rt></ruby>を<ruby>聞<rt>き</rt></ruby>くたびに、<ruby>学生時代<rt>がくせいじだい</rt></ruby>の<ruby>楽<rt>たの</rt></ruby>しかった<ruby>思<rt>おも</rt></ruby>い<ruby>出<rt>で</rt></ruby>がよみがえる。',
        vi: 'Cứ mỗi khi nghe bản nhạc này, những kỷ niệm vui thời đi học lại ùa về.',
      },
      {
        ja: '父は旅行に行くたびに、その土地の美味しいお土産を買ってくる。',
        furigana: '<ruby>父<rt>ちち</rt></ruby>は<ruby>旅行<rt>りょこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>くたびに、その<ruby>土地<rt>とち</rt></ruby>のおいしいお<ruby>土産<rt>みやげ</rt></ruby>を<ruby>買<rt>か</rt></ruby>ってくる。',
        vi: 'Bố tôi cứ mỗi lần đi du lịch là lại mua đặc sản ngon lành vùng đó về làm quà.',
      },
      {
        ja: '会うたびに彼女はますます綺麗になっていく。',
        furigana: '<ruby>会<rt>あ</rt></ruby>うたびに<ruby>彼女<rt>かのじょ</rt></ruby>はますます<ruby>綺麗<rt>きれい</rt></ruby>になっていく。',
        vi: 'Cứ mỗi lần gặp lại thấy cô ấy càng ngày càng xinh đẹp.',
      },
    ],
  },
  {
    id: 'gram-22',
    title: '〜ついでに',
    titleFurigana: '〜ついでに',
    formula: 'V-ru / V-ta / N の + ついでに',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Nhân tiện, tiện thể tiện đường...',
    explanationVi: 'Tận dụng một dịp đi đâu hoặc làm gì đó có sẵn để làm thêm một việc phụ khác.',
    examples: [
      {
        ja: 'コンビニへ行くついでに、ゴミを出してきてくれませんか。',
        furigana: 'コンビニへ<ruby>行<rt>い</rt></ruby>くついでに、ゴミを<ruby>出<rt>だ</rt></ruby>してきてくれませんか。',
        vi: 'Tiện thể lúc ra cửa hàng tiện lợi, bạn vứt hộ tôi bịch rác được không?',
      },
      {
        ja: '郵便局へ行ったついでに、銀行で用事を済ませた。',
        furigana: '<ruby>郵便局<rt>ゆうびんきょく</rt></ruby>へ<ruby>行<rt>い</rt></ruby>ったついでに、<ruby>銀行<rt>ぎんこう</rt></ruby>で<ruby>用事<rt>ようじ</rt></ruby>を<ruby>済<rt>す</rt></ruby>ませた。',
        vi: 'Tiện thể lúc đến bưu điện, tôi ghé ngân hàng giải quyết xong việc luôn.',
      },
      {
        ja: '散歩のついでに近所の本屋に立ち寄った。',
        furigana: '<ruby>散歩<rt>さんぽ</rt></ruby>のついでに<ruby>近所<rt>きんじょ</rt></ruby>の<ruby>本屋<rt>ほんや</rt></ruby>に<ruby>立<rt>た</rt></ruby>ち<ruby>寄<rt>よ</rt></ruby>った。',
        vi: 'Nhân tiện lúc đi dạo tôi đã tạt qua tiệm sách gần nhà.',
      },
    ],
  },
  {
    id: 'gram-23',
    title: '〜とたんに / 〜とたん',
    titleFurigana: '〜とたんに / 〜とたん',
    formula: 'V-ta + とたんに',
    category: 'Thời gian - Thứ tự',
    meaningVi: 'Ngay vừa mới... thì bỗng nhiên...',
    explanationVi: 'Ngay khoảnh khắc vừa làm xong vế trước thì lập tức có sự việc bất ngờ ngoài dự kiến diễn ra ở vế sau.',
    examples: [
      {
        ja: '窓を開けたとたんに、冷たい風が吹き込んできた。',
        furigana: '<ruby>窓<rt>まど</rt></ruby>を<ruby>開<rt>あ</rt></ruby>けたとたんに、<ruby>冷<rt>つめ</rt></ruby>たい<ruby>風<rt>かぜ</rt></ruby>が<ruby>吹<rt>ふ</rt></ruby>き<ruby>込<rt>こ</rt></ruby>んできた。',
        vi: 'Ngay vừa mở cửa sổ ra thì một luồng gió lạnh buốt đã ùa vào.',
      },
      {
        ja: '立ち上がったとたん、めまいがして倒れそうになった。',
        furigana: '<ruby>立<rt>た</rt></ruby>ち<ruby>上<rt>あ</rt></ruby>がったとたん、めまいがして<ruby>倒<rt>たお</rt></ruby>れそうになった。',
        vi: 'Vừa đứng phắt dậy một cái là tôi chóng mặt suýt ngã quỵ.',
      },
      {
        ja: 'お酒を一口飲んだとたん、顔が真っ赤になった。',
        furigana: 'お<ruby>酒<rt>さけ</rt></ruby>を<ruby>一口<rt>ひとくち</rt></ruby><ruby>飲<rt>の</rt></ruby>んだとたん、<ruby>顔<rt>かお</rt></ruby>が<ruby>真<rt>ま</rt></ruby>っ<ruby>赤<rt>か</rt></ruby>になった。',
        vi: 'Vừa nhấp một ngụm rượu mà mặt cậu ấy đã đỏ bừng lên.',
      },
    ],
  },

  // 6. Nhóm: Mức độ - Phạm vi (24 - 33)
  {
    id: 'gram-24',
    title: '〜くらい / 〜ほど',
    titleFurigana: '〜くらい / 〜ほど',
    formula: 'Thể thông thường / N + くらい / ほど',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Đến mức mà, chừng như...',
    explanationVi: 'Dùng hình ảnh so sánh cụ thể để diễn tả mức độ cao của một cảm xúc, tính chất.',
    examples: [
      {
        ja: '涙が出るほど嬉しいニュースを聞いた。',
        furigana: '<ruby>涙<rt>なみだ</rt></ruby>が<ruby>出<rt>で</rt></ruby>るほど<ruby>嬉<rt>うれ</rt></ruby>しいニュースを<ruby>聞<rt>き</rt></ruby>いた。',
        vi: 'Tôi vừa nghe được một tin vui đến mức muốn trào nước mắt.',
      },
      {
        ja: '声が出ないくらい喉が痛いです。',
        furigana: '<ruby>声<rt>こえ</rt></ruby>が<ruby>出<rt>で</rt></ruby>ないくらい<ruby>喉<rt>のど</rt></ruby>が<ruby>痛<rt>いた</rt></ruby>いです。',
        vi: 'Cổ họng tôi đau buốt đến mức không thể cất thành tiếng.',
      },
      {
        ja: '昨日は倒れるほど忙しかった。',
        furigana: '<ruby>昨日<rt>きのう</rt></ruby>は<ruby>倒<rt>たお</rt></ruby>れるほど<ruby>忙<rt>いそが</rt></ruby>しかった。',
        vi: 'Hôm qua tôi bận rộn đến mức tưởng như sắp ngất đi.',
      },
    ],
  },
  {
    id: 'gram-25',
    title: '〜ばかりか / 〜ばかりでなく',
    titleFurigana: '〜ばかりか / 〜ばかりでなく',
    formula: 'Thể thông thường (A-na な/である, N である) + ばかりか',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Không chỉ... mà ngay cả... cũng (mức độ tăng tiến)',
    explanationVi: 'Không dừng lại ở việc đó mà mức độ còn lan rộng hoặc nặng nề hơn nữa.',
    examples: [
      {
        ja: '彼は英語ばかりか、中国語やスペイン語も流暢に話せる。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>英語<rt>えいご</rt></ruby>ばかりか、<ruby>中国語<rt>ちゅうごくご</rt></ruby>やスペイン<ruby>語<rt>ご</rt></ruby>も<ruby>流暢<rt>りゅうちょう</rt></ruby>に<ruby>話<rt>はな</rt></ruby>せる。',
        vi: 'Anh ấy không chỉ tiếng Anh mà cả tiếng Trung lẫn tiếng Tây Ban Nha cũng nói rất lưu loát.',
      },
      {
        ja: '風邪をこじらせて熱が出たばかりか、声も出なくなった。',
        furigana: '<ruby>風邪<rt>かぜ</rt></ruby>をこじらせて<ruby>熱<rt>ねつ</rt></ruby>が<ruby>出<rt>で</rt></ruby>たばかりか、<ruby>声<rt>こえ</rt></ruby>も<ruby>出<rt>で</rt></ruby>なくなった。',
        vi: 'Bị cảm chuyển nặng không chỉ sốt cao mà đến giọng tôi cũng mất hẳn.',
      },
      {
        ja: 'この店は味が良いばかりでなく、店員の接客も素晴らしい。',
        furigana: 'この<ruby>店<rt>みせ</rt></ruby>は<ruby>味<rt>あじ</rt></ruby>が<ruby>良<rt>よ</rt></ruby>いばかりでなく、<ruby>店員<rt>てんいん</rt></ruby>の<ruby>接客<rt>せっきゃく</rt></ruby>も<ruby>素晴<rt>すばら</rt></ruby>しい。',
        vi: 'Quán ăn này không những đồ ăn ngon mà thái độ phục vụ của nhân viên cũng tuyệt vời.',
      },
    ],
  },
  {
    id: 'gram-26',
    title: '〜をはじめ / 〜をはじめとする',
    titleFurigana: '〜をはじめ / 〜をはじめとする',
    formula: 'N + をはじめ / をはじめとする N',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Trước tiên phải kể đến là..., tiêu biểu là...',
    explanationVi: 'Nêu ra đại diện tiêu biểu nhất trong một tập hợp sự vật, sau đó mở rộng ra các đối tượng khác.',
    examples: [
      {
        ja: '日本には富士山をはじめ、美しい自然が多くある。',
        furigana: '<ruby>日本<rt>にほん</rt></ruby>には<ruby>富士山<rt>ふじさん</rt></ruby>をはじめ、<ruby>美<rt>うつく</rt></ruby>しい<ruby>自然<rt>しぜん</rt></ruby>が<ruby>多<rt>おお</rt></ruby>くある。',
        vi: 'Ở Nhật Bản trước hết phải kể đến núi Phú Sĩ, cùng rất nhiều danh lam thiên nhiên tươi đẹp khác.',
      },
      {
        ja: '校長先生をはじめ、先生方に深く感謝いたします。',
        furigana: '<ruby>校長先生<rt>こうちょうせんせい</rt></ruby>をはじめ、<ruby>先生方<rt>せんせいがた</rt></ruby>に<ruby>深<rt>ふか</rt></ruby>く<ruby>感謝<rt>かんしゃ</rt></ruby>いたします。',
        vi: 'Em xin chân thành cảm ơn trước hết là thầy hiệu trưởng và toàn thể quý thầy cô.',
      },
      {
        ja: '東京をはじめとする大都市では人口集中が続いている。',
        furigana: '<ruby>東京<rt>とうきょう</rt></ruby>をはじめとする<ruby>大都市<rt>だいとし</rt></ruby>では<ruby>人口集中<rt>じんこうしゅうちゅう</rt></ruby>が<ruby>続<rt>つづ</rt></ruby>いている。',
        vi: 'Tại các đô thị lớn tiêu biểu như Tokyo, tình trạng tập trung dân số vẫn đang tiếp diễn.',
      },
    ],
  },

  // 7. Nhóm: Bắt buộc - Khuyên nhủ - Ý chí (27 - 35)
  {
    id: 'gram-27',
    title: '〜べきだ / 〜べきではない',
    titleFurigana: '〜べきだ / 〜べきではない',
    formula: 'V-ru (suru -> すべき / するべき) + べきだ',
    category: 'Bắt buộc - Khuyên nhủ',
    meaningVi: 'Nên / Phải làm gì (theo đạo lý xã hội)',
    explanationVi: 'Thể hiện nghĩa vụ đạo đức, trách nhiệm của một người nên làm theo chuẩn mực thông thường.',
    examples: [
      {
        ja: '約束の時間には遅れずに行くべきだ。',
        furigana: '<ruby>約束<rt>やくそく</rt></ruby>の<ruby>時間<rt>じかん</rt></ruby>には<ruby>遅<rt>おく</rt></ruby>れずに<ruby>行<rt>い</rt></ruby>くべきだ。',
        vi: 'Cần phải đến đúng giờ hẹn, không nên trễ nải.',
      },
      {
        ja: '他人の悪口は言うべきではない。',
        furigana: '<ruby>他人<rt>たにん</rt></ruby>の<ruby>悪口<rt>わるくち</rt></ruby>は<ruby>言<rt>い</rt></ruby>うべきではない。',
        vi: 'Không nên nói xấu sau lưng người khác.',
      },
      {
        ja: '疑問に思ったことはその場ですぐ質問すべきだ。',
        furigana: '<ruby>疑問<rt>ぎもん</rt></ruby>に<ruby>思<rt>おも</rt></ruby>ったことはその<ruby>場<rt>ば</rt></ruby>ですぐ<ruby>質問<rt>しつもん</rt></ruby>すべきだ。',
        vi: 'Những điều còn thắc mắc thì nên hỏi ngay tại chỗ.',
      },
    ],
  },
  {
    id: 'gram-28',
    title: '〜ことだ',
    titleFurigana: '〜ことだ',
    formula: 'V-ru / V-nai + ことだ',
    category: 'Bắt buộc - Khuyên nhủ',
    meaningVi: 'Nên / Không nên (lời khuyên trực tiếp trong trường hợp cụ thể)',
    explanationVi: 'Dùng khi đưa ra lời khuyên chân thành của người đi trước cho người khác.',
    examples: [
      {
        ja: '日本語が上手になりたいなら、毎日話すことだ。',
        furigana: '<ruby>日本語<rt>にほんご</rt></ruby>が<ruby>上手<rt>じょうず</rt></ruby>になりたいなら、<ruby>毎日<rt>まいにち</rt></ruby><ruby>話<rt>はな</rt></ruby>すことだ。',
        vi: 'Nếu muốn giỏi tiếng Nhật thì cách tốt nhất là nên tập nói mỗi ngày.',
      },
      {
        ja: '健康を保つためには、夜更かしをしないことだ。',
        furigana: '<ruby>健康<rt>けんこう</rt></ruby>を<ruby>保<rt>たも</rt></ruby>つためには、<ruby>夜更<rt>よふ</rt></ruby>かしをしないことだ。',
        vi: 'Để giữ gìn sức khỏe thì tốt nhất bạn không nên thức khuya.',
      },
      {
        ja: '試験に受かりたいなら、過去問を徹底的に解くことだ。',
        furigana: '<ruby>試験<rt>しけん</rt></ruby>に<ruby>受<rt>う</rt></ruby>かりたいなら、<ruby>過去問<rt>かこもん</rt></ruby>を<ruby>徹底的<rt>てっていてき</rt></ruby>に<ruby>解<rt>と</rt></ruby>くことだ。',
        vi: 'Muốn đỗ kỳ thi thì bạn nên giải đề thi thật các năm trước một cách triệt để.',
      },
    ],
  },
  {
    id: 'gram-29',
    title: '〜わけにはいかない',
    titleFurigana: '〜わけにはいかない',
    formula: 'V-ru / V-nai + わけにはいかない',
    category: 'Bắt buộc - Khuyên nhủ',
    meaningVi: 'Không thể (vì lý do tâm lý, đạo đức, quy định xã hội)',
    explanationVi: 'Bản thân có khả năng làm được việc đó, nhưng vì lương tâm, trách nhiệm hoặc dư luận mà không thể làm.',
    examples: [
      {
        ja: '大切な試験の前だから、風邪を引くわけにはいかない。',
        furigana: '<ruby>大切<rt>たいせつ</rt></ruby>な<ruby>試験<rt>しけん</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>だから、<ruby>風邪<rt>かぜ</rt></ruby>を<ruby>引<rt>ひ</rt></ruby>くわけにはいかない。',
        vi: 'Vì sắp đến kỳ thi quan trọng nên tôi tuyệt đối không thể để bị ốm được.',
      },
      {
        ja: '車で来たので、お酒を飲むわけにはいきません。',
        furigana: '<ruby>車<rt>くるま</rt></ruby>で<ruby>来<rt>き</rt></ruby>たので、お<ruby>酒<rt>さけ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>むわけにはいきません。',
        vi: 'Vì tôi tự lái xe ô tô đến nên không thể nào uống rượu được.',
      },
      {
        ja: '頼まれた仕事を途中で放り出すわけにはいかない。',
        furigana: '<ruby>頼<rt>たの</rt></ruby>まれた<ruby>仕事<rt>しごと</rt></ruby>を<ruby>途中<rt>とちゅう</rt></ruby>で<ruby>放<rt>ほう</rt></ruby>り<ruby>出<rt>だ</rt></ruby>すわけにはいかない。',
        vi: 'Công việc đã được người ta tin tưởng giao phó thì không thể bỏ dở giữa chừng.',
      },
    ],
  },

  // 8. Nhóm: Biến đổi - Xu hướng (30 - 38)
  {
    id: 'gram-30',
    title: '〜一方だ',
    titleFurigana: '〜<ruby>一方<rt>いっぽう</rt></ruby>だ',
    formula: 'V-ru (động từ chỉ biến đổi) + 一方だ',
    category: 'Biến đổi - Xu hướng',
    meaningVi: 'Càng ngày càng... theo một chiều hướng (thường là tiêu cực)',
    explanationVi: 'Diễn tả xu hướng biến đổi liên tục không ngừng theo một hướng nhất định.',
    examples: [
      {
        ja: '物価が上がる一方で、生活が苦しくなる。',
        furigana: '<ruby>物価<rt>ぶっか</rt></ruby>が<ruby>上<rt>あ</rt></ruby>がる<ruby>一方<rt>いっぽう</rt></ruby>で、<ruby>生活<rt>せいかつ</rt></ruby>が<ruby>苦<rt>くる</rt></ruby>しくなる。',
        vi: 'Giá cả hàng hóa cứ tăng không ngừng, khiến cuộc sống ngày càng chật vật.',
      },
      {
        ja: '最近運動不足で、体重が増える一方だ。',
        furigana: '<ruby>最近<rt>さいきん</rt></ruby><ruby>運動不足<rt>うんどうぶそく</rt></ruby>で、<ruby>体重<rt>たいじゅう</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>える<ruby>一方<rt>いっぽう</rt></ruby>だ。',
        vi: 'Dạo này lười vận động nên cân nặng của tôi cứ tăng vùn vụt.',
      },
      {
        ja: '祖母の病気は悪化する一方で、とても心配です。',
        furigana: '<ruby>祖母<rt>そぼ</rt></ruby>の<ruby>病気<rt>びょうき</rt></ruby>は<ruby>悪化<rt>あっか</rt></ruby>する<ruby>一方<rt>いっぽう</rt></ruby>で、とても<ruby>心配<rt>しんぱい</rt></ruby>です。',
        vi: 'Bệnh tình của bà tôi cứ ngày một xấu đi khiến tôi vô cùng lo lắng.',
      },
    ],
  },
  {
    id: 'gram-31',
    title: '〜つつある',
    titleFurigana: '〜つつある',
    formula: 'V-masu (bỏ masu) + つつある',
    category: 'Biến đổi - Xu hướng',
    meaningVi: 'Đang dần dần, từng bước biến đổi...',
    explanationVi: 'Dùng với động từ biến đổi trạng thái trong văn viết hoặc thời sự, thể hiện tiến trình đang diễn ra từng chút một.',
    examples: [
      {
        ja: '景気は少しずつ回復しつつある。',
        furigana: '<ruby>景気<rt>けいき</rt></ruby>は<ruby>少<rt>すこ</rt></ruby>しずつ<ruby>回復<rt>かいふく</rt></ruby>しつつある。',
        vi: 'Tình hình kinh tế đang từng bước dần dần hồi phục.',
      },
      {
        ja: '地球温暖化の影響で、北極の氷が解けつつある。',
        furigana: '<ruby>地球温暖化<rt>ちきゅうおんだんか</rt></ruby>の<ruby>影響<rt>えいきょう</rt></ruby>で、<ruby>北極<rt>ほっきょく</rt></ruby>の<ruby>氷<rt>こおり</rt></ruby>が<ruby>解<rt>と</rt></ruby>けつつある。',
        vi: 'Do ảnh hưởng của hiện tượng nóng lên toàn cầu, băng ở Bắc Cực đang dần tan rã.',
      },
      {
        ja: '昔の伝統的な風習が忘れられつつあるのは寂しい。',
        furigana: '<ruby>昔<rt>むかし</rt></ruby>の<ruby>伝統的<rt>でんとうてき</rt></ruby>な<ruby>風習<rt>ふうしゅう</rt></ruby>が<ruby>忘<rt>わす</rt></ruby>れられつつあるのは<ruby>寂<rt>さび</rt></ruby>しい。',
        vi: 'Thật buồn khi những phong tục truyền thống xưa đang dần bị lãng quên.',
      },
    ],
  },
  {
    id: 'gram-32',
    title: '〜がちだ / 〜がちの',
    titleFurigana: '〜がちだ / 〜がちの',
    formula: 'V-masu (bỏ masu) / N + がちだ',
    category: 'Biến đổi - Xu hướng',
    meaningVi: 'Hay, thường hay bị... (xu hướng xấu ngoài ý muốn)',
    explanationVi: 'Diễn tả thói quen hoặc trạng thái dễ rơi vào tình trạng tiêu cực.',
    examples: [
      {
        ja: '冬は風邪を引きがちなので、体調管理に気をつけている。',
        furigana: '<ruby>冬<rt>ふゆ</rt></ruby>は<ruby>風邪<rt>かぜ</rt></ruby>を<ruby>引<rt>ひ</rt></ruby>きがちなので、<ruby>体調管理<rt>たいちょうかんり</rt></ruby>に<ruby>気<rt>き</rt></ruby>をつけている。',
        vi: 'Vào mùa đông rất hay bị cảm cúm nên tôi luôn chú ý giữ gìn sức khỏe.',
      },
      {
        ja: '一人暮らしだと野菜不足になりがちだ。',
        furigana: '<ruby>一人暮<rt>ひとりぐ</rt></ruby>らしだと<ruby>野菜不足<rt>やさいぶそく</rt></ruby>になりがちだ。',
        vi: 'Khi sống một mình thì ta thường hay bị thiếu hụt rau xanh.',
      },
      {
        ja: '彼は最近、会社を休みがちで心配だ。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>最近<rt>さいきん</rt></ruby>、<ruby>会社<rt>かいしゃ</rt></ruby>を<ruby>休<rt>やす</rt></ruby>みがちで<ruby>心配<rt>しんぱい</rt></ruby>だ。',
        vi: 'Dạo này anh ấy hay nghỉ làm nên tôi thấy rất lo lắng.',
      },
    ],
  },
  {
    id: 'gram-33',
    title: '〜気味(ぎみ)',
    titleFurigana: '〜<ruby>気味<rt>ぎみ</rt></ruby>',
    formula: 'V-masu (bỏ masu) / N + 気味',
    category: 'Biến đổi - Xu hướng',
    meaningVi: 'Có cảm giác hơi hơi... (tình trạng sức khỏe, tinh thần tiêu cực)',
    explanationVi: 'Cảm giác có chút triệu chứng nhẹ như hơi sốt, hơi mệt mỏi, hơi căng thẳng.',
    examples: [
      {
        ja: '今日は少し風邪気味なので、早く寝ることにします。',
        furigana: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>少<rt>すこ</rt></ruby>し<ruby>風邪気味<rt>かぜぎみ</rt></ruby>なので、<ruby>早<rt>はや</rt></ruby>く<ruby>寝<rt>ね</rt></ruby>ることにします。',
        vi: 'Hôm nay cảm giác hơi cảm cúm nên tôi quyết định sẽ đi ngủ sớm.',
      },
      {
        ja: '連日の残業で最近疲れ気味だ。',
        furigana: '<ruby>連日<rt>れんじつ</rt></ruby>の<ruby>残業<rt>ざんぎょう</rt></ruby>で<ruby>最近<rt>さいきん</rt></ruby><ruby>疲<rt>つか</rt></ruby>れ<ruby>気味<rt>ぎみ</rt></ruby>だ。',
        vi: 'Vì tăng ca liên miên mấy ngày qua nên dạo này tôi hơi mỏi mệt.',
      },
      {
        ja: '新入社員は緊張気味の表情で挨拶をした。',
        furigana: '<ruby>新入社員<rt>しんにゅうしゃいん</rt></ruby>は<ruby>緊張気味<rt>きんちょうぎみ</rt></ruby>の<ruby>表情<rt>ひょうじょう</rt></ruby>で<ruby>挨拶<rt>あいさつ</rt></ruby>をした。',
        vi: 'Nhân viên mới đã chào hỏi với nét mặt có phần hơi căng thẳng.',
      },
    ],
  },

  // 9. Nhóm: Cảm xúc - Phán đoán (34 - 45)
  {
    id: 'gram-34',
    title: '〜たまらない / 〜てたまらない',
    titleFurigana: '〜たまらない / 〜てたまらない',
    formula: 'V-te / A-i くて / A-na で + たまらない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: '...không chịu nổi, vô cùng...',
    explanationVi: 'Mức độ cảm xúc sinh lý hoặc tâm lý trào dâng mạnh mẽ đến mức không thể kìm nén được.',
    examples: [
      {
        ja: '今日は暑くてたまらないので、冷たいアイスが食べたい。',
        furigana: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>暑<rt>あつ</rt></ruby>くてたまらないので、<ruby>冷<rt>つめ</rt></ruby>たいアイスが<ruby>食<rt>た</rt></ruby>べたい。',
        vi: 'Hôm nay trời nóng không chịu nổi nên tôi muốn ăn một que kem mát lạnh.',
      },
      {
        ja: '家族に会いたくてたまらない。',
        furigana: '<ruby>家族<rt>かぞく</rt></ruby>に<ruby>会<rt>あ</rt></ruby>いたくてたまらない。',
        vi: 'Tôi nhớ gia đình da diết đến mức không thể nào chịu nổi.',
      },
      {
        ja: '試験の結果が心配でたまらない。',
        furigana: '<ruby>試験<rt>しけん</rt></ruby>の<ruby>結果<rt>けっか</rt></ruby>が<ruby>心配<rt>しんぱい</rt></ruby>でたまらない。',
        vi: 'Tôi vô cùng sốt ruột và lo lắng cho kết quả của bài thi.',
      },
    ],
  },
  {
    id: 'gram-35',
    title: '〜てならない',
    titleFurigana: '〜てならない',
    formula: 'V-te / A-i くて / A-na で + ならない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Hết sức, vô cùng... (tự nhiên cảm xúc dâng lên)',
    explanationVi: 'Cảm xúc tự nhiên xuất hiện trong lòng mà ý chí con người không thể ngăn chặn hay kiểm soát được.',
    examples: [
      {
        ja: '故郷の友人のことが思い出されてならない。',
        furigana: '<ruby>故郷<rt>こきょう</rt></ruby>の<ruby>友人<rt>ゆうじん</rt></ruby>のことが<ruby>思<rt>おも</rt></ruby>い<ruby>出<rt>だ</rt></ruby>されてならない。',
        vi: 'Hình bóng những người bạn nơi quê nhà cứ tự nhiên ùa về không dứt trong tâm trí tôi.',
      },
      {
        ja: '彼が無事に帰国できるか不安でならない。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>が<ruby>無事<rt>ぶじ</rt></ruby>に<ruby>帰国<rt>きこく</rt></ruby>できるか<ruby>不安<rt>ふあん</rt></ruby>でならない。',
        vi: 'Tôi hết sức bất an không biết liệu anh ấy có về nước an toàn hay không.',
      },
      {
        ja: '今回の事故は残念でなりません。',
        furigana: '<ruby>今回<rt>こんかい</rt></ruby>の<ruby>事故<rt>じこ</rt></ruby>は<ruby>残念<rt>ざんねん</rt></ruby>でなりません。',
        vi: 'Vụ tai nạn lần này thực sự vô cùng đáng tiếc.',
      },
    ],
  },
  {
    id: 'gram-36',
    title: '〜わけがない',
    titleFurigana: '〜わけがない',
    formula: 'Thể thông thường (A-na な, N の) + わけがない',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Tuyệt đối không thể nào có chuyện... (phủ định chắc nịch)',
    explanationVi: 'Dựa trên lý lẽ, logic rõ ràng để khẳng định 100% không thể nào có sự việc đó.',
    examples: [
      {
        ja: 'こんなに勉強したのだから、不合格になるわけがない。',
        furigana: 'こんなに<ruby>勉強<rt>べんきょう</rt></ruby>したのだから、<ruby>不合格<rt>ふごうかく</rt></ruby>になるわけがない。',
        vi: 'Đã ôn luyện kỹ đến mức này rồi thì không thể nào có chuyện thi trượt được.',
      },
      {
        ja: '彼が嘘をつくわけがありません。とても正直な人です。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>が<ruby>嘘<rt>うそ</rt></ruby>をつくわけがありません。とても<ruby>正直<rt>しょうじき</rt></ruby>な<ruby>人<rt>ひと</rt></ruby>です。',
        vi: 'Anh ấy tuyệt đối không thể nói dối, anh ấy là một người vô cùng chính trực.',
      },
      {
        ja: 'あんな高いレストランに毎日通えるわけがない。',
        furigana: 'あんな<ruby>高<rt>たか</rt></ruby>いレストランに<ruby>毎日<rt>まいにち</rt></ruby><ruby>通<rt>かよ</rt></ruby>えるわけがない。',
        vi: 'Làm sao có chuyện ngày nào cũng đi ăn ở nhà hàng đắt đỏ như thế được.',
      },
    ],
  },
  {
    id: 'gram-37',
    title: '〜はずだ / 〜はずがない',
    titleFurigana: '〜はずだ / 〜はずがない',
    formula: 'Thể thông thường (A-na な, N の) + はずだ',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'Chắc chắn là... / Chắc chắn không...',
    explanationVi: 'Phán đoán có căn cứ chặt chẽ rằng sự việc nhất định sẽ như vậy.',
    examples: [
      {
        ja: '彼は昨日飛行機に乗ったから、今頃もう到着しているはずだ。',
        furigana: '<ruby>彼<rt>かれ</rt></ruby>は<ruby>昨日<rt>きのう</rt></ruby><ruby>飛行機<rt>ひこうき</rt></ruby>に<ruby>乗<rt>の</rt></ruby>ったから、<ruby>今頃<rt>いまごろ</rt></ruby>もう<ruby>到着<rt>とうちゃく</rt></ruby>しているはずだ。',
        vi: 'Anh ấy đã lên máy bay từ hôm qua rồi nên tầm này chắc chắn đã hạ cánh.',
      },
      {
        ja: '取扱説明書を読めば、使い方が分かるはずです。',
        furigana: '<ruby>取扱説明書<rt>とりあつかいせつめいしょ</rt></ruby>を<ruby>読<rt>よ</rt></ruby>めば、<ruby>使<rt>つか</rt></ruby>い<ruby>方<rt>かた</rt></ruby>が<ruby>分<rt>わ</rt></ruby>かるはずです。',
        vi: 'Nếu đọc sách hướng dẫn thì chắc chắn bạn sẽ hiểu cách sử dụng.',
      },
      {
        ja: '真面目な彼がそんな悪いことをするはずがない。',
        furigana: '<ruby>真面目<rt>まじめ</rt></ruby>な<ruby>彼<rt>かれ</rt></ruby>がそんな<ruby>悪<rt>わる</rt></ruby>いことをするはずがない。',
        vi: 'Một người nghiêm túc như anh ấy chắc chắn không thể làm chuyện xấu xa như vậy.',
      },
    ],
  },
  {
    id: 'gram-38',
    title: '〜おそれがある',
    titleFurigana: '〜おそれがある',
    formula: 'V-ru / N の + おそれがある',
    category: 'Phán đoán - Cảm xúc',
    meaningVi: 'E rằng, có nguy cơ... (xảy ra điều xấu)',
    explanationVi: 'Dùng nhiều trong thông báo, bản tin thời sự để cảnh báo nguy cơ tiềm ẩn.',
    examples: [
      {
        ja: '台風が近づいており、大雨による洪水のおそれがある。',
        furigana: '<ruby>台風<rt>たいふう</rt></ruby>が<ruby>近<rt>ちか</rt></ruby>づいており、<ruby>大雨<rt>おおあめ</rt></ruby>による<ruby>洪水<rt>こうずい</rt></ruby>のおそれがある。',
        vi: 'Bão đang tiến vào gần, có nguy cơ xảy ra ngập lụt do mưa lớn.',
      },
      {
        ja: 'この新型ウイルスは急速に感染が広がるおそれがあります。',
        furigana: 'この<ruby>新型<rt>しんがた</rt></ruby>ウイルスは<ruby>急速<rt>きゅうそく</rt></ruby>に<ruby>感染<rt>かんせん</rt></ruby>が<ruby>広<rt>ひろ</rt></ruby>がるおそれがあります。',
        vi: 'Loại virus mới này có nguy cơ lây lan rất nhanh.',
      },
      {
        ja: '無理な運動を続けると、腰を痛めるおそれがある。',
        furigana: '<ruby>無理<rt>むり</rt></ruby>な<ruby>運動<rt>うんどう</rt></ruby>を<ruby>続<rt>つづ</rt></ruby>けると、<ruby>腰<rt>こし</rt></ruby>を<ruby>痛<rt>いた</rt></ruby>めるおそれがある。',
        vi: 'Nếu cứ vận động quá sức thì có nguy cơ làm chấn thương thắt lưng.',
      },
    ],
  },

  // 10. Nhóm: Quan hệ - Kèm theo (39 - 50+)
  {
    id: 'gram-39',
    title: '〜に伴って / 〜に伴い',
    titleFurigana: '〜に<ruby>伴<rt>ともな</rt></ruby>って / 〜に<ruby>伴<rt>ともな</rt></ruby>い',
    formula: 'V-ru / N + に伴って',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Cùng với, kéo theo... (biến đổi quy mô lớn)',
    explanationVi: 'Biểu thị sự biến đổi này kéo theo sự biến đổi khác trên diện rộng mang tính xã hội hoặc tự nhiên.',
    examples: [
      {
        ja: '少子高齢化が進むに伴って、社会保障費が増加している。',
        furigana: '<ruby>少子高齢化<rt>しょうしこうれいか</rt></ruby>が<ruby>進<rt>すす</rt></ruby>むに<ruby>伴<rt>ともな</rt></ruby>って、<ruby>社会保障費<rt>しゃかいほしょうひ</rt></ruby>が<ruby>増加<rt>ぞうか</rt></ruby>している。',
        vi: 'Cùng với sự gia tăng của già hóa dân số, chi phí an sinh xã hội cũng tăng theo.',
      },
      {
        ja: '都市の開発に伴い、緑地が減少している。',
        furigana: '<ruby>都市<rt>とし</rt></ruby>の<ruby>開発<rt>かいはつ</rt></ruby>に<ruby>伴<rt>ともな</rt></ruby>い、<ruby>緑地<rt>りょくち</rt></ruby>が<ruby>減少<rt>げんしょう</rt></ruby>している。',
        vi: 'Đi đôi với quá trình phát triển đô thị, diện tích cây xanh đang dần sụt giảm.',
      },
      {
        ja: '会社の規模拡大に伴って、新しい人材を採用した。',
        furigana: '<ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>規模拡大<rt>きぼかくだい</rt></ruby>に<ruby>伴<rt>ともな</rt></ruby>って、<ruby>新<rt>あたら</rt></ruby>しい<ruby>人材<rt>じんざい</rt></ruby>を<ruby>採用<rt>さいよう</rt></ruby>した。',
        vi: 'Cùng với việc mở rộng quy mô công ty, chúng tôi đã tuyển thêm nhiều nhân sự mới.',
      },
    ],
  },
  {
    id: 'gram-40',
    title: '〜につれて',
    titleFurigana: '〜につれて',
    formula: 'V-ru / N + につれて',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Càng... thì càng..., Cùng với tỉ lệ thuận...',
    explanationVi: 'Vế trước biến đổi kéo theo vế sau biến đổi tỷ lệ thuận một cách tự nhiên.',
    examples: [
      {
        ja: '年を取るにつれて、物忘れが多くなってきた。',
        furigana: '<ruby>年<rt>とし</rt></ruby>を<ruby>取<rt>と</rt></ruby>るにつれて、<ruby>物忘<rt>ものわす</rt></ruby>れが<ruby>多<rt>おお</rt></ruby>くなってきた。',
        vi: 'Càng có tuổi thì tôi lại càng hay đãng trí.',
      },
      {
        ja: '山を登るにつれて、気温がだんだん下がってくる。',
        furigana: '<ruby>山<rt>やま</rt></ruby>を<ruby>登<rt>のぼ</rt></ruby>るにつれて、<ruby>気温<rt>きおん</rt></ruby>がだんだん<ruby>下<rt>さ</rt></ruby>がってくる。',
        vi: 'Càng leo lên núi cao thì nhiệt độ càng hạ thấp dần.',
      },
      {
        ja: '日本語が上達するにつれて、会話が楽しくなってきた。',
        furigana: '<ruby>日本語<rt>にほんご</rt></ruby>が<ruby>上達<rt>じょうたつ</rt></ruby>するにつれて、<ruby>会話<rt>かいわ</rt></ruby>が<ruby>楽<rt>たの</rt></ruby>しくなってきた。',
        vi: 'Tiếng Nhật càng tiến bộ thì tôi lại càng thấy thích thú khi trò chuyện.',
      },
    ],
  },
  {
    id: 'gram-41',
    title: '〜をもとに(して)',
    titleFurigana: '〜をもとに(して)',
    formula: 'N + をもとに(して) / をもとにした N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Dựa trên, căn cứ trên chất liệu/cơ sở...',
    explanationVi: 'Lấy một sự việc có thật, ý tưởng hoặc dữ liệu làm nền tảng để sáng tạo ra tác phẩm mới.',
    examples: [
      {
        ja: 'この映画は実際に起きた事件をもとにして作られた。',
        furigana: 'この<ruby>映画<rt>えいが</rt></ruby>は<ruby>実際<rt>じっさい</rt></ruby>に<ruby>起<rt>お</rt></ruby>きた<ruby>事件<rt>じけん</rt></ruby>をもとにして<ruby>作<rt>つく</rt></ruby>られた。',
        vi: 'Bộ phim này được xây dựng dựa trên một vụ án có thật trong đời sống.',
      },
      {
        ja: 'アンケートの結果をもとに、新しい商品を開発した。',
        furigana: 'アンケートの<ruby>結果<rt>けっか</rt></ruby>をもとに、<ruby>新<rt>あたら</rt></ruby>しい<ruby>商品<rt>しょうひん</rt></ruby>を<ruby>開発<rt>かいはつ</rt></ruby>した。',
        vi: 'Dựa trên kết quả khảo sát, chúng tôi đã nghiên cứu phát triển sản phẩm mới.',
      },
      {
        ja: '日本の神話をもとにした小説が人気を集めている。',
        furigana: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>神話<rt>しんわ</rt></ruby>をもとにした<ruby>小説<rt>しょうせつ</rt></ruby>が<ruby>人気<rt>にんき</rt></ruby>を<ruby>集<rt>あつ</rt></ruby>めている。',
        vi: 'Cuốn tiểu thuyết sáng tác dựa trên thần thoại Nhật Bản đang được rất nhiều bạn đọc ưa chuộng.',
      },
    ],
  },
  {
    id: 'gram-42',
    title: '〜をめぐって / 〜をめぐる',
    titleFurigana: '〜をめぐって / 〜をめぐる',
    formula: 'N + をめぐって / をめぐる N',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Xoay quanh (vấn đề tranh luận, tranh chấp)',
    explanationVi: 'Nhiều người hoặc nhiều phe tranh cãi, đưa ra các ý kiến trái chiều xung quanh một vấn đề.',
    examples: [
      {
        ja: '親の遺産の配分をめぐって、兄弟で激しい争いが起きた。',
        furigana: '<ruby>親<rt>おや</rt></ruby>の<ruby>遺産<rt>いさん</rt></ruby>の<ruby>配分<rt>はいぶん</rt></ruby>をめぐって、<ruby>兄弟<rt>きょうだい</rt></ruby>で<ruby>激<rt>はげ</rt></ruby>しい<ruby>争<rt>あらそ</rt></ruby>いが<ruby>起<rt>お</rt></ruby>きた。',
        vi: 'Xoay quanh việc phân chia di sản của cha mẹ, giữa các anh em đã nổ ra tranh chấp dữ dội.',
      },
      {
        ja: '消費税の増税をめぐって国会で議論が続いている。',
        furigana: '<ruby>消費税<rt>しょうひぜい</rt></ruby>の<ruby>増税<rt>ぞうぜい</rt></ruby>をめぐって<ruby>国会<rt>こっかい</rt></ruby>で<ruby>議論<rt>ぎろん</rt></ruby>が<ruby>続<rt>つづ</rt></ruby>いている。',
        vi: 'Xoay quanh việc tăng thuế tiêu dùng, các cuộc thảo luận tại quốc hội vẫn đang tiếp diễn.',
      },
      {
        ja: '新しい工場の建設をめぐる住民の対立が深まっている。',
        furigana: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>工場<rt>こうじょう</rt></ruby>の<ruby>建設<rt>けんせつ</rt></ruby>をめぐる<ruby>住民<rt>じゅうみん</rt></ruby>の<ruby>対立<rt>たいりつ</rt></ruby>が<ruby>深<rt>ふか</rt></ruby>まっている。',
        vi: 'Sự mâu thuẫn giữa các cư dân xoay quanh việc xây dựng nhà máy mới ngày càng sâu sắc.',
      },
    ],
  },
  {
    id: 'gram-43',
    title: '〜にかかわる',
    titleFurigana: '〜にかかわる',
    formula: 'N + にかかわる',
    category: 'Quan hệ - Kèm theo',
    meaningVi: 'Liên quan đến, ảnh hưởng tới (vấn đề trọng đại)',
    explanationVi: 'Đi cùng các từ trọng đại như tính mạng (命), danh dự (名誉), tương lai (将来).',
    examples: [
      {
        ja: 'これは命にかかわる重大な病気です。',
        furigana: 'これは<ruby>命<rt>いのち</rt></ruby>にかかわる<ruby>重大<rt>じゅうだい</rt></ruby>な<ruby>病気<rt>びょうき</rt></ruby>です。',
        vi: 'Đây là căn bệnh nghiêm trọng ảnh hưởng trực tiếp đến tính mạng con người.',
      },
      {
        ja: '会社の信用にかかわる問題なので、迅速に対応しよう。',
        furigana: '<ruby>会社<rt>かいしゃ</rt></ruby>の<ruby>信用<rt>しんよう</rt></ruby>にかかわる<ruby>問題<rt>もんだい</rt></ruby>なので、<ruby>迅速<rt>じんそく</rt></ruby>に<ruby>対応<rt>たいおう</rt></ruby>しよう。',
        vi: 'Vì là vấn đề liên quan đến uy tín của công ty nên chúng ta phải xử lý thật nhanh chóng.',
      },
      {
        ja: '子どもの将来にかかわることだから、慎重に話し合うべきだ。',
        furigana: '<ruby>子<rt>こ</rt></ruby>どもの<ruby>将来<rt>しょうらい</rt></ruby>にかかわることだから、<ruby>慎重<rt>しんちょう</rt></ruby>に<ruby>話<rt>はな</rt></ruby>し<ruby>合<rt>あ</rt></ruby>うべきだ。',
        vi: 'Vì là chuyện liên quan đến cả tương lai của con cái nên cần phải bàn bạc hết sức cẩn trọng.',
      },
    ],
  },
  {
    id: 'gram-44',
    title: '〜を中心に / 〜を中心として',
    titleFurigana: '〜を<ruby>中心<rt>ちゅうしん</rt></ruby>に / 〜を<ruby>中心<rt>ちゅうしん</rt></ruby>として',
    formula: 'N + を中心に',
    category: 'Mức độ - Phạm vi',
    meaningVi: 'Lấy... làm trung tâm, tập trung chủ yếu vào...',
    explanationVi: 'Biểu thị đối tượng trung tâm nhất để triển khai hành động hay phong trào.',
    examples: [
      {
        ja: '東京を中心に関東地方で強い揺れを観測した。',
        furigana: '<ruby>東京<rt>とうきょう</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>に<ruby>関東地方<rt>かんとうちほう</rt></ruby>で<ruby>強<rt>つよ</rt></ruby>い<ruby>揺<rt>ゆ</rt></ruby>れを<ruby>観測<rt>かんそく</rt></ruby>した。',
        vi: 'Tâm chấn ghi nhận rung lắc mạnh ở vùng Kanto, chủ yếu tập trung tại Tokyo.',
      },
      {
        ja: '文法と読解を中心にして試験勉強を進めている。',
        furigana: '<ruby>文法<rt>ぶんぽう</rt></ruby>と<ruby>読解<rt>どっかい</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>にして<ruby>試験勉強<rt>しけんべんきょう</rt></ruby>を<ruby>進<rt>すす</rt></ruby>めている。',
        vi: 'Tôi đang tiến hành ôn thi tập trung chủ yếu vào phần ngữ pháp và đọc hiểu.',
      },
      {
        ja: '若者を中心としてその新しいアプリが流行している。',
        furigana: '<ruby>若者<rt>わかもの</rt></ruby>を<ruby>中心<rt>ちゅうしん</rt></ruby>としてその<ruby>新<rt>あたら</rt></ruby>しいアプリが<ruby>流行<rt>りゅうこう</rt></ruby>している。',
        vi: 'Ứng dụng mới đó đang thịnh hành rộng rãi, đặc biệt là trong giới trẻ.',
      },
    ],
  },
  {
    id: 'gram-45',
    title: '〜を通して / 〜を通じて',
    titleFurigana: '〜を<ruby>通<rt>とお</rt></ruby>して / 〜を<ruby>通<rt>つう</rt></ruby>じて',
    formula: 'N + を通して / を通じて',
    category: 'Mức độ - Phạm vi',
    meaningVi: '1. Thông qua (phương tiện, trung gian) | 2. Suốt cả (thời gian)',
    explanationVi: 'Nêu trung gian để đạt được tri thức, quan hệ hoặc trạng thái kéo dài liên tục suốt kỳ hạn.',
    examples: [
      {
        ja: 'ボランティア活動を通して、多くの素晴らしい友人に出会えた。',
        furigana: 'ボランティア<ruby>活動<rt>かつどう</rt></ruby>を<ruby>通<rt>とお</rt></ruby>して、<ruby>多<rt>おお</rt></ruby>くの<ruby>素晴<rt>すばら</rt></ruby>しい<ruby>友人<rt>ゆうじん</rt></ruby>に<ruby>出会<rt>であ</rt></ruby>えた。',
        vi: 'Thông qua hoạt động tình nguyện, tôi đã kết giao được với rất nhiều người bạn tuyệt vời.',
      },
      {
        ja: 'この地方は一年を通じて温暖で過ごしやすい。',
        furigana: 'この<ruby>地方<rt>ちほう</rt></ruby>は<ruby>一年<rt>いちねん</rt></ruby>を<ruby>通<rt>つう</rt></ruby>じて<ruby>温暖<rt>おんだん</rt></ruby>で<ruby>過<rt>す</rt></ruby>ごしやすい。',
        vi: 'Vùng đất này suốt cả năm khí hậu ôn hòa rất dễ chịu.',
      },
      {
        ja: 'インターネットを通じて世界中のニュースを瞬時に知ることができる。',
        furigana: 'インターネットを<ruby>通<rt>つう</rt></ruby>じて<ruby>世界中<rt>せかいじゅう</rt></ruby>のニュースを<ruby>瞬時<rt>しゅんじ</rt></ruby>に<ruby>知<rt>し</rt></ruby>ることができる。',
        vi: 'Thông qua Internet, ta có thể biết tức thì tin tức trên toàn thế giới.',
      },
    ],
  },
];

import { EXTRA_N3_GRAMMAR } from './n3GrammarFullList';
import { BATCH3_N3_GRAMMAR } from './mimikaraGrammarBatch3';

export const INITIAL_N3_GRAMMAR_ALL: GrammarItem[] = [
  ...INITIAL_N3_GRAMMAR,
  ...EXTRA_N3_GRAMMAR,
  ...BATCH3_N3_GRAMMAR,
];

export const INITIAL_GRAMMAR = INITIAL_N3_GRAMMAR_ALL;

