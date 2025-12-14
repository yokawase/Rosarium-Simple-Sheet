import { BrandData, CareType, Rose, RoseDefinition, ProductDefinition, CareTypeId, SoilDefinition } from './types';

// Based on the provided PDF and user request
export const BRAND_MASTER: Record<string, BrandData> = {
  "David Austin (UK)": { 
    label: "デビッド・オースチン (英国)", 
    varieties: [] 
  },
  "Meilland (France)": { 
    label: "メイアン (フランス)", 
    varieties: [] 
  },
  "Delbard (France)": { 
    label: "デルバール (フランス)", 
    varieties: [] 
  },
  "Guillot (France)": {
    label: "ギヨー (フランス)",
    varieties: []
  },
  "Rosa Orientis (Japan)": { 
    label: "ロサ・オリエンティス (日本)", 
    varieties: [] 
  },
  "Kawamoto Rose (Japan)": { 
    label: "河本バラ園 (日本)", 
    varieties: [] 
  },
  "Apple Roses (Japan)": {
    label: "アップルローゼス (日本)",
    varieties: []
  },
  "Tantau (Germany)": { 
    label: "タンタウ (ドイツ)", 
    varieties: [] 
  },
  "Kordes (Germany)": { 
    label: "コルデス (ドイツ)", 
    varieties: [] 
  },
  "Harkness (UK)": {
    label: "ハークネス (英国)",
    varieties: []
  },
  "Keisei Rose (Japan)": { 
    label: "京成バラ園芸 (日本)", 
    varieties: [] 
  },
  "Rose Farm Keiji (Japan)": {
    label: "Rose Farm Keiji (日本)",
    varieties: []
  },
  "USA/Other": {
    label: "アメリカ・その他",
    varieties: []
  },
  "Old Rose": {
    label: "オールドローズ",
    varieties: []
  },
  "Unknown": {
    label: "不明・その他",
    varieties: []
  }
};

export const CARE_TYPES: CareType[] = [
  { id: 'pruning', label: '剪定', color: '#22c55e', bgColor: 'bg-green-500', iconName: 'Scissors' },
  { id: 'repot', label: '鉢替え', color: '#fb923c', bgColor: 'bg-orange-400', iconName: 'Sprout' },
  { id: 'soil', label: '用土替え', color: '#854d0e', bgColor: 'bg-amber-700', iconName: 'Shovel' },
  { id: 'liquid', label: '液肥', color: '#a855f7', bgColor: 'bg-purple-500', iconName: 'Droplet' },
  { id: 'solid', label: '置肥', color: '#3b82f6', bgColor: 'bg-blue-500', iconName: 'Hexagon' },
  { id: 'vital', label: '活力剤', color: '#f472b6', bgColor: 'bg-pink-400', iconName: 'Sparkles' },
  { id: 'pest', label: '殺虫/殺菌', color: '#facc15', bgColor: 'bg-yellow-400', iconName: 'ShieldCheck' },
  { id: 'blooming', label: '開花', color: '#ef4444', bgColor: 'bg-red-500', iconName: 'Flower2' },
];

// --- Product Database (Based on Text File 1) ---
export const PRODUCT_LIBRARY: Record<string, ProductDefinition> = {
  // Liquid Fertilizers
  'hypo_bifun': { id: 'hypo_bifun', typeId: 'liquid', name: '微粉ハイポネックス', maker: 'ハイポネックスジャパン', description: 'カリ・カルシウム強化。暑さ寒さ対策、茎葉の硬化。', color: '#1e40af' }, // Dark Blue
  'penta_garden': { id: 'penta_garden', typeId: 'liquid', name: 'ペンタガーデン', maker: '日清ガーデンメイト', description: 'ALA配合。日陰や曇天時の光合成促進。', color: '#0ea5e9' }, // Sky Blue
  'hypo_geneki': { id: 'hypo_geneki', typeId: 'liquid', name: 'ハイポネックス原液', maker: 'ハイポネックスジャパン', description: 'バランスの取れた標準液肥。', color: '#3b82f6' }, // Blue

  // Solid Fertilizers
  'ib_baranoie': { id: 'ib_baranoie', typeId: 'solid', name: 'バラの家IB肥料', maker: '三菱商事アグリサービス', description: '安定性No.1。プロ仕様のスタンダード。', color: '#4f46e5' }, // Indigo
  'biogold': { id: 'biogold', typeId: 'solid', name: 'バイオゴールド', maker: 'タクト', description: '天然有機肥料。土壌改良と花色向上。', color: '#854d0e' }, // Brown
  'ib_chikara': { id: 'ib_chikara', typeId: 'solid', name: 'IBのチカラ', maker: '花ごころ', description: '室内・ベランダ向け。清潔設計。', color: '#6366f1' }, // Indigo-light
  'myrose_solid': { id: 'myrose_solid', typeId: 'solid', name: 'マイローズ ばらの肥料', maker: '住友化学園芸', description: 'リリースコントロール技術。腐植酸配合。', color: '#be185d' }, // Pink-dark

  // Vitalizers
  'menedael': { id: 'menedael', typeId: 'vital', name: 'メネデール', maker: 'メネデール', description: '二価鉄イオン。発根・植え付け時の必須アイテム。', color: '#ca8a04' }, // Dark Yellow
  'liquidus': { id: 'liquidus', typeId: 'vital', name: 'リキダス', maker: 'ハイポネックスジャパン', description: 'コリン・フルボ酸・Ca。夏バテ回復。', color: '#ea580c' }, // Orange
  'fujimin': { id: 'fujimin', typeId: 'vital', name: 'フジミン', maker: 'JCE', description: '高濃度フルボ酸。土壌改善・塩類集積対策。', color: '#78350f' }, // Dark Brown
  'stress_block': { id: 'stress_block', typeId: 'vital', name: 'ストレスブロック', maker: 'ハイポネックスジャパン', description: 'バイオスティミュラント。環境ストレス耐性強化。', color: '#db2777' }, // Pink

  // Pesticides / Fungicides
  'benica_x': { id: 'benica_x', typeId: 'pest', name: 'ベニカXガード粒剤', maker: '住友化学園芸', description: '予防・免疫誘導(B.subtilis)。', color: '#ef4444' }, // Red
  'ortran_dx': { id: 'ortran_dx', typeId: 'pest', name: 'オルトランDX粒剤', maker: '住友化学園芸', description: '浸透移行性。アブラムシ・コガネムシ幼虫。', color: '#f97316' }, // Orange Red
  'mospilan_topjin': { id: 'mospilan_topjin', typeId: 'pest', name: 'モスピラン・トップジンM', maker: '住友化学園芸', description: '治療＋殺虫。病気の進行停止。', color: '#10b981' }, // Emerald
  'attack_one': { id: 'attack_one', typeId: 'pest', name: 'カダン アタックワンAL', maker: 'フマキラー', description: '速効性・密着。オールインワン。', color: '#f59e0b' }, // Amber
};

// --- Soil Library ---
export const SOIL_LIBRARY: SoilDefinition[] = [
  // Base Soils
  { id: 'akadama_hard', name: '硬質赤玉土', category: 'base' },
  { id: 'akadama_soft', name: '赤玉土(一般)', category: 'base' },
  { id: 'kanuma', name: '鹿沼土', category: 'base' },
  
  // Organic Matter
  { id: 'peatmoss', name: 'ピートモス', category: 'organic' },
  { id: 'coco_peat', name: 'ココピート', category: 'organic' },
  { id: 'compost_horse', name: '馬糞堆肥', category: 'organic' },
  { id: 'compost_cow', name: '牛糞堆肥', category: 'organic' },
  { id: 'compost_bark', name: 'バーク堆肥', category: 'organic' },
  { id: 'fuyoudo', name: '腐葉土', category: 'organic' },

  // Adjustment / Drainage
  { id: 'perlite', name: 'パーライト', category: 'adjust' },
  { id: 'vermiculite', name: 'バーミキュライト', category: 'adjust' },
  { id: 'zeolite', name: 'ゼオライト', category: 'adjust' },
  { id: 'kuntan', name: 'もみ殻くん炭', category: 'adjust' },
  { id: 'kanitstuchi', name: 'カニ殻', category: 'adjust' },
];

// --- Rose Database ---
export const ROSE_LIBRARY: RoseDefinition[] = [
  // Meilland
  { name: 'ピース', kana: 'ぴーす', brand: 'Meilland (France)', year: 1945, description: '20世紀を代表する銘花。巨大輪、クリームイエローにピンクの覆輪。' },
  { name: 'ミミ・エデン', kana: 'みみえでん', brand: 'Meilland (France)', year: 2001, description: '白にピンクの覆輪、うどんこ病に弱いが人気。' },
  { name: 'パパ・メイアン', kana: 'ぱぱめいあん', brand: 'Meilland (France)', year: 1963, description: '黒赤の代表種、濃厚なダマスク香。殿堂入り。' },
  { name: 'マリア・カラス', kana: 'まりあからす', brand: 'Meilland (France)', year: 1965, description: '往年のオペラ歌手に捧げられた強健種。' },
  { name: 'カクテル', kana: 'かくてる', brand: 'Meilland (France)', year: 1957, description: '赤に中心が黄色、一重咲き。殿堂入り。' },
  { name: 'ボニカ \'82', kana: 'ぼにか82', brand: 'Meilland (France)', year: 1981, description: '修景バラのパイオニア。非常に強健。' },
  { name: 'ピエール・ドゥ・ロンサール', kana: 'ぴえーるどぅろんさーる', brand: 'Meilland (France)', year: 1985, description: '世界で最も愛されるつるバラ。カップ咲き復権の象徴。' },
  { name: 'レオナルド・ダ・ヴィンチ', kana: 'れおなるどだゔぃんち', brand: 'Meilland (France)', year: 1993, description: 'ロゼット咲き、花持ち良く雨に強い。' },
  { name: 'イブ・ピアジェ', kana: 'いぶぴあじぇ', brand: 'Meilland (France)', year: 1983, description: '芍薬のような花姿、香水の原料にもなる強香。' },
  { name: 'ボレロ', kana: 'ぼれろ', brand: 'Meilland (France)', year: 2004, description: '純白、フルーツとローズの強香、高耐病性。' },
  
  // Delbard
  { name: 'ナエマ', kana: 'なえま', brand: 'Delbard (France)', year: 1991, description: 'ゲランの香水名。圧倒的なフルーツ香。つるバラとして伸長力大。' },
  { name: 'クロード・モネ', kana: 'くろーどもね', brand: 'Delbard (France)', year: 1992, description: 'ピンクと黄色の絞り。ペインターシリーズ。' },
  { name: 'シャンテ・ロゼ・ミサト', kana: 'しゃんてろぜみさと', brand: 'Delbard (France)', year: 2004, description: '直立性で場所をとらない。強香。' },
  { name: 'ラ・パリジェンヌ', kana: 'らぱりじぇんぬ', brand: 'Delbard (France)', year: 2009, description: 'オレンジと黄色のグラデーション。高い耐病性。' },
  { name: 'ローズ・ポンパドゥール', kana: 'ろーずぽんぱどぅーる', brand: 'Delbard (France)', year: 2009, description: '鮮やかなピンク、カップ咲き。耐病性と香りの両立。' },
  { name: 'ビアンヴニュ', kana: 'びあんゔにゅ', brand: 'Delbard (France)', year: 2010, description: 'フリルのあるピンクの大輪、強香。' },

  // Guillot
  { name: 'ラ・フランス', kana: 'らふらんす', brand: 'Guillot (France)', year: 1867, description: '初のハイブリッド・ティー。モダンローズの起源。' },
  { name: 'ソニア・リキエル', kana: 'そにありきえる', brand: 'Guillot (France)', year: 1995, description: '蜂蜜とローズの香り。ジェネロサシリーズ。' },
  
  // Kordes
  { name: 'アイスバーグ', kana: 'あいすばーぐ', brand: 'Kordes (Germany)', year: 1958, description: '「白雪姫」。世界で最も普及した白バラ。殿堂入り。' },
  { name: 'アンジェラ', kana: 'あんじぇら', brand: 'Kordes (Germany)', year: 1984, description: 'カップ咲きの多花性、極めて強健。初心者向け。' },
  { name: 'ノヴァーリス', kana: 'のゔぁーりす', brand: 'Kordes (Germany)', year: 2010, description: '「最強の青バラ」。ADR受賞。' },
  { name: 'クリスティアーナ', kana: 'くりすてぃあーな', brand: 'Kordes (Germany)', year: 2013, description: '繊細なピンク、強香。ADR受賞。' },
  { name: 'ポンポネッラ', kana: 'ぽんぽねっら', brand: 'Kordes (Germany)', year: 2005, description: '濃いピンクのディープカップ咲き。ADR受賞。' },

  // Tantau
  { name: 'レイニーブルー', kana: 'れいにーぶるー', brand: 'Tantau (Germany)', year: 2012, description: '繊細な藤色、房咲き。日本で大人気。' },
  { name: 'ノスタルジー', kana: 'のすたるじー', brand: 'Tantau (Germany)', year: 1995, description: 'チェリーレッドと白の複色、独特の存在感。' },
  { name: 'アイスフォーゲル', kana: 'あいすふぉーげる', brand: 'Tantau (Germany)', year: 2016, description: '波打つ花弁、ブルーイングする藤色、強香。' },

  // David Austin
  { name: 'コンスタンス・スプライ', kana: 'こんすたんすすぷらい', brand: 'David Austin (UK)', year: 1961, description: 'ER第1号。一季咲き、ミルラ香。' },
  { name: 'グラハム・トーマス', kana: 'ぐらはむとーます', brand: 'David Austin (UK)', year: 1983, description: '深い黄色、殿堂入り。ER普及の立役者。' },
  { name: 'メアリー・ローズ', kana: 'めありーろーず', brand: 'David Austin (UK)', year: 1983, description: 'ピンクの標準花。多くの変異種の親。' },
  { name: 'ヘリテージ', kana: 'へりてーじ', brand: 'David Austin (UK)', year: 1984, description: 'ソフトピンク、カップ咲き。花弁が散りやすい。' },
  { name: 'アブラハム・ダービー', kana: 'あぶらはむだーびー', brand: 'David Austin (UK)', year: 1985, description: 'アプリコットピンク、大輪、フルーツ香。' },
  { name: 'ピルグリム', kana: 'ぴるぐりむ', brand: 'David Austin (UK)', year: 1991, description: '繊細なレモンイエロー、多弁のロゼット咲き。' },
  { name: 'ゴールデン・セレブレーション', kana: 'ごーるでんせれぶれーしょん', brand: 'David Austin (UK)', year: 1992, description: '巨大輪の黄金色、濃厚な香り。' },
  { name: 'ジュード・ジ・オブスキュア', kana: 'じゅーどじおぶすきゅあ', brand: 'David Austin (UK)', year: 1995, description: 'グアバと白ワインの独特な強香。球状の花。' },
  { name: 'レディ・エマ・ハミルトン', kana: 'れでぃえまはみるとん', brand: 'David Austin (UK)', year: 2005, description: 'オレンジ系、非常に強いフルーツ香、コンパクト。' },
  { name: 'クレア・オースチン', kana: 'くれあおーすちん', brand: 'David Austin (UK)', year: 2007, description: 'クリーミーホワイト、つるバラとして優秀。' },
  { name: 'ムンステッド・ウッド', kana: 'むんすてっどうっど', brand: 'David Austin (UK)', year: 2007, description: '深いクリムゾンレッド、ベルベットのような質感、強香。' },
  { name: 'ボスコベル', kana: 'ぼすこべる', brand: 'David Austin (UK)', year: 2012, description: 'サーモンピンク、整ったロゼット咲き、直立性。' },
  { name: 'オリビア・ローズ・オースチン', kana: 'おりびあろーずおーすちん', brand: 'David Austin (UK)', year: 2014, description: '次世代のER。極めて高い耐病性と早咲き性。' },
  { name: 'デスデモーナ', kana: 'ですでもーな', brand: 'David Austin (UK)', year: 2015, description: '淡いピーチから白へ。非常に強い香り。' },
  { name: 'ジエンシェントマリナー', kana: 'じえんしぇんとまりなー', brand: 'David Austin (UK)', year: 2015, description: '輝くようなピンク、多弁。非常に強健で花付きが良い。' },
  { name: 'ロアルド・ダール', kana: 'ろあるどだーる', brand: 'David Austin (UK)', year: 2016, description: 'ピーチ色、カップ咲き。連続開花性に優れる。' },

  // Keisei Rose
  { name: '聖火', kana: 'せいか', brand: 'Keisei Rose (Japan)', year: 1966, description: '紅白のコントラスト。日本初の国際的な賞受賞。' },
  { name: '芳純', kana: 'ほうじゅん', brand: 'Keisei Rose (Japan)', year: 1981, description: '「香りのバラ」の代名詞。資生堂の香水原料。' },
  { name: 'うらら', kana: 'うらら', brand: 'Keisei Rose (Japan)', year: 1993, description: '濃いピンク。驚異的な花付きと強健さ。' },
  { name: 'しのぶれど', kana: 'しのぶれど', brand: 'Keisei Rose (Japan)', year: 2006, description: '青藤色。和の風情を感じさせる花形。' },
  { name: '快挙', kana: 'かいきょ', brand: 'Keisei Rose (Japan)', year: 2011, description: '黄色の大輪。コンテスト用としても人気。' },

  // Rosa Orientis
  { name: 'シェエラザード', kana: 'しぇえらざーど', brand: 'Rosa Orientis (Japan)', year: 2013, description: '紫ピンク、剣弁ごとの切れ込み。スパイシー香。' },
  { name: 'オデュッセイア', kana: 'おでゅっせいあ', brand: 'Rosa Orientis (Japan)', year: 2013, description: '黒赤の波状弁。つるバラとしても利用可。' },
  { name: 'ダフネ', kana: 'だふね', brand: 'Rosa Orientis (Japan)', year: 2014, description: 'サーモンピンクから退色。非常に強健。' },
  { name: 'マイローズ', kana: 'まいろーず', brand: 'Rosa Orientis (Japan)', year: 2019, description: '真紅。次世代の耐病性「タイプ0」。コンパクト。' },
  { name: 'リュシオール', kana: 'りゅしおーる', brand: 'Rosa Orientis (Japan)', year: 2020, description: '黄色、小輪で連続開花性に優れる。' },
  { name: 'リラ', kana: 'りら', brand: 'Rosa Orientis (Japan)', year: 2020, description: '藤色バラの革命。高い耐病性を持つ。' },

  // Kawamoto
  { name: 'ガブリエル', kana: 'がぶりえる', brand: 'Kawamoto Rose (Japan)', year: 2008, description: '純白に中心が淡い紫。天使の羽のような花弁、強香。' },
  { name: 'ルシファー', kana: 'るしふぁー', brand: 'Kawamoto Rose (Japan)', year: 2008, description: '濃い紫。栽培難易度は高いが美しさは至高。' },
  { name: 'ラ・マリエ', kana: 'らまりえ', brand: 'Kawamoto Rose (Japan)', year: 2008, description: 'ライラックピンク、フリル咲き、香りが良い。' },
  { name: 'ローズアラフランセーズ', kana: 'ろーずあらふらんせーず', brand: 'Kawamoto Rose (Japan)', year: 2019, description: 'アンティーク調のピンク、カップ咲き。エレガントな雰囲気。' },
  { name: 'シュクレ', kana: 'しゅくれ', brand: 'Kawamoto Rose (Japan)', year: 2016, description: '砂糖菓子のような淡いピンク、コロコロとしたカップ咲き。' },
  { name: 'レヴリ', kana: 'れゔり', brand: 'Kawamoto Rose (Japan)', year: 2016, description: 'ブラウンがかったモーヴピンク。シックな色合い。' },
  { name: 'コンフィチュール', kana: 'こんふぃちゅーる', brand: 'Kawamoto Rose (Japan)', year: 2018, description: 'フルーティな香りと、とろけるような花色。' },

  // Apple Roses
  { name: 'パウル・クレー', kana: 'ぱうるくれー', brand: 'Apple Roses (Japan)', year: 2014, description: 'オレンジとピンクの混ざる複雑な色合い。コンパクト。' },
  { name: 'メーヴェ', kana: 'めーゔぇ', brand: 'Apple Roses (Japan)', year: 2015, description: '白に近いピンク、野バラのような風情を持つシュラブ。' },
  { name: '楼蘭', kana: 'ろうらん', brand: 'Apple Roses (Japan)', year: 2013, description: '深い赤紫色、ダマスクの強香。ミステリアスな雰囲気。' },

  // Others
  { name: 'ダブル・デライト', kana: 'だぶるでらいと', brand: 'USA/Other', year: 1977, description: 'クリーム色に赤の覆輪。強いフルーツ香。殿堂入り。' },
  { name: 'ノックアウト', kana: 'のっくあうと', brand: 'USA/Other', year: 2000, description: '驚異的な耐病性。メンテナンスフリー。殿堂入り。' },
  { name: 'グリーン・アイス', kana: 'ぐりーんあいす', brand: 'Old Rose', year: 1971, description: 'ミニバラ。白からグリーンへ変化。非常に丈夫。' },
  { name: '粉粧楼', kana: 'ふんしょうろう', brand: 'Old Rose', year: 1800, description: 'チャイナ系。薄いピンクのカップ咲き、パウダリーな香り。雨に弱い。' },
  { name: 'ラ・レーヌ・ビクトリア', kana: 'られーぬびくとりあ', brand: 'Old Rose', year: 1872, description: 'ブルボン系。鮮やかなディープピンクのカップ咲き。コロコロとした愛らしい花形。' },
];

// Based on user request
export const INITIAL_ROSES: Rose[] = [
  { id: '1', name: "ラ・レーヌ・ビクトリア", brand: "Old Rose", year: 1872, description: "鮮やかなディープピンクのカップ咲き。", acquisitionDate: "2020-05-01" },
  { id: '2', name: "ピエール・ドゥ・ロンサール", brand: "Meilland (France)", year: 1985, description: "殿堂入りのつるバラ。クリーム白にピンクの覆輪。", acquisitionDate: "2019-12-10" },
  { id: '3', name: "ローズ・ポンパドゥール", brand: "Delbard (France)", year: 2009, description: "鮮やかなピンクのロゼット咲き、強香。", acquisitionDate: "2021-02-15" },
  { id: '4', name: "オデュッセイア", brand: "Rosa Orientis (Japan)", year: 2013, description: "深みのある黒赤色の波状弁。", acquisitionDate: "2020-11-20" },
  { id: '5', name: "レイニーブルー", brand: "Tantau (Germany)", year: 2012, description: "淡い藤色の小中輪房咲き。", acquisitionDate: "2022-03-01" },
  { id: '6', name: "ダフネ", brand: "Rosa Orientis (Japan)", year: 2014, description: "サーモンピンクからグリーンへ退色。", acquisitionDate: "2021-05-10" },
  { id: '7', name: "粉粧楼", brand: "Old Rose", year: 1800, description: "薄いピンクのカップ咲き、雨に弱い。", acquisitionDate: "2020-04-01" },
  { id: '8', name: "ガブリエル", brand: "Kawamoto Rose (Japan)", year: 2008, description: "純白に中心が淡い紫、天使の羽。", acquisitionDate: "2021-10-01" },
  { id: '9', name: "メアリーレノックス", brand: "Unknown", description: "詳細不明の品種（ユーザー登録）", acquisitionDate: "2023-01-01" },
  { id: '10', name: "ジエンシェントマリナー", brand: "David Austin (UK)", year: 2015, description: "輝くようなピンク、多弁、強健。", acquisitionDate: "2023-02-14" },
  { id: '11', name: "ロアルド・ダール", brand: "David Austin (UK)", year: 2016, description: "ピーチ色、カップ咲き。", acquisitionDate: "2023-03-01" },
  { id: '12', name: "アイスバーグ", brand: "Kordes (Germany)", year: 1958, description: "世界で最も普及した白バラ。", acquisitionDate: "2019-01-01" },
  { id: '13', name: "ボレロ", brand: "Meilland (France)", year: 2004, description: "純白、強香、高耐病性。", acquisitionDate: "2022-05-20" },
  { id: '14', name: "リラ", brand: "Rosa Orientis (Japan)", year: 2020, description: "藤色バラの革命。高い耐病性。", acquisitionDate: "2022-11-03" },
  { id: '15', name: "パウル・クレー", brand: "Apple Roses (Japan)", year: 2014, description: "オレンジとピンクの混ざる複雑な色合い。", acquisitionDate: "2023-04-10" },
  { id: '16', name: "メーヴェ", brand: "Apple Roses (Japan)", year: 2015, description: "白に近いピンク、野バラのような風情。", acquisitionDate: "2023-05-01" },
  { id: '17', name: "楼蘭", brand: "Apple Roses (Japan)", year: 2013, description: "深い赤紫色、ダマスクの強香。", acquisitionDate: "2021-06-15" },
  { id: '18', name: "ローズアラフランセーズ", brand: "Kawamoto Rose (Japan)", year: 2019, description: "アンティーク調のピンク。", acquisitionDate: "2023-06-01" },
  { id: '19', name: "ガブリエル２", brand: "Unknown", description: "ユーザー定義品種", acquisitionDate: "2023-07-01" },
  { id: '20', name: "シュクレ", brand: "Kawamoto Rose (Japan)", year: 2016, description: "砂糖菓子のような淡いピンク。", acquisitionDate: "2022-09-01" },
  { id: '21', name: "レヴリ", brand: "Kawamoto Rose (Japan)", year: 2016, description: "ブラウンがかったモーヴピンク。", acquisitionDate: "2022-10-10" },
  { id: '22', name: "コンフィチュール", brand: "Kawamoto Rose (Japan)", year: 2018, description: "フルーティな香り、とろける花色。", acquisitionDate: "2023-08-01" },
];