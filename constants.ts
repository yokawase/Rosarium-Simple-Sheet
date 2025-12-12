import { BrandData, CareType, Rose, CareEvent } from './types';

// Based on the provided PDF and user request
export const BRAND_MASTER: Record<string, BrandData> = {
  "David Austin (UK)": { 
    label: "デビッド・オースチン (英国)", 
    varieties: [
      "ジ・エイシェント・マリナー", "ロアルド・ダール", "メアリー・レノックス", "オリビア・ローズ・オースチン", 
      "ボスコベル", "デスデモーナ", "コンスタンス・スプライ", "グラハム・トーマス"
    ] 
  },
  "Meilland (France)": { 
    label: "メイアン (フランス)", 
    varieties: [
      "ピエール・ドゥ・ロンサール", "ボレロ", "マイ・ガーデン", "ミミ・エデン", "パパ・メイアン"
    ] 
  },
  "Delbard (France)": { 
    label: "デルバール (フランス)", 
    varieties: [
      "ローズ・ポンパドゥール", "ナエマ", "クロード・モネ", "ラ・パリジェンヌ", "シャンテ・ロゼ・ミサト"
    ] 
  },
  "Rosa Orientis (Japan)": { 
    label: "ロサ・オリエンティス (日本)", 
    varieties: [
      "オデュッセイア", "ダフネ", "リラ", "楼蘭", "シェエラザード", "マイローズ", "シャリマー", "リュシオール"
    ] 
  },
  "Kawamoto Rose (Japan)": { 
    label: "河本バラ園 (日本)", 
    varieties: [
      "ガブリエル", "ローズ・アラ・フランセーズ", "シュクレ", "レヴリ", "コンフィチュール", "ルシファー", "ラ・マリエ"
    ] 
  },
  "Apple Roses (Japan)": {
    label: "アップルローゼス (日本)",
    varieties: ["パウル・クレー", "メーヴェ"]
  },
  "Tantau (Germany)": { 
    label: "タンタウ (ドイツ)", 
    varieties: ["レイニーブルー", "ノスタルジー", "アシュラム", "アイスフォーゲル"] 
  },
  "Kordes (Germany)": { 
    label: "コルデス (ドイツ)", 
    varieties: ["アイスバーグ", "ノヴァーリス", "クリスティアーナ", "ポンポネッラ"] 
  },
  "Old Rose": {
    label: "オールドローズ / その他",
    varieties: ["ラ・レーヌ・ビクトリア", "粉粧楼", "グリーン・アイス"]
  },
  "Keisei Rose (Japan)": { 
    label: "京成バラ園芸 (日本)", 
    varieties: ["聖火", "芳純", "うらら", "しのぶれど", "快挙"] 
  }
};

export const CARE_TYPES: CareType[] = [
  { id: 'pruning', label: '剪定', color: '#22c55e', bgColor: 'bg-green-500', iconName: 'Scissors' },
  { id: 'repot', label: '植え替え', color: '#fb923c', bgColor: 'bg-orange-400', iconName: 'Shovel' },
  { id: 'liquid', label: '液肥', color: '#a855f7', bgColor: 'bg-purple-500', iconName: 'Droplet' },
  { id: 'solid', label: '置肥', color: '#3b82f6', bgColor: 'bg-blue-500', iconName: 'CircleDot' },
  { id: 'vital', label: '活力剤', color: '#f472b6', bgColor: 'bg-pink-400', iconName: 'Sparkles' },
  { id: 'pest', label: '殺虫剤', color: '#facc15', bgColor: 'bg-yellow-400', iconName: 'BugOff' },
  { id: 'blooming', label: '開花', color: '#ef4444', bgColor: 'bg-red-500', iconName: 'Flower2' },
];

export const INITIAL_ROSES: Rose[] = [
  { 
    id: '1', name: "ラ・レーヌ・ビクトリア", brand: "Old Rose", year: 1872, 
    description: "ブルボン系。鮮やかなディープピンクのカップ咲き。コロコロとした愛らしい花形と濃厚な香り。", acquisitionDate: "2020-05-01" 
  },
  { 
    id: '2', name: "ピエール・ドゥ・ロンサール", brand: "Meilland (France)", year: 1985, 
    description: "殿堂入りのつるバラ。クリーム白にピンクの覆輪。世界で最も愛されるバラの一つ。", acquisitionDate: "2019-12-10" 
  },
  { 
    id: '3', name: "ローズ・ポンパドゥール", brand: "Delbard (France)", year: 2009, 
    description: "鮮やかなピンクのロゼット咲き。濃厚なフルーツとローズの香りが魅力。", acquisitionDate: "2021-02-15" 
  },
  { 
    id: '4', name: "オデュッセイア", brand: "Rosa Orientis (Japan)", year: 2013, 
    description: "深みのある黒赤色の波状弁。夏の花付きも良く、スパイシーな香りを持つ。", acquisitionDate: "2020-11-20" 
  },
  { 
    id: '5', name: "レイニーブルー", brand: "Tantau (Germany)", year: 2012, 
    description: "淡い藤色の小中輪房咲き。しなやかな枝で誘引しやすく、花付き抜群。", acquisitionDate: "2022-03-01" 
  },
  { 
    id: '6', name: "ダフネ", brand: "Rosa Orientis (Japan)", year: 2014, 
    description: "サーモンピンクからグリーンへ退色する過程が美しい。非常に強健で育てやすい。", acquisitionDate: "2021-05-10" 
  },
  { 
    id: '7', name: "粉粧楼", brand: "Old Rose", year: 1900, 
    description: "チャイナ系。薄いピンクの繊細な花弁。雨に弱いが、その儚げな美しさと香りは格別。", acquisitionDate: "2018-04-01" 
  },
  { 
    id: '8', name: "ガブリエル", brand: "Kawamoto Rose (Japan)", year: 2008, 
    description: "純白に中心が淡い紫。大天使の名を持つ。独特の強い香りと神々しい美しさ。", acquisitionDate: "2019-10-15" 
  },
  { 
    id: '9', name: "メアリー・レノックス", brand: "David Austin (UK)", year: 2021, 
    description: "「秘密の花園」の主人公の名を冠する。オールドローズの魅力を持つピンク花。", acquisitionDate: "2023-01-20" 
  },
  { 
    id: '10', name: "ジ・エイシェント・マリナー", brand: "David Austin (UK)", year: 2015, 
    description: "大輪のピンク。中心が濃くなる。非常に多花性で強健なシュラブ。", acquisitionDate: "2022-12-01" 
  },
  { 
    id: '11', name: "ロアルド・ダール", brand: "David Austin (UK)", year: 2016, 
    description: "ピーチ色のカップ咲き。素晴らしい四季咲き性とフルーティな香り。", acquisitionDate: "2023-02-10" 
  },
  { 
    id: '12', name: "アイスバーグ", brand: "Kordes (Germany)", year: 1958, 
    description: "純白のフロリバンダ。殿堂入り。「白雪姫」の名を持つ世界最高の実用バラ。", acquisitionDate: "2015-05-05" 
  },
  { 
    id: '13', name: "ボレロ", brand: "Meilland (France)", year: 2004, 
    description: "純白のロゼット咲き。トロピカルフルーツの濃厚な香り。コンパクトで耐病性も強い。", acquisitionDate: "2021-06-15" 
  },
  { 
    id: '14', name: "リラ", brand: "Rosa Orientis (Japan)", year: 2020, 
    description: "藤色バラの耐病性を革命的に高めた品種。ダマスクとティーの香り。", acquisitionDate: "2024-01-10" 
  },
  { 
    id: '15', name: "パウル・クレー", brand: "Apple Roses (Japan)", year: 2014, 
    description: "オレンジとピンクの混ざるニュアンスカラー。画家シリーズ。フルーティな香り。", acquisitionDate: "2022-04-20" 
  },
  { 
    id: '16', name: "メーヴェ", brand: "Apple Roses (Japan)", year: 2020, 
    description: "非常に強健な白バラ。半八重咲きで野趣があり、風景に馴染む。", acquisitionDate: "2023-03-15" 
  },
  { 
    id: '17', name: "楼蘭", brand: "Rosa Orientis (Japan)", year: 2019, 
    description: "ピンクの小輪房咲き。非常に花付きが良く、ボーダーガーデンに向く。", acquisitionDate: "2021-11-01" 
  },
  { 
    id: '18', name: "ローズ・アラ・フランセーズ", brand: "Kawamoto Rose (Japan)", year: 2018, 
    description: "アンティークな雰囲気のピンクベージュ。フランス風のシックなバラ。", acquisitionDate: "2022-10-10" 
  },
  { 
    id: '19', name: "ガブリエル２", brand: "Kawamoto Rose (Japan)", year: 2008, 
    description: "ガブリエルの2株目。予備苗として育成中。", acquisitionDate: "2023-05-01" 
  },
  { 
    id: '20', name: "シュクレ", brand: "Kawamoto Rose (Japan)", year: 2016, 
    description: "砂糖菓子のような可愛らしいピンクのカップ咲き。甘い雰囲気。", acquisitionDate: "2021-01-20" 
  },
  { 
    id: '21', name: "レヴリ", brand: "Kawamoto Rose (Japan)", year: 2016, 
    description: "藤色と茶色が混ざるシックな花色。「夢想」の意味を持つ。", acquisitionDate: "2022-02-28" 
  },
  { 
    id: '22', name: "コンフィチュール", brand: "Kawamoto Rose (Japan)", year: 2018, 
    description: "鮮やかなピンクからアプリコットのグラデーション。ジャムのような甘い色合い。", acquisitionDate: "2023-11-15" 
  }
];

// No mock events, start clean
export const generateMockEvents = (roses: Rose[]): CareEvent[] => {
  return [];
};
