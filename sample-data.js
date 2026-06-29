/**
 * Personal seed records for Evidence Ledger.
 * Keep this file separate from app.js so the evidence inventory can be reviewed and edited independently.
 * recordStatus: 事実 = directly supported by work/materials; 自己観察 = repeated user-reported pattern; 仮説 = interpretation to verify.
 */
export const PERSONAL_SEED_MANIFEST = Object.freeze({
  "count": 65,
  "updatedAt": "2026-06-29",
  "title": "個人初期台帳",
  "description": "これまでの会話・制作履歴をもとに、事実／自己観察／仮説を分けて組み立てた初期データ。"
});

export const PERSONAL_SEED_RECORDS = Object.freeze([
  {
    "seedKey": "work-integrated-promotion",
    "recordStatus": "事実",
    "title": "企画から告知・当日運用・振り返りまでを一気通貫で回す",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "試合・イベント案件を、企画設計から発信、現場、振り返りまで分断せずに扱う。",
    "tags": [
      "浦和レッズ",
      "広報",
      "プロモーション",
      "プロジェクト推進"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "試合・イベントの企画、チケット販促、発信、当日運用、振り返りをまたいで担当している",
      "when": "浦和レッズ在籍3年目までの継続実務",
      "role": "広報・プロモーション担当",
      "stakeholders": "社内各部署、制作会社、会場運営、パートナー、メディア",
      "result": "案件の前後工程をつなげて進める経験を蓄積した"
    },
    "evidenceText": "職務経歴書の担当領域\n企画書・告知物・進行表・振り返り資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "目的が明確",
        "判断期限あり",
        "現場運用あり",
        "関係者が多い",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "企画意図、対象者、判断期限、現場で起きる例外を一枚に近づけると、後工程の手戻りが減る。",
      "counterEvidence": "決裁者や目的が不明確な状態では、進行管理だけでは前に進まない。",
      "nextExperiment": "案件ごとに『企画・告知・現場・検証』を一枚で追える設計を定型化する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "企画から告知、現場運用、振り返りまでを分断せずに進める。",
      "reusableConditions": "目的、対象者、決裁者、期限を初期に共有できる案件",
      "translation": "統合コミュニケーション設計・プロジェクト推進",
      "companyTags": [
        "PARK",
        "ShapePartner",
        "OZMA",
        "PM",
        "Producer"
      ]
    }
  },
  {
    "seedKey": "work-ticket-segmentation",
    "recordStatus": "事実",
    "title": "来場者層を分け、チケット施策の対象と目的を設計する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "来場者層の違いを前提に、試合ごとの狙い・訴求・販売導線を考える。",
    "tags": [
      "チケット",
      "CRM",
      "セグメント",
      "集客"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "1・3・5・7層などの来場者区分を前提に、試合別の来場促進や最終節の訴求を検討した",
      "when": "2024年以降のチケット販促実務",
      "role": "広報・販売促進",
      "stakeholders": "広報、チケット、営業、制作、ファンコミュニケーション",
      "result": "全体平均だけでは見えない対象者ごとの課題を施策へ接続した"
    },
    "evidenceText": "チケット販売・発券の集計資料\n試合別の告知設計メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "数字が見える",
        "目的が明確",
        "文章化が必要",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 1,
      "notes": "数字を見るだけでなく、その層が来場を迷う理由と、次に取ってほしい行動を置くと施策になる。",
      "counterEvidence": "層の定義やデータ取得の粒度が揃っていないと、施策の評価が曖昧になる。",
      "nextExperiment": "各層ごとに『障壁・訴求・導線・見る指標』を同じ形式で残す。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "来場者の違いを前提に、販売・発信・体験の打ち手を組み立てる。",
      "reusableConditions": "対象データと事業上の目的が共有されているとき",
      "translation": "顧客セグメント設計・来場促進",
      "companyTags": [
        "ファンベース",
        "CRM",
        "マーケティング"
      ]
    }
  },
  {
    "seedKey": "work-opening-kashima-report-2026",
    "recordStatus": "事実",
    "title": "2026年開幕・鹿島戦のデジタル施策を数値で振り返る",
    "type": "実例",
    "domain": "仕事",
    "summary": "広告・SNS等の反応を、接触からコンバージョンまで追い、振り返りに使う。",
    "tags": [
      "広告",
      "SNS",
      "KPI",
      "レポート",
      "鹿島戦"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年開幕戦（鹿島戦）の施策レポートで、週別・日別の広告／SNS指標を整理した",
      "when": "2026年2月13日〜2月27日",
      "role": "レポート確認・活用",
      "stakeholders": "広報・プロモーション、広告関係者",
      "result": "impressions 4,026,474、link click 7,169、engagement 42,265、総CV 6,096を確認できる形にした"
    },
    "evidenceText": "2026年開幕戦（鹿島戦）レポート\nimpressions 4,026,474\nlink click 7,169\nengagement 42,265\n総CV 6,096",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "数字が見える",
        "目的が明確",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 0,
      "technicalAxis": 2,
      "notes": "媒体ごとの数字を並べるだけでなく、次の打ち手に使う比較軸を明確にする。",
      "counterEvidence": "CVの定義や計測範囲を確認しないと、媒体間比較を誤る。",
      "nextExperiment": "施策前の仮説と、施策後の数値変化を同じレポート内で接続する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "接触・反応・CVをつなげ、広告施策を次の判断に使えるレポートにする。",
      "reusableConditions": "計測定義と目的KPIが共有されているとき",
      "translation": "デジタルマーケティング分析・施策評価",
      "companyTags": [
        "マーケティング",
        "データ",
        "PM"
      ]
    }
  },
  {
    "seedKey": "work-ticket-kpi-table",
    "recordStatus": "事実",
    "title": "チケット・施策数値を、判断できる表に整える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "販売・発券・PV・反応などの数値を、進捗と判断材料が読める形にする。",
    "tags": [
      "Excel",
      "Googleスプレッドシート",
      "KPI",
      "データ",
      "集客"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "チケットや施策の数値を集計し、比較・進捗・課題が読める表に整えた",
      "when": "継続",
      "role": "主担当",
      "stakeholders": "広報、営業、関係部署",
      "result": "数字を施策の判断材料として共有しやすくした"
    },
    "evidenceText": "集計シート\nKPIレポート\n施策振り返り資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "数字が見える",
        "目的が明確",
        "裁量あり"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 3,
      "meaningAxis": 1,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 0,
      "technicalAxis": 2,
      "notes": "単に集計するより、比較対象と次の判断を同じ画面に置くと価値が出る。",
      "counterEvidence": "元データの定義が揃っていない場合は、まず前提確認が必要。",
      "nextExperiment": "定例で使う数表をテンプレート化する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "数字を、関係者が次の判断をできる形に整える。",
      "reusableConditions": "データ定義と意思決定の用途が共有されているとき",
      "translation": "事業KPIの可視化・意思決定支援",
      "companyTags": [
        "データ",
        "Excel",
        "Tableau"
      ]
    }
  },
  {
    "seedKey": "work-hot-summer-2026",
    "recordStatus": "事実",
    "title": "URAWA HOT SUMMERの集客・体験を横断して設計する",
    "type": "実例",
    "domain": "仕事",
    "summary": "夏のテーママッチで、会場体験と来場促進を結び、企画・告知・運営を進める。",
    "tags": [
      "URAWA HOT SUMMER",
      "テーママッチ",
      "集客",
      "会場体験"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年7月20日町田戦に向け、やぐら、夏祭り、キャップ配布、学校訪問、YouTube等を含む施策を準備した",
      "when": "2026年6〜7月の準備",
      "role": "企画・告知・進行",
      "stakeholders": "社内各部署、制作、学校、メディア、会場運営",
      "result": "集客目標と会場体験を接続するための施策群を整理した"
    },
    "evidenceText": "URAWA HOT SUMMER企画資料\n与野八幡小学校訪問（約580人）\nメディア10社対応\nチケット進捗メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "目的が明確",
        "判断期限あり",
        "現場運用あり",
        "関係者が多い",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 3,
      "technicalAxis": 1,
      "notes": "『夏らしさ』を飾りにせず、来場する理由・当日の体験・発信素材へ落とす必要がある。",
      "counterEvidence": "単発の話題性だけでは、販売目標に対する効き方が見えにくい。",
      "nextExperiment": "施策ごとに、来場前・会場・来場後で果たす役割を明文化する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "会場体験・来場促進・発信を、テーママッチの一つの体験として設計する。",
      "reusableConditions": "企画テーマと集客課題を同時に扱える案件",
      "translation": "イベントマーケティング・ファンエンゲージメント",
      "companyTags": [
        "イベント",
        "ファンベース",
        "PM"
      ]
    }
  },
  {
    "seedKey": "work-enjitsu-2026",
    "recordStatus": "事実",
    "title": "炎日（川崎戦）の地域性と会場体験を企画する",
    "type": "実例",
    "domain": "仕事",
    "summary": "地域の祭りとの競合も踏まえ、提灯・やぐら・餅まき等の体験設計を検討する。",
    "tags": [
      "炎日",
      "地域連携",
      "イベント",
      "会場運営"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年8月24日川崎戦に向け、提灯、やぐら、餅まき、DJ、OB・レディース施策などを含む企画を検討した",
      "when": "2026年6月時点の準備",
      "role": "企画・調整",
      "stakeholders": "社内、地域、OB・レディース、会場運営、制作",
      "result": "地域祭りとの競合や季節性を含め、開催時期・体験の課題を整理した"
    },
    "evidenceText": "炎日企画メモ\n提灯募集状況メモ\n販売進捗資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "前例なし",
      "attributes": [
        "現場運用あり",
        "関係者が多い",
        "前例なし",
        "数字が見える"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "『地域にある祭り』とクラブ主催イベントの違いを先に定義しないと、企画の必然性が薄くなる。",
      "counterEvidence": "地域行事との競合が強い場合、内容の魅力だけで来場を動かし切れない。",
      "nextExperiment": "季節・競合・来場者層を踏まえた開催時期の比較案をつくる。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "地域文脈と会場体験を踏まえ、イベントの必然性を組み立てる。",
      "reusableConditions": "地域との関係性と事業目的を両立させる案件",
      "translation": "地域連携イベント企画",
      "companyTags": [
        "地域連携",
        "イベント"
      ]
    }
  },
  {
    "seedKey": "work-opening-promo-corso-parco",
    "recordStatus": "事実",
    "title": "商業施設を使った開幕プロモーションの掲出物を進行する",
    "type": "実例",
    "domain": "仕事",
    "summary": "コルソ・パルコ等での掲出に向け、入稿物、納期、費用、設置条件を整理する。",
    "tags": [
      "OOH",
      "開幕",
      "コルソ",
      "パルコ",
      "進行管理"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "コルソでの4日間掲出を含む開幕プロモーションについて、特大バナー、B1パネル、等身大、撮影ボード等の制作・入稿条件を整理した",
      "when": "2026年6〜7月",
      "role": "制作進行・調整",
      "stakeholders": "商業施設、制作チーム、社内関係者",
      "result": "掲出サイズ・納期・予算を制作物ごとに整理した"
    },
    "evidenceText": "掲出物リスト\n入稿日メモ（特大バナー・B1パネル 7/3、等身大・撮影ボード 7/7）\n予算100万円の整理",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "判断期限あり",
        "関係者が多い",
        "現場運用あり",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 4,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "同じ『ポスター』でも、掲出場所・用途・入稿条件が違う。制作物単位で前提を分ける。",
      "counterEvidence": "施設側の仕様や調整状況が未確定だと、デザイン着手の判断が遅れる。",
      "nextExperiment": "サイズ・納期・確認者・入稿形式を一行で追える進行表に統一する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "複数媒体の掲出物を、仕様・納期・意思決定まで含めて進行する。",
      "reusableConditions": "媒体仕様と制作工程を早期に並べられる案件",
      "translation": "OOH制作進行・販促プロジェクト管理",
      "companyTags": [
        "Producer",
        "PM",
        "広告"
      ]
    }
  },
  {
    "seedKey": "work-blue-kit-kv",
    "recordStatus": "事実",
    "title": "『レッズは、青い』のKV要件を言葉と画面に落とす",
    "type": "実例",
    "domain": "仕事",
    "summary": "薄い青基調・赤最小・左に選手・右にコピーという制約から、メッセージと見せ方を整理する。",
    "tags": [
      "KV",
      "コピー",
      "アートディレクション",
      "ユニフォーム"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "青ユニフォームのKVについて、コピー『レッズは、青い』、配色、選手配置、タイポの要件を整理した",
      "when": "2026年6月",
      "role": "企画・制作ディレクション",
      "stakeholders": "制作チーム、社内関係者",
      "result": "短いコピーと視覚要件を、制作へ渡せる状態にした"
    },
    "evidenceText": "KV制作依頼メモ\nコピー案・配色・レイアウト要件",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "目的が明確",
        "制作・表現を扱う"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 3,
      "technicalAxis": 0,
      "notes": "コピーを説明文にせず、視覚の判断を進める『核』にする。",
      "counterEvidence": "コピーだけが先行し、クラブ文脈や受け手の受け取り方が薄いと、強さが記号化する。",
      "nextExperiment": "1行コピーごとに、視覚・媒体・想定受け手をセットで比較する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "言葉と視覚の制約を整理し、制作判断の核になるコピーをつくる。",
      "reusableConditions": "ブランド文脈と制作要件が両方ある案件",
      "translation": "コンセプト開発・クリエイティブディレクション",
      "companyTags": [
        "PARK",
        "SIGNING",
        "ブランディング"
      ]
    }
  },
  {
    "seedKey": "work-kids-park-banner",
    "recordStatus": "事実",
    "title": "ファミリー向け施設サインを、長期運用前提で設計する",
    "type": "実例",
    "domain": "仕事",
    "summary": "必須文言・マスコット・大判サイズ・長期使用を前提に、情報量と見やすさを整理する。",
    "tags": [
      "ファミリー",
      "サイン",
      "キッズぱ〜く",
      "制作進行"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "W5600×H2800のキッズぱ〜く壁面バナーで、必須文言『ファミリーシート専用キッズぱ〜く』、4体マスコット、長期使用を前提に要件を整理した",
      "when": "2026年6月",
      "role": "要件整理・制作依頼",
      "stakeholders": "制作チーム、会場運営、ファミリー施策担当",
      "result": "現場での視認性と長期使用を両立する制作条件を明文化した"
    },
    "evidenceText": "壁面バナー制作要件\nサイズ W5600×H2800",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "現場運用あり",
        "文章化が必要",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 2,
      "peopleAxis": 2,
      "operationsAxis": 3,
      "creativeAxis": 3,
      "technicalAxis": 0,
      "notes": "『誰のための場所か』を最初に読めるようにし、装飾は役割を補強するために使う。",
      "counterEvidence": "短期イベント用のテンションで作ると、長期掲出で情報が疲れる。",
      "nextExperiment": "設置距離別の見え方を確認するラフチェックを定型化する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "利用者・設置環境・長期運用を踏まえて、現場で機能するサインに落とす。",
      "reusableConditions": "利用者と設置場所が明確な環境",
      "translation": "環境グラフィック・顧客体験設計",
      "companyTags": [
        "CX",
        "デザイン"
      ]
    }
  },
  {
    "seedKey": "work-cinema-ad-spec",
    "recordStatus": "事実",
    "title": "シネアド出稿の規定と入稿日を、制作チームが動ける情報にする",
    "type": "実例",
    "domain": "仕事",
    "summary": "複数映画館の媒体仕様・開始希望日・素材条件を調べ、制作チーム向けに整理する。",
    "tags": [
      "シネアド",
      "媒体出稿",
      "入稿",
      "制作進行"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "ユナイテッド・シネマ浦和、イオンシネマ浦和美園、MOVIX川口、イオンシネマ川口での15秒出稿に向け、規定・入稿日・制作条件を整理した",
      "when": "2026年6月",
      "role": "調査・制作連携",
      "stakeholders": "映画館媒体社、制作チーム、社内関係者",
      "result": "制作チームが判断・制作着手できる情報に変換した"
    },
    "evidenceText": "映画館4館の出稿予定\n15秒素材の制作条件メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "目的が明確",
        "判断期限あり",
        "文章化が必要",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 2,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 1,
      "notes": "調査結果を羅列せず、『誰がいつ何を判断すれば制作が進むか』に並べ替える。",
      "counterEvidence": "媒体社ごとの回答待ちが残ると、確定情報と仮情報が混ざる。",
      "nextExperiment": "媒体ごとに『確定・確認中・制作判断に必要』を色分けする。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "複数媒体の仕様を、制作が進む判断情報へ翻訳する。",
      "reusableConditions": "媒体仕様と希望開始日を早期に集められる案件",
      "translation": "メディアプランニング支援・制作進行",
      "companyTags": [
        "広告",
        "Producer"
      ]
    }
  },
  {
    "seedKey": "work-community-events",
    "recordStatus": "事実",
    "title": "地域イベントの年間日程を、クラブ施策の検討材料として整理する",
    "type": "実例",
    "domain": "仕事",
    "summary": "水かけ祭りや区民イベントなど、地域の予定を一覧化し、クラブの参加・連携の判断に使う。",
    "tags": [
      "地域連携",
      "イベント",
      "年間計画",
      "ホームタウン"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年7月〜11月の地域イベント日程を整理し、水かけ祭り、南区、桜区、緑区・美園、中央区、浦和区の機会を把握した",
      "when": "2026年6月",
      "role": "情報整理・企画検討",
      "stakeholders": "地域団体、自治体、社内関係者",
      "result": "地域連携の候補を、日程とエリアの観点で比較できる状態にした"
    },
    "evidenceText": "地域イベント日程メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "目的が明確",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "単発参加ではなく、地域・季節・クラブ側の目的を重ねると連携の筋が出る。",
      "counterEvidence": "日程一覧だけでは、地域にとっての意味や運営負荷が見えない。",
      "nextExperiment": "各イベントに『地域側の目的・クラブ側の価値・必要資源』を追記する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "地域の予定とクラブの目的を重ね、連携機会を設計する。",
      "reusableConditions": "地域側の関心とクラブの役割を確認できるとき",
      "translation": "地域連携・コミュニティマーケティング",
      "companyTags": [
        "社会連携",
        "地域"
      ]
    }
  },
  {
    "seedKey": "work-what-can-i-do",
    "recordStatus": "事実",
    "title": "『What Can I Do?』の宣言を、会見・映像・社内浸透までつなげる",
    "type": "実例",
    "domain": "仕事",
    "summary": "新社長・SDの概念宣言を、メディア会見、試合前映像、SNS、社内へ一貫して伝える準備をする。",
    "tags": [
      "理念浸透",
      "会見",
      "映像",
      "社内コミュニケーション"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年7月5日に向け、新社長とSDの概念宣言について、会見台本、Q&A、宣言文投影、試合前映像の運用条件、SNS体制、社内浸透を整理した",
      "when": "2026年6〜7月の準備",
      "role": "広報設計・進行",
      "stakeholders": "社長、SD、監督、広報、制作、メディア、社内各部署",
      "result": "言葉だけの宣言にせず、発信と運用の接点を設計した"
    },
    "evidenceText": "会見台本\n宣言文投影案\nAsk / Act / Proveの整理\n試合前映像Mode A/B/Cの運用メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "前例なし",
      "attributes": [
        "目的が明確",
        "判断期限あり",
        "関係者が多い",
        "文章化が必要",
        "前例なし"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "理念は文章の出来だけでなく、誰がどの場面で判断に使うかまで設計して初めて浸透に近づく。",
      "counterEvidence": "勝敗や現場の空気と切り離して発信すると、宣言が形式だけに見える。",
      "nextExperiment": "宣言内容を、日常業務での具体的な判断例へ変換する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "抽象的な理念を、会見・映像・SNS・社内運用で使える言葉と判断に落とす。",
      "reusableConditions": "組織の意志を、複数チャネルで一貫して伝える必要がある案件",
      "translation": "ブランドストーリー設計・組織コミュニケーション",
      "companyTags": [
        "PARK",
        "inquire",
        "ブランディング"
      ]
    }
  },
  {
    "seedKey": "work-matchday-video-conditions",
    "recordStatus": "事実",
    "title": "試合前映像の出し分けを、勝敗や内容に応じた運用ルールにする",
    "type": "実例",
    "domain": "仕事",
    "summary": "映像表現を固定せず、未勝利時も含めた出し分けと判断者をあらかじめ定める。",
    "tags": [
      "映像",
      "運用設計",
      "試合日",
      "判断基準"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "試合前映像をMode A/B/Cに分け、未勝利時の扱い、判断者、復帰条件を事前に整理した",
      "when": "2026年7月の宣言浸透設計",
      "role": "運用設計・広報",
      "stakeholders": "広報責任者、監督、SD、制作、SNS担当",
      "result": "表現の方向性を、現場で迷わない判断ルールにした"
    },
    "evidenceText": "Mode A/B/C運用メモ\n判断者・復帰条件の整理",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "前例なし",
      "attributes": [
        "判断期限あり",
        "前例なし",
        "現場運用あり",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "『良い表現』を作るだけでなく、良くない状況でもどう使うかを決めると運用が強くなる。",
      "counterEvidence": "判断者が多すぎると、試合直前に意思決定が遅れる。",
      "nextExperiment": "判断に必要な情報と連絡導線を、試合日の時系列に置く。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "表現を現場で迷わず使える、条件付きの運用ルールに変える。",
      "reusableConditions": "状況変化に応じて発信を切り替える必要がある案件",
      "translation": "コンテンツ運用設計・危機時コミュニケーション",
      "companyTags": [
        "PR",
        "コンテンツ"
      ]
    }
  },
  {
    "seedKey": "work-school-invitation-2627",
    "recordStatus": "事実",
    "title": "県内小学生2,627人招待を、告知・申込・KVまで設計する",
    "type": "実例",
    "domain": "仕事",
    "summary": "県内小学生招待の対象・日程・申込期間・KV要件を、一貫した募集導線にする。",
    "tags": [
      "招待施策",
      "小学生",
      "KV",
      "申込導線"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年8月1日のRB大宮戦に向け、埼玉県内小学生2,627人招待、申込期間、会場、KVの必須要素を整理した",
      "when": "2026年6〜7月の準備",
      "role": "企画・告知・制作進行",
      "stakeholders": "学校・保護者、制作、チケット、会場運営",
      "result": "『2,627人ご招待』を主役にした募集導線とKV要件を作成した"
    },
    "evidenceText": "対象：埼玉県内小学生2,627人\n申込：7月2日10:00〜7月15日23:59\nKV要件：マスコット・右側写真素材風・3階層タイポ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "定型",
      "attributes": [
        "目的が明確",
        "判断期限あり",
        "文章化が必要",
        "現場運用あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 2,
      "creativeAxis": 3,
      "technicalAxis": 1,
      "notes": "招待人数を単なる数字にせず、対象者が『自分ごと』にできる募集体験へ変える。",
      "counterEvidence": "保護者が判断する施策では、子ども向けの見た目だけでは申込の不安が残る。",
      "nextExperiment": "子ども向けの魅力と保護者向けの安心情報を分けて設計する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "招待人数・対象者・KV・申込導線をつなげ、参加を具体的な行動へ変える。",
      "reusableConditions": "対象者と申込障壁が明確な集客案件",
      "translation": "キャンペーン設計・ファミリーマーケティング",
      "companyTags": [
        "ファミリー",
        "キャンペーン"
      ]
    }
  },
  {
    "seedKey": "work-rex-fanmeeting",
    "recordStatus": "事実",
    "title": "REX限定の選手ファンミーティングを設計する",
    "type": "実例",
    "domain": "仕事",
    "summary": "節目となる選手の記録と会員価値をつなげ、限定イベントの対象・体験・運用を考える。",
    "tags": [
      "ファンクラブ",
      "REX",
      "会員施策",
      "イベント"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "西川周作600試合に合わせ、REX限定『SHUSAKU FAN MEETING』を検討・準備した",
      "when": "2026年8月に向けた準備",
      "role": "会員施策・企画",
      "stakeholders": "ファンクラブ、選手、運営、会員",
      "result": "選手の節目を会員接点に変える企画を扱った"
    },
    "evidenceText": "REX限定イベント企画メモ\n西川周作600試合の節目",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "目的が明確",
        "現場運用あり",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "記録の大きさと会員が得る特別感を、同じ体験の中で見せる。",
      "counterEvidence": "限定性だけを強めると、参加できない会員への説明が弱くなる。",
      "nextExperiment": "参加者・非参加者の両方に残るコンテンツ導線を考える。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "選手の節目を、会員の帰属意識につながる体験へ変える。",
      "reusableConditions": "既存ファンとの関係を深める施策",
      "translation": "CRM・会員エンゲージメント",
      "companyTags": [
        "ファンベース",
        "CRM"
      ]
    }
  },
  {
    "seedKey": "work-rex-parent-child",
    "recordStatus": "事実",
    "title": "親子向けREXイベントを、人数・選手・導線まで運用設計する",
    "type": "実例",
    "domain": "仕事",
    "summary": "練習後の親子イベントを、少人数枠・選手参加・当日動線を含めて準備する。",
    "tags": [
      "親子",
      "REX",
      "イベント運営",
      "ファミリー"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "2026年8月の親子イベントについて、各回10組×2、選手3〜5名×2という枠と運用を整理した",
      "when": "2026年8月に向けた準備",
      "role": "企画・当日運用設計",
      "stakeholders": "会員、親子、選手、運営",
      "result": "小規模イベントの参加条件と当日運用を具体化した"
    },
    "evidenceText": "親子イベント枠：各回10組×2\n選手参加：3〜5名×2",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "現場運用あり",
        "関係者が多い",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "少人数イベントは『枠数』より、受付・待機・選手との接点の密度が満足度を左右する。",
      "counterEvidence": "選手スケジュールが変動すると、参加体験の設計が崩れやすい。",
      "nextExperiment": "選手人数が変わっても成立する代替プログラムを準備する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "少人数イベントを、参加者の体験と現場運用の両方から設計する。",
      "reusableConditions": "対象人数と当日の制約が把握できるイベント",
      "translation": "イベントオペレーション・顧客体験設計",
      "companyTags": [
        "イベント",
        "ファミリー"
      ]
    }
  },
  {
    "seedKey": "work-transfer-release",
    "recordStatus": "事実",
    "title": "選手移籍リリースを、正確さとクラブ文脈を両立して整える",
    "type": "実例",
    "domain": "仕事",
    "summary": "年齢・経歴・出場記録・コメントなどを確認し、公式発表として整える。",
    "tags": [
      "リリース",
      "選手移籍",
      "校正",
      "メディア対応"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "石原広教選手の完全移籍発表に際し、リリース原稿の事実確認・構成・表現を扱った",
      "when": "2026年6月",
      "role": "広報・原稿確認",
      "stakeholders": "選手、強化、広報、メディア、ファン",
      "result": "公式発表で必要な正確性と読みやすさを両立する作業を行った"
    },
    "evidenceText": "移籍発表原稿\n選手プロフィール・出場記録",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "文章化が必要",
        "判断期限あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "定型の中でも、誤記の防止と、読者が知りたい順番を両方見る。",
      "counterEvidence": "一次情報の確認が遅れると、表現調整以前に発表の精度が担保できない。",
      "nextExperiment": "移籍リリース用の確認チェックリストを更新する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "公式発表に必要な正確性と、受け手が理解しやすい構成を両立する。",
      "reusableConditions": "事実確認の担当と締切が明確な発信",
      "translation": "コーポレートコミュニケーション・編集",
      "companyTags": [
        "PR",
        "広報"
      ]
    }
  },
  {
    "seedKey": "work-crisis-releases",
    "recordStatus": "事実",
    "title": "センシティブな事案のリリースを、事実・対応・再発防止に分けて伝える",
    "type": "実例",
    "domain": "仕事",
    "summary": "中指行為、横断幕ルール違反、駐車場冠水による中止等の発信を扱い、表現と必要情報を整理する。",
    "tags": [
      "危機対応",
      "お知らせ",
      "ルール",
      "謝罪",
      "運用改善"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "中指行為の第1報・第2報、横断幕ルール違反、駐車場冠水中止等のリリース文面を扱った",
      "when": "2026年6月を含む継続実務",
      "role": "広報・文面整理",
      "stakeholders": "クラブ、運営、関係者、来場者、メディア、ファン",
      "result": "事実、来場者に必要な行動、クラブの対応を分けて発信する実務を積んだ"
    },
    "evidenceText": "該当リリース原稿\n問い合わせ・運用メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "当日対応",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "判断期限あり",
        "文章化が必要",
        "現場運用あり",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 2,
      "depletion": 5,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 0,
      "notes": "感情的な評価を足さず、事実・対応・来場者が今取る行動を分けると、文面の役割が明確になる。",
      "counterEvidence": "事実確認が不十分な段階で断定すると、訂正や不信につながる。",
      "nextExperiment": "緊急発信の初報／続報のテンプレートと確認フローを整理する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "センシティブな状況でも、必要な事実と行動を誤解なく伝える。",
      "reusableConditions": "事実確認と最終判断の導線が確保できる状況",
      "translation": "危機管理広報・リスクコミュニケーション",
      "companyTags": [
        "PR",
        "危機対応"
      ]
    }
  },
  {
    "seedKey": "work-media-comment-response",
    "recordStatus": "事実",
    "title": "記者からのコメント依頼に、想定別の素材を用意して返す",
    "type": "実例",
    "domain": "仕事",
    "summary": "試合結果が未確定の取材依頼に対し、活躍して勝利／活躍して敗戦／ミスを含む敗戦などの条件別にコメントを準備する。",
    "tags": [
      "メディア対応",
      "コメント",
      "シナリオ",
      "広報"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "彩艶選手に関する観戦コメント依頼に対し、試合展開別のコメント案を検討した",
      "when": "2026年6月",
      "role": "広報・取材対応",
      "stakeholders": "新聞社、広報、試合関係者",
      "result": "試合後の短時間でも事実に沿って返せる準備を行った"
    },
    "evidenceText": "埼玉新聞からのコメント依頼\n条件別コメント案",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "当日対応",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "前例なし",
      "attributes": [
        "判断期限あり",
        "文章化が必要",
        "現場運用あり"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 4,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "予測ではなく、起こりうる条件ごとに『事実が確認できたら使える表現』を置く。",
      "counterEvidence": "事前案をそのまま使うと、試合の実態とずれる危険がある。",
      "nextExperiment": "試合後に確認すべき事実項目をコメント案の横に置く。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "不確実な状況でも、事実に沿った取材対応を短時間で組み立てる。",
      "reusableConditions": "事実確認と発信期限が近い案件",
      "translation": "メディアリレーションズ・シナリオプランニング",
      "companyTags": [
        "PR",
        "メディア"
      ]
    }
  },
  {
    "seedKey": "work-steward-feature",
    "recordStatus": "事実",
    "title": "現場スタッフの役割を、具体的な行動から記事にする",
    "type": "実例",
    "domain": "仕事",
    "summary": "スチュワードの業務を、座席誘導・落とし物・車椅子・迷子・ベビーカー・外国語対応などの具体から伝える。",
    "tags": [
      "オウンドメディア",
      "取材",
      "スチュワード",
      "ストーリー"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "毎日新聞『レッズ通信』で、スチュワードの活動人数、研修、活動時間、歴史、具体業務を整理した",
      "when": "2026年",
      "role": "広報・取材整理",
      "stakeholders": "スチュワード、メディア、来場者、クラブ",
      "result": "裏方の役割を、抽象的な称賛ではなく具体的な価値として伝える材料を整理した"
    },
    "evidenceText": "最大約200人・通常100〜150人\n1995年駒場からの活動\n試合4時間前集合〜終了1時間後",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "定型",
      "attributes": [
        "文章化が必要",
        "目的が明確",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "『先進的』と抽象化せず、具体的に誰の困りごとをどう減らしているかで書く。",
      "counterEvidence": "情報だけを並べると、人が働く温かみや現場感が消える。",
      "nextExperiment": "活動の一場面を起点に、役割の全体像へ広げる構成を試す。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "現場の具体を拾い、組織や人の役割を伝わるストーリーに変える。",
      "reusableConditions": "現場の一次情報にアクセスできる取材・編集案件",
      "translation": "オウンドメディア編集・ストーリーテリング",
      "companyTags": [
        "編集",
        "PR",
        "コンテンツ"
      ]
    }
  },
  {
    "seedKey": "work-ito-atsuki-feature",
    "recordStatus": "事実",
    "title": "選手個人の話を、地域・クラブ史・現在地と接続して編集する",
    "type": "実例",
    "domain": "仕事",
    "summary": "個人のコメントを、浦和の歴史・地域性・クラブとの関わりに接続しつつ、主観と客観のバランスを考える。",
    "tags": [
      "選手インタビュー",
      "編集",
      "地域性",
      "ストーリー"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "伊藤敦樹選手を扱う記事について、浦和の歴史・地域性・クラブとの関与をどう入れるか検討した",
      "when": "2026年",
      "role": "広報・編集",
      "stakeholders": "選手、メディア、ファン、クラブ",
      "result": "単なる人物紹介にせず、クラブとの関係性が伝わる構成を考えた"
    },
    "evidenceText": "記事構成メモ\n編集上の論点",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "目的が明確",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 1,
      "creativeAxis": 3,
      "technicalAxis": 0,
      "notes": "個人を主役にしながら、背景は説明ではなく本人の言葉や行動に接続する。",
      "counterEvidence": "地域性を強く入れすぎると、選手本人の固有性が薄くなる。",
      "nextExperiment": "人物・背景・現在の挑戦の比重をラフ段階で可視化する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "個人の物語を、組織や地域の文脈と自然につなげて編集する。",
      "reusableConditions": "人物の一次情報と背景資料の両方があるとき",
      "translation": "エディトリアルディレクション・ブランドストーリー",
      "companyTags": [
        "編集",
        "ブランディング"
      ]
    }
  },
  {
    "seedKey": "work-sponsor-community",
    "recordStatus": "事実",
    "title": "スポンサー・地域・社会連携を、露出ではなく関係設計として考える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "パートナー施策、地域連携、社会的価値を、クラブ・相手・ファンの三者にとっての意味で考える。",
    "tags": [
      "スポンサー",
      "社会連携",
      "地域",
      "パートナーシップ"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "スポンサー／パートナー施策、地域連携、スポーツ×社会的価値に関わる企画・調整を継続している",
      "when": "継続実務",
      "role": "広報・プロモーション",
      "stakeholders": "パートナー、自治体、地域、ファン、クラブ",
      "result": "単発露出に閉じない連携の考え方を持つ"
    },
    "evidenceText": "社外MTGメモ\n地域イベント企画\nスポンサー調査メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "関係者が多い",
        "利害が衝突",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "相手の目的、クラブの目的、ファン・地域の受け取り方が重なる場所を探す。",
      "counterEvidence": "社会的な言葉を使うだけでは、現場の実態や相手の利益と乖離する。",
      "nextExperiment": "施策ごとに『誰のどんな変化を目指すか』を事前に一文で置く。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "パートナー・地域・ファンそれぞれの目的を重ね、関係が残る施策を考える。",
      "reusableConditions": "複数主体の価値を明確にできる案件",
      "translation": "パートナーシップ設計・社会連携",
      "companyTags": [
        "社会連携",
        "地域",
        "スポンサー"
      ]
    }
  },
  {
    "seedKey": "work-ad-timing",
    "recordStatus": "事実",
    "title": "広告の役割を、新規層と既存ファンで分けて考える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "通年予算の制約下で、開幕・Go Go Redsデー・鹿島戦などの山に投下し、目的別に媒体・時期を考える。",
    "tags": [
      "広告",
      "OOH",
      "新規層",
      "既存ファン",
      "予算配分"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "広告予算が大幅に減る前提で、開幕、10〜12月のGo Go Redsデー、2月鹿島戦の3山を軸に、既存ファンと新規層の出稿タイミングを整理した",
      "when": "2026年6月",
      "role": "プロモーション・広告設計",
      "stakeholders": "広告会社、社内、制作",
      "result": "限られた予算のなかで、目的別の出稿判断を検討した"
    },
    "evidenceText": "広告体制メモ\nOOH・シネアドの検討資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "数字が見える",
        "目的が明確",
        "判断期限あり"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 1,
      "notes": "『誰に、いつ、何のために見せるか』を分けると、掲出時期の議論が進む。",
      "counterEvidence": "媒体の露出だけで新規層への効果を判断すると、導線や受け皿が抜ける。",
      "nextExperiment": "施策ごとに認知・検討・購入・来場のどこを動かすかを明示する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "限られた予算で、対象者と購買段階に合わせて広告の役割を設計する。",
      "reusableConditions": "媒体・予算・販売導線を一緒に見られる案件",
      "translation": "メディアプランニング・ファネル設計",
      "companyTags": [
        "広告",
        "マーケティング"
      ]
    }
  },
  {
    "seedKey": "work-schedule-spec-management",
    "recordStatus": "事実",
    "title": "制作物のサイズ・納期・入稿形式を、進行表として一元化する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "縦横リサイズ、納期、備考、PDF形式、トンボ、余白、ロゴなどの細部を一つの進行表で管理する。",
    "tags": [
      "進行表",
      "入稿",
      "制作管理",
      "例外処理"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "複数の告知物について、リサイズ、縦横、納期、備考、トンボなしPDF、上部3cm、パートナーロゴ等の条件を進行表で扱った",
      "when": "継続実務",
      "role": "制作進行・確認",
      "stakeholders": "制作チーム、社内依頼者、媒体社",
      "result": "細かい仕様の抜け漏れを減らすための管理方法を持つ"
    },
    "evidenceText": "進行表\n入稿ガイドライン\n制作依頼書",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "判断期限あり",
        "現場運用あり",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 1,
      "peopleAxis": 2,
      "operationsAxis": 3,
      "creativeAxis": 1,
      "technicalAxis": 1,
      "notes": "見栄えより先に、仕様・決裁・納期が一目で追えるようにする。",
      "counterEvidence": "備考欄に情報を詰め込みすぎると、重要度が見えなくなる。",
      "nextExperiment": "必須・確認中・任意の3階層で進行表を整理する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "複数制作物の仕様・納期・確認者を整理し、手戻りを減らす。",
      "reusableConditions": "制作物が多く、例外条件が発生しやすい案件",
      "translation": "プロダクションマネジメント・制作進行",
      "companyTags": [
        "Producer",
        "PM"
      ]
    }
  },
  {
    "seedKey": "work-presentation-brief",
    "recordStatus": "事実",
    "title": "資料・依頼文を、初見の人が動ける構造に整える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "背景、目的、対象、依頼事項、判断期限、例外を分け、相手が何をすべきかを読める資料にする。",
    "tags": [
      "資料作成",
      "依頼文",
      "合意形成",
      "PowerPoint"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "企画資料、制作依頼、社内説明、注意書き等で、初見の相手にも通じる構造を重視している",
      "when": "継続",
      "role": "起案・編集",
      "stakeholders": "社内外の関係者",
      "result": "説明の往復や認識差を減らす形に整える"
    },
    "evidenceText": "PowerPoint企画書\n制作依頼書\n社内説明文\nFAQ・注意書き",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "関係者が多い",
        "判断期限あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "相手の前提が異なるほど、最初に『なぜ今これをするか』を置く。",
      "counterEvidence": "情報を丁寧にしすぎると、決めるべきことが埋もれる。",
      "nextExperiment": "資料ごとに『読み終わった相手にしてほしい行動』を一行で確認する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "背景から判断・実行まで、初見の相手が動ける資料と依頼文をつくる。",
      "reusableConditions": "関係者の前提がそろっていない案件",
      "translation": "コミュニケーションデザイン・ドキュメント設計",
      "companyTags": [
        "PARK",
        "PM",
        "Producer"
      ]
    }
  },
  {
    "seedKey": "work-media-response",
    "recordStatus": "事実",
    "title": "メディア取材・問い合わせを、相手の用途に合わせて整理する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "取材意図、締切、文字数、公開条件、必要な確認を把握し、広報として返答をつくる。",
    "tags": [
      "メディア対応",
      "取材",
      "広報",
      "問い合わせ"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "新聞・Web・各種メディアからの問い合わせ、コメント依頼、取材企画に対応している",
      "when": "継続実務",
      "role": "広報窓口・原稿調整",
      "stakeholders": "記者、編集者、選手、社内関係者",
      "result": "相手が必要とする形式とクラブ側の確認を両立する経験を持つ"
    },
    "evidenceText": "取材依頼メール\n回答文\n公開記事",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "判断期限あり",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "取材の目的・読者・締切を先に押さえると、回答内容の過不足を減らせる。",
      "counterEvidence": "相手の意図を推測だけで決めると、回答がずれる。",
      "nextExperiment": "依頼受領時の確認項目をテンプレート化する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "取材意図と確認要件を整理し、相手に使われる形で正確に返す。",
      "reusableConditions": "取材目的と締切が確認できるとき",
      "translation": "メディアリレーションズ",
      "companyTags": [
        "PR",
        "広報"
      ]
    }
  },
  {
    "seedKey": "work-physical-venue-operations",
    "recordStatus": "事実",
    "title": "試合日の例外を、来場者導線と運営の課題として捉える",
    "type": "実例",
    "domain": "仕事",
    "summary": "雷雨・再入場・通路・屋根・案内不統一など、当日の問題を来場者体験と運用改善へつなげる。",
    "tags": [
      "試合運営",
      "来場者導線",
      "例外対応",
      "危機対応"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "駒場での雷雨対応を振り返り、MDP売切、導線混乱、再入場案内不統一、通路座り込み、屋根不足等を課題として整理した",
      "when": "2026年7月の駒場戦に関する振り返り",
      "role": "広報・運営フィードバック",
      "stakeholders": "来場者、会場運営、広報、警備",
      "result": "当日の混乱を個別事象で終わらせず、案内・導線・準備の改善論点に変えた"
    },
    "evidenceText": "駒場運営フィードバック\n当日案内メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "当日対応",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "前例なし",
      "attributes": [
        "現場運用あり",
        "判断期限あり",
        "関係者が多い",
        "前例なし"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 5,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 0,
      "notes": "当日の『案内不足』は、文面だけでなく、誰がどこで何を判断するかの設計不足として見る。",
      "counterEvidence": "現場で起きた例外を全て事前に潰すことはできない。",
      "nextExperiment": "再入場・避難・待機に関する案内文と現場共有をセットで整える。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "当日の混乱を、来場者導線と運用ルールの改善に変える。",
      "reusableConditions": "現場の一次情報を振り返りに使えるとき",
      "translation": "イベントリスクマネジメント・オペレーション改善",
      "companyTags": [
        "PM",
        "運用"
      ]
    }
  },
  {
    "seedKey": "work-copy-editing",
    "recordStatus": "事実",
    "title": "告知文・FAQ・注意書きを、重複なく行動につながる文章へ編集する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "相手の不安・判断・行動を踏まえ、丁寧さを保ちながら冗長さを削る。",
    "tags": [
      "文章",
      "FAQ",
      "注意書き",
      "校正",
      "ユーザー導線"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "告知文、FAQ、社内説明、依頼文、注意書き、リリース等の言い換え・構造化を継続している",
      "when": "継続",
      "role": "起案・校正・編集",
      "stakeholders": "来場者、ファン、社内外関係者、メディア",
      "result": "読み手が次に取る行動を理解しやすい文章に整える"
    },
    "evidenceText": "告知原稿\nFAQ\n校正履歴\nリリース原稿",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "高い",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "目的が明確",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 5,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 3,
      "technicalAxis": 0,
      "notes": "同じ内容の繰り返しを削り、背景・対象・行動・例外を必要な順に並べる。",
      "counterEvidence": "表現だけを整えても、運用ルール自体が曖昧なら問い合わせは減らない。",
      "nextExperiment": "各文書に『読み手の次の行動』を明示してから編集する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "複雑な案内を、誤解なく行動につながる文章に編集する。",
      "reusableConditions": "読み手と目的行動が定義できる文書",
      "translation": "UXライティング・編集",
      "companyTags": [
        "PARK",
        "PR",
        "編集"
      ]
    }
  },
  {
    "seedKey": "work-fact-checking",
    "recordStatus": "事実",
    "title": "公開前の事実確認を、文面・数字・表記の観点で行う",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "公開物の誤字脱字だけでなく、日付、年齢、規程、数値、対象、表現の整合を確認する。",
    "tags": [
      "ファクトチェック",
      "校正",
      "公開前確認",
      "リスク管理"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "リリース、スケジュール、告知物、資料について、誤字脱字と事実誤認の確認を繰り返し行っている",
      "when": "継続",
      "role": "広報・最終確認",
      "stakeholders": "制作、社内依頼者、メディア、来場者",
      "result": "公開後の訂正や問い合わせにつながる不整合を減らす"
    },
    "evidenceText": "公開前原稿\n修正履歴\n規程・スケジュール資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "文章化が必要",
        "判断期限あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 3,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 2,
      "creativeAxis": 0,
      "technicalAxis": 1,
      "notes": "表層の誤字より、対象・日付・前提・例外が読み手にどう伝わるかを見る。",
      "counterEvidence": "元となる事実が更新中だと、校正だけで正確性を保証できない。",
      "nextExperiment": "公開前チェックを『表記』『事実』『行動導線』の3分類にする。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "公開前の情報を、表記だけでなく事実と行動導線まで確認する。",
      "reusableConditions": "一次情報の確認者が明確な案件",
      "translation": "エディトリアルQA・コンテンツガバナンス",
      "companyTags": [
        "PR",
        "編集"
      ]
    }
  },
  {
    "seedKey": "previous-user-log-analysis",
    "recordStatus": "事実",
    "title": "ユーザーログを読み、行動の傾向を分析する",
    "type": "実例",
    "domain": "仕事",
    "summary": "ネットリサーチ会社で、ユーザーログなどのデータから行動や反応の傾向を読む実務を経験した。",
    "tags": [
      "マーケティングリサーチ",
      "ログ分析",
      "データ",
      "前職"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "ネットリサーチ会社で、ユーザーログ分析や広告モニタリングに関わった",
      "when": "浦和レッズ入社前",
      "role": "分析・リサーチ担当",
      "stakeholders": "調査チーム、クライアント、関連部署",
      "result": "現在の販促・広報実務でも、数値と行動の関係を見る基礎になった"
    },
    "evidenceText": "職務経歴書\n前職の担当領域",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "数字が見える",
        "目的が明確",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 0,
      "technicalAxis": 2,
      "notes": "データの羅列より、行動の変化や比較対象を置いたときに解釈が進む。",
      "counterEvidence": "ログだけでは、行動の動機や文脈を確定できない。",
      "nextExperiment": "定量データに、現場・顧客の定性情報を重ねる方法を増やす。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "ユーザーデータから行動の傾向を読み、施策や仮説へつなげる。",
      "reusableConditions": "データ定義と問いが共有されている分析案件",
      "translation": "マーケティングリサーチ・行動データ分析",
      "companyTags": [
        "マーケティング",
        "データ"
      ]
    }
  },
  {
    "seedKey": "previous-tableau-r",
    "recordStatus": "事実",
    "title": "TableauとRを使い、データを可視化・分析する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "Tableauによるダッシュボード、Rを使った分析・可視化の経験を持つ。",
    "tags": [
      "Tableau",
      "R",
      "可視化",
      "データ分析"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "前職および現在の文脈で、Tableau・Rを使ったデータ分析・可視化に取り組んできた",
      "when": "継続的な学習・実務経験",
      "role": "分析・可視化",
      "stakeholders": "自分、調査・事業関係者",
      "result": "数値を読みやすく共有する基礎技術を持つ"
    },
    "evidenceText": "職務経歴書\nダッシュボード・レポート作成経験",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "数字が見える",
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 3,
      "meaningAxis": 1,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 3,
      "notes": "可視化は見栄えより、比較・異常・変化を発見できることを優先する。",
      "counterEvidence": "高度な分析ほど、前提・データ品質・解釈の説明が必要になる。",
      "nextExperiment": "実務で使う指標を、ユーザー視点の問いと結びつけて再設計する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "データを可視化し、関係者が変化と次の判断を読み取れる形にする。",
      "reusableConditions": "用途と見る人が定まっているダッシュボード",
      "translation": "BI・データビジュアライゼーション",
      "companyTags": [
        "データ",
        "DX"
      ]
    }
  },
  {
    "seedKey": "previous-ad-monitoring",
    "recordStatus": "事実",
    "title": "広告・マーケティング施策を、観測可能な指標として捉える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "広告モニタリングと販促実務の両方から、媒体・反応・行動をつなげて見る。",
    "tags": [
      "広告",
      "モニタリング",
      "マーケティング",
      "効果測定"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "前職の広告モニタリング経験と、現在の広告・販促実務を横断している",
      "when": "前職〜現在",
      "role": "分析・販促",
      "stakeholders": "広告会社、社内関係者",
      "result": "広告を『出すこと』ではなく、目的・指標・行動導線で捉える視点を持つ"
    },
    "evidenceText": "前職の担当領域\n現在の広告レポート・出稿検討",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "数字が見える",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 1,
      "notes": "媒体接触と実際の行動の間にある摩擦を意識する。",
      "counterEvidence": "指標が取れるものだけを重視すると、長期的なブランド効果を見落とす。",
      "nextExperiment": "短期CVと中長期の認知・好意を分けて整理する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "広告を、目的・指標・行動導線のつながりとして考える。",
      "reusableConditions": "施策目的と測定可能性を事前に確認できる案件",
      "translation": "マーケティング効果測定",
      "companyTags": [
        "広告",
        "マーケティング"
      ]
    }
  },
  {
    "seedKey": "skill-project-structure",
    "recordStatus": "事実",
    "title": "曖昧な違和感を、論点と判断基準に変える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "『なんとなく違う』を、目的・対象・論点・リスク・修正案に分解して扱う。",
    "tags": [
      "言語化",
      "編集",
      "合意形成",
      "判断基準"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "発信物や企画の違和感を、具体的な論点と修正案として整理している",
      "when": "継続",
      "role": "企画・編集",
      "stakeholders": "社内外の関係者",
      "result": "感覚論だけでなく、判断できる議論に変える"
    },
    "evidenceText": "校正コメント\n企画資料の修正履歴\n会話での論点整理",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "目的が明確",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 1,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "目的と受け手を決めると、感覚的な違和感も説明しやすくなる。",
      "counterEvidence": "目的自体が割れていると、表現だけの議論では解決しない。",
      "nextExperiment": "議論の冒頭で『今回の判断基準』を明文化する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "曖昧な違和感を、関係者が判断できる論点に変える。",
      "reusableConditions": "目的と受け手を合意できる案件",
      "translation": "コミュニケーション設計・編集",
      "companyTags": [
        "PARK",
        "SIGNING",
        "編集"
      ]
    }
  },
  {
    "seedKey": "skill-stakeholder-alignment",
    "recordStatus": "事実",
    "title": "関係者の多い案件で、確認事項と判断期限を揃える",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "目的、担当、期限、例外、確認順を整理し、進行で詰まる箇所を減らす。",
    "tags": [
      "調整",
      "進行管理",
      "合意形成",
      "PM"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "複数部署・外部関係者の案件で、確認事項と期限を整理して進行している",
      "when": "継続",
      "role": "進行・調整",
      "stakeholders": "社内外の複数関係者",
      "result": "漏れや認識差による手戻りを減らす"
    },
    "evidenceText": "進行表\n確認依頼メール\n会議メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "判断期限あり",
        "関係者が多い",
        "現場運用あり"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 4,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 1,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 1,
      "notes": "依頼文に『何を・いつまでに・何のために』を置くと、返答が速い。",
      "counterEvidence": "決裁権者がいない案件は、丁寧に整理しても進まない。",
      "nextExperiment": "キックオフ時に意思決定者と判断期限を固定する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "関係者の多い案件を、確認可能な進行に変える。",
      "reusableConditions": "判断者と期限を確認できる案件",
      "translation": "プロジェクトマネジメント・ステークホルダー調整",
      "companyTags": [
        "PM",
        "Producer",
        "ShapePartner"
      ]
    }
  },
  {
    "seedKey": "skill-research-synthesis",
    "recordStatus": "自己観察",
    "title": "未知のテーマを、背景・歴史・論点・用語から調べて使える知識にする",
    "type": "能力・知識",
    "domain": "学習",
    "summary": "初心者向けの説明でも、背景や用語を飛ばさず、批判・歴史・実用まで構造化して理解する。",
    "tags": [
      "リサーチ",
      "構造化",
      "解説",
      "知識"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "音楽、社会概念、科学、スポーツ、技術など、未知のテーマを背景から調べ、使える説明へ整理している",
      "when": "継続",
      "role": "個人学習・編集",
      "stakeholders": "自分、必要に応じて仕事関係者",
      "result": "単なる要約ではなく、判断や会話に使える知識の形にする"
    },
    "evidenceText": "各種解説依頼・学習メモ\n記事・動画・資料の要約",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "目的が明確",
        "文章化が必要",
        "前例なし"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 1,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "知らない領域ほど、そもそもの前提・用語・対立点から入ると定着しやすい。",
      "counterEvidence": "広く調べすぎると、今必要な行動や結論がぼやける。",
      "nextExperiment": "調べ始める前に『何に使う知識か』を一行で置く。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "未知のテーマを、背景から理解し、使える知識の構造へ変える。",
      "reusableConditions": "問いと用途が定まっている学習・調査案件",
      "translation": "リサーチ・ナレッジデザイン",
      "companyTags": [
        "リサーチ",
        "戦略"
      ]
    }
  },
  {
    "seedKey": "skill-english-reading",
    "recordStatus": "事実",
    "title": "英語の記事・一次情報を読んで、日本語の論点へ整理する",
    "type": "能力・知識",
    "domain": "学習",
    "summary": "海外記事や英語の資料を読み、背景・論点・実務への示唆を日本語で整理する。",
    "tags": [
      "英語",
      "リサーチ",
      "要約",
      "海外事例"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "英語の記事を読み、業務や学習で使える日本語メモに整理している",
      "when": "継続",
      "role": "個人学習",
      "stakeholders": "自分・必要に応じて関係者",
      "result": "海外の事例や一次情報へアクセスする手段を持つ"
    },
    "evidenceText": "英語学習記録\n海外記事の要点メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "目的が明確",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 0,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "読むだけでなく、用途を決めて短く整理すると続く。",
      "counterEvidence": "専門領域の細かいニュアンスは確認が必要。",
      "nextExperiment": "英語の資料をもとに、5分で口頭説明する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "海外の情報を、仕事で使える日本語の論点に変換できる。",
      "reusableConditions": "読む目的と出力先が明確なとき",
      "translation": "英語による情報収集と要点整理",
      "companyTags": [
        "英語",
        "リサーチ"
      ]
    }
  },
  {
    "seedKey": "skill-english-speaking-practice",
    "recordStatus": "自己観察",
    "title": "英語を、正解探しではなく会話として練習する",
    "type": "習慣",
    "domain": "学習",
    "summary": "短い反応・コメント・質問を繰り返し、翻訳と完璧主義を減らしながら話す練習をしている。",
    "tags": [
      "英語",
      "会話",
      "習慣化",
      "学習設計"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "英語の短文読解や会話テンプレートを、読む→説明する→問いを作る→確認する形で繰り返している",
      "when": "継続",
      "role": "個人学習",
      "stakeholders": "自分",
      "result": "英語を受け身の理解だけで終わらせず、出力する練習を積んでいる"
    },
    "evidenceText": "英語学習の定期ルール\n会話テンプレートの練習記録",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "定型",
      "attributes": [
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 2,
      "capability": 2,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "短く反応してから質問する形だと、完璧な文を作ろうとして止まりにくい。",
      "counterEvidence": "一人での練習だけでは、即時の聞き返しや緊張への耐性は育ちにくい。",
      "nextExperiment": "1分間の要約を音声で録音し、言い直しを確認する。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "skill-excel-sheets",
    "recordStatus": "事実",
    "title": "Excel・Googleスプレッドシートで、業務用の表を設計・整形する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "集計、比較、進行、例外処理、共有を意識して表をつくる。",
    "tags": [
      "Excel",
      "Googleスプレッドシート",
      "データ整形",
      "業務改善"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "チケット・制作進行・KPI・日程・入稿情報などを、用途別に表へ整形している",
      "when": "継続",
      "role": "主担当・支援",
      "stakeholders": "自分、社内関係者、制作チーム",
      "result": "現場で使える一覧と進行管理に落とす"
    },
    "evidenceText": "集計表\n進行表\nTSV/CSV整形\nKPIシート",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "数字が見える",
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 3,
      "meaningAxis": 1,
      "peopleAxis": 1,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 2,
      "notes": "表の完成度は、入力者・確認者・次の判断者が迷わないかで見る。",
      "counterEvidence": "関数や列を増やしすぎると、引き継ぎにくくなる。",
      "nextExperiment": "定例表に『判断メモ』列を追加する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "数字・進行・例外を、現場で使える表に整える。",
      "reusableConditions": "入力する人と使う人の役割が見えているとき",
      "translation": "業務設計・オペレーション改善",
      "companyTags": [
        "PM",
        "DX",
        "データ"
      ]
    }
  },
  {
    "seedKey": "skill-powerpoint-story",
    "recordStatus": "事実",
    "title": "PowerPointで、企画の背景から判断までをつなぐ資料をつくる",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "企画・進行・社内説明の資料を、背景、目的、論点、選択肢、次アクションで組み立てる。",
    "tags": [
      "PowerPoint",
      "企画書",
      "ストーリー",
      "合意形成"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "試合施策、KV制作、会見、広告、地域連携などの資料を作成・編集している",
      "when": "継続",
      "role": "企画・編集",
      "stakeholders": "社内外の関係者",
      "result": "情報の多い案件でも、意思決定しやすい資料にする"
    },
    "evidenceText": "企画資料\n制作依頼資料\n社内説明資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "関係者が多い",
        "判断期限あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "スライドを増やすより、相手が今決めることを中心に情報を削る。",
      "counterEvidence": "情報が足りない状態で見栄えだけを整えると、判断が後ろ倒しになる。",
      "nextExperiment": "各資料の冒頭に『今回決めたいこと』を固定表示する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "複雑な企画を、関係者が判断・実行できる資料に組み立てる。",
      "reusableConditions": "資料の読者と意思決定が明確な案件",
      "translation": "企画書作成・プレゼンテーションデザイン",
      "companyTags": [
        "PM",
        "Producer",
        "戦略"
      ]
    }
  },
  {
    "seedKey": "skill-ai-workflow",
    "recordStatus": "事実",
    "title": "AIを、調査・構造化・制作・検証の補助として使う",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "文章整理、リサーチ、要件定義、コード制作、TSV/JSON整形などでAIを活用している。",
    "tags": [
      "AI",
      "プロンプト",
      "業務改善",
      "構造化"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "AIを使い、実務用の文章、企画の骨子、情報整理、Webツールの実装検討を行っている",
      "when": "継続",
      "role": "個人・業務補助",
      "stakeholders": "自分、必要に応じて関係者",
      "result": "手作業の整理を速め、考えるべき論点に時間を使う"
    },
    "evidenceText": "プロンプトメモ\nAIを使ったアプリ・文章制作の履歴",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "文章化が必要",
        "技術・仕組みを扱う"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "出力をそのまま使わず、目的・事実・トーン・例外を先に指定して検証する。",
      "counterEvidence": "AIのもっともらしい誤りや、本人の言葉が消えるリスクがある。",
      "nextExperiment": "入力・出力・検証の手順を、繰り返し作業ごとにテンプレート化する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "AIを、情報の下ごしらえから検証まで含む実務フローに組み込む。",
      "reusableConditions": "検証者と一次情報を確保できる業務",
      "translation": "AI活用・ナレッジワーク設計",
      "companyTags": [
        "DX",
        "AI",
        "PM"
      ]
    }
  },
  {
    "seedKey": "skill-domain-sports-business",
    "recordStatus": "事実",
    "title": "スポーツ興行を、熱量と事業性の両方から理解する",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "試合、チケット、会員、広告、スポンサー、地域、来場体験を、クラブの収益と関係性の両面から見る。",
    "tags": [
      "スポーツビジネス",
      "Jリーグ",
      "チケット",
      "ファン",
      "興行"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "浦和レッズでの広報・プロモーション実務を通じ、スポーツ興行、チケット、会員、広告、地域連携を横断している",
      "when": "浦和レッズ在籍3年目まで",
      "role": "広報・プロモーション",
      "stakeholders": "ファン、来場者、パートナー、地域、社内",
      "result": "スポーツの熱量と事業運営を切り離さずに考えるドメイン知識を得た"
    },
    "evidenceText": "担当領域の実務\nチケット・広告・イベントの資料",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "社外含む",
      "uncertainty": "例外あり",
      "attributes": [
        "関係者が多い",
        "数字が見える",
        "現場運用あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "ファンを『顧客』だけにせず、帰属・文化・地域との関係も含めて考える。",
      "counterEvidence": "熱量に寄りすぎると、対象外の人にとっての障壁が見えない。",
      "nextExperiment": "施策ごとに『既存ファン・新規・地域・事業』への影響を比較する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "スポーツの熱量と事業性を両方踏まえ、来場・発信・関係づくりを設計する。",
      "reusableConditions": "ファン・事業・地域の利害が重なるスポーツ案件",
      "translation": "スポーツマーケティング・ファンエンゲージメント",
      "companyTags": [
        "スポーツ",
        "ファンベース"
      ]
    }
  },
  {
    "seedKey": "skill-domain-branding",
    "recordStatus": "自己観察",
    "title": "ブランディングを、見た目ではなく判断と行動を変える設計として捉える",
    "type": "能力・知識",
    "domain": "学習",
    "summary": "MVV、パーセプションチェンジ、コピー、組織浸透を、表現と運用の両方から学んでいる。",
    "tags": [
      "ブランディング",
      "MVV",
      "パーセプションチェンジ",
      "コピー"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "PARK等の事例研究や、理念宣言の実務を通じ、ブランドを『人が判断・行動するための共有物』として理解しようとしている",
      "when": "2026年の学習・実務",
      "role": "個人学習・広報設計",
      "stakeholders": "自分",
      "result": "転職先の検討と現職のコミュニケーション設計をつなげている"
    },
    "evidenceText": "PARKの事例研究\nWhat Can I Do?の設計\nパーセプションチェンジの学習メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "目的が明確",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 2,
      "creativeAxis": 3,
      "technicalAxis": 0,
      "notes": "ブランドは『らしさ』の装飾ではなく、何を大事にしてどう選ぶかを揃えるものとして見たい。",
      "counterEvidence": "言葉を整えても、実際の接点や振る舞いが変わらなければ認識は変わらない。",
      "nextExperiment": "事例を『言葉・体験・組織運用』の3層で比較する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "ブランドを、表現だけでなく組織と顧客の判断を変える仕組みとして理解する。",
      "reusableConditions": "理念・体験・運用を横断して考える案件",
      "translation": "ブランド戦略・組織コミュニケーション",
      "companyTags": [
        "PARK",
        "KESIKI",
        "SIGNING"
      ]
    }
  },
  {
    "seedKey": "skill-press-release-structure",
    "recordStatus": "事実",
    "title": "公式リリースを、情報の優先順位と問い合わせ導線で組み立てる",
    "type": "能力・知識",
    "domain": "仕事",
    "summary": "発表内容、背景、対象、日時、手続き、注意事項、問い合わせ先を、読み手の判断順に並べる。",
    "tags": [
      "プレスリリース",
      "公式サイト",
      "情報設計",
      "広報"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "選手、イベント、払い戻し、注意喚起など、目的の異なる公式発表を構成・校正している",
      "when": "継続",
      "role": "広報・編集",
      "stakeholders": "ファン、メディア、来場者、社内関係者",
      "result": "目的の異なる公開情報を、誤解なく案内する"
    },
    "evidenceText": "公式サイトリリース\n払い戻しリリース\n注意喚起文",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "短納期",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "定型",
      "attributes": [
        "文章化が必要",
        "判断期限あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "読者の関心が異なるため、最初に『何が起きたか』『自分に何が必要か』を置く。",
      "counterEvidence": "社内の事情を丁寧に説明しすぎると、読者に必要な行動が埋もれる。",
      "nextExperiment": "公開前に『初見の人が最初の30秒で分かること』を確認する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "公式情報を、読み手の判断と行動に必要な順番で構成する。",
      "reusableConditions": "目的・対象・手続きが明確な発信",
      "translation": "コーポレートコミュニケーション・コンテンツ設計",
      "companyTags": [
        "PR",
        "編集"
      ]
    }
  },
  {
    "seedKey": "project-countvoice",
    "recordStatus": "事実",
    "title": "10秒ごとの読み上げカウントアプリを、実使用から改善する",
    "type": "実例",
    "domain": "私生活",
    "summary": "集中を支えるカウント読み上げアプリを、毎秒音・10秒ごとの読み上げ・iPhone表示・アイコンまで改善した。",
    "tags": [
      "個人開発",
      "JavaScript",
      "集中",
      "GitHub Pages"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "カウント読み上げアプリについて、10秒ごとの読み上げ、1分の単位読み上げ、開始後の設定変更、毎秒音、iPhone Safariのアイコン表示を検討・実装した",
      "when": "2026年6月",
      "role": "企画・実装・テスト",
      "stakeholders": "自分",
      "result": "自分の集中方法に合わせたブラウザツールを公開・改善した"
    },
    "evidenceText": "GitHub Pages：countvoice\niPhone Safariのホーム画面アイコン調整\n機能要件メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "技術・仕組みを扱う"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "自分が毎日使うから、機能の不足やUIの不快さを具体的に発見できる。",
      "counterEvidence": "機能追加を続けると、核となる『数える』体験がぼやける。",
      "nextExperiment": "利用感から、残す機能と削る機能を月1回見直す。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "自分の集中課題を、試作と実使用で改善する小さなWebアプリに変える。",
      "reusableConditions": "利用者として自分が継続検証できる環境",
      "translation": "ユーザー起点のプロトタイピング",
      "companyTags": [
        "DX",
        "プロダクト",
        "UX"
      ]
    }
  },
  {
    "seedKey": "project-kakidas",
    "recordStatus": "事実",
    "title": "文章・段落・単語をメモ化するアプリを、利用から仕様へ育てる",
    "type": "実例",
    "domain": "私生活",
    "summary": "メモの粒度、タグ、並び順、モバイル入力、ファイル数など、使う中で出る問題を仕様へ変える。",
    "tags": [
      "個人開発",
      "メモ",
      "React",
      "UIUX",
      "情報整理"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "kakidas系のメモアプリで、段落・文・単語のメモ化、作成順・更新順、単一タグ、タグ管理、スマホ入力の画面ずれ、ファイル数削減などを継続して検討・実装している",
      "when": "2026年6月",
      "role": "企画・仕様設計・実装",
      "stakeholders": "自分",
      "result": "情報を粒度別に残し、後から探せる個人ツールを育てている"
    },
    "evidenceText": "kakidas開発ログ\nモバイル入力不具合の検討\nタグ管理仕様",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "技術・仕組みを扱う",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "抽象的な機能要求より、自分が入力中に困った瞬間から仕様を起こすと精度が上がる。",
      "counterEvidence": "メモの粒度を増やしすぎると、保存や閲覧の負荷が増える。",
      "nextExperiment": "利用頻度の低い機能を削り、主要導線を3つに絞る。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "実使用で見つかった違和感を、具体的なUI・データ仕様へ変える。",
      "reusableConditions": "自分で繰り返し触り、仮説検証できるプロダクト",
      "translation": "プロダクト企画・UX改善",
      "companyTags": [
        "Goodpatch",
        "DX",
        "プロダクト"
      ]
    }
  },
  {
    "seedKey": "project-sakura-extension",
    "recordStatus": "事実",
    "title": "Sakura Editorで文字化けしにくいMD変換を、選択式の拡張機能にする",
    "type": "実例",
    "domain": "私生活",
    "summary": "SJIS・UTF-8の非対応文字を扱い、除外・変換・検出結果表示を選べるようにする。",
    "tags": [
      "Chrome拡張",
      "JavaScript",
      "文字コード",
      "業務改善"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "Sakura Editorでの文字コードエラーに対し、MD変換時の非対応文字の変換・除外を選択式にし、弾いた文字を表示する機能を検討・実装した",
      "when": "2026年6月",
      "role": "仕様設計・実装",
      "stakeholders": "自分",
      "result": "実務上のコピー＆ペースト事故を減らすツールの仕様を作った"
    },
    "evidenceText": "Chrome拡張のHTML/CSS/JS\nSJIS・UTF-8対応の検討メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "技術・仕組みを扱う",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 3,
      "creativeAxis": 1,
      "technicalAxis": 3,
      "notes": "『変換する』だけでなく、使いたい人が選べて、何が変わったかを確認できることが重要。",
      "counterEvidence": "全ての文字化けを完全に予測することは難しい。",
      "nextExperiment": "実際に失敗した文字のケースをテストデータとして保存する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "現場の小さな不便を、選択可能で確認できるツール仕様に変える。",
      "reusableConditions": "具体的な失敗例を集められる業務改善",
      "translation": "業務改善ツール・フロントエンド実装",
      "companyTags": [
        "DX",
        "プロダクト"
      ]
    }
  },
  {
    "seedKey": "project-evidence-ledger",
    "recordStatus": "事実",
    "title": "自分の実績を、事実・証拠・条件・提示用メモに分けて残すアプリを設計する",
    "type": "実例",
    "domain": "私生活",
    "summary": "自己採点ではなく、経験の根拠と発揮条件を蓄積するEvidence Ledgerを設計・実装した。",
    "tags": [
      "Evidence Ledger",
      "個人開発",
      "キャリア",
      "TSV",
      "UIUX"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "受信箱、台帳、整理、発見、出力、TSV入出力を持つ実績台帳アプリを、IndexedDB保存・差分プレビュー・Undo込みで実装した",
      "when": "2026年6月",
      "role": "企画・仕様設計・実装",
      "stakeholders": "自分",
      "result": "転職・面接の準備を、自己PRではなく根拠の蓄積から進める基盤を作った"
    },
    "evidenceText": "Evidence LedgerのHTML/CSS/JavaScript\nTSV全件・部分更新・復元設計\nアプリアイコンとGitHub Pages構成",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "技術・仕組みを扱う",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "事実、自己観察、仮説、面接用の言い換えを混ぜない設計にする。",
      "counterEvidence": "分類や評価を増やしすぎると、肝心の記録が止まる。",
      "nextExperiment": "実際の記録を入れ、検索・整理・出力までの摩擦を観察する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "自己理解を採点ではなく、根拠の蓄積と検証として支えるツールを設計する。",
      "reusableConditions": "本人が繰り返し使い、要件を更新できる個人プロダクト",
      "translation": "キャリア支援プロダクト・情報アーキテクチャ",
      "companyTags": [
        "プロダクト",
        "UX",
        "DX"
      ]
    }
  },
  {
    "seedKey": "project-github-pages",
    "recordStatus": "事実",
    "title": "GitHub Pagesで、個人ツールを公開・配布できる形にする",
    "type": "能力・知識",
    "domain": "私生活",
    "summary": "静的ファイル構成、相対パス、PWAアイコン、iPhone Safari表示を踏まえ、公開状態まで持っていく。",
    "tags": [
      "GitHub Pages",
      "デプロイ",
      "PWA",
      "Web"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "個人ツールをGitHub Pagesで公開し、アイコン・publicフォルダ・パス・Safari表示などを調整している",
      "when": "2026年6月",
      "role": "実装・公開",
      "stakeholders": "自分",
      "result": "ローカルの試作を、スマホでも使える公開ツールへ変えている"
    },
    "evidenceText": "GitHub Pages URL\npublic/assets構成\nPWAアイコン設定",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "技術・仕組みを扱う",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 0,
      "meaningAxis": 1,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 3,
      "notes": "公開後にスマホ実機で見ると、PC上では見えない不具合が出る。",
      "counterEvidence": "静的ホスティングの制約で、サーバー側の機能は使えない。",
      "nextExperiment": "公開前チェックを、PC・iPhone Safari・ホーム画面の3環境で固定する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "個人の試作を、実機で使えるWebアプリとして公開・改善する。",
      "reusableConditions": "静的構成で完結できるプロダクト",
      "translation": "フロントエンド実装・デプロイ",
      "companyTags": [
        "DX",
        "プロダクト"
      ]
    }
  },
  {
    "seedKey": "project-mobile-input-debug",
    "recordStatus": "事実",
    "title": "スマホ入力中に画面がずれる不具合を、再現条件から直す",
    "type": "実例",
    "domain": "私生活",
    "summary": "入力ごとの再レンダリング、画面スクロール、フォーカス喪失などを切り分け、体験として直す。",
    "tags": [
      "モバイル",
      "UIUX",
      "デバッグ",
      "入力フォーム"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "メモアプリで、スマホ入力時に1文字ごとに画面が上がり入力欄が見えなくなる問題について、原因と修正方針を検討・実装した",
      "when": "2026年6月",
      "role": "不具合分析・実装",
      "stakeholders": "自分",
      "result": "機能要件ではなく、実際の入力体験から改善を進めた"
    },
    "evidenceText": "不具合再現の説明\nモバイル入力の修正ログ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "技術・仕組みを扱う",
        "現場運用あり"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 0,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 3,
      "notes": "見た目の不具合ではなく、『ユーザーが何をしようとして、どこで操作が途切れるか』から見る。",
      "counterEvidence": "端末・ブラウザ差があり、1環境だけの修正では再発する。",
      "nextExperiment": "入力フォームの回帰チェック項目を作る。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "実使用で起きる操作のつまずきを、再現条件からUI改善へつなげる。",
      "reusableConditions": "利用環境を実機で確認できるプロダクト",
      "translation": "モバイルUX改善・フロントエンドデバッグ",
      "companyTags": [
        "UX",
        "プロダクト"
      ]
    }
  },
  {
    "seedKey": "project-json-tsv-design",
    "recordStatus": "事実",
    "title": "JSONとTSVで、壊れにくい個人データの入出力を設計する",
    "type": "能力・知識",
    "domain": "私生活",
    "summary": "全件バックアップ、部分更新、全置換、差分表示、Undoを分け、空欄による上書きを防ぐ。",
    "tags": [
      "JSON",
      "TSV",
      "データ設計",
      "安全設計"
    ],
    "frequency": "単発",
    "lastPracticedAt": "",
    "fact": {
      "what": "Evidence Ledgerで、追加・部分更新・全件復元・全置換のTSVフロー、差分プレビュー、__CLEAR__、Undoを設計した",
      "when": "2026年6月",
      "role": "データ設計・実装",
      "stakeholders": "自分",
      "result": "スプレッドシートとアプリを行き来しても事故りにくい仕様を作った"
    },
    "evidenceText": "TSV仕様\n差分プレビュー\nIndexedDBスナップショット",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "技術・仕組みを扱う",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 3,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 3,
      "creativeAxis": 1,
      "technicalAxis": 3,
      "notes": "『できること』より、間違っても戻せることを最初に設計する。",
      "counterEvidence": "仕様を細かくしすぎると、初回利用の理解負荷が上がる。",
      "nextExperiment": "初見の人が部分更新を誤解せず使える説明をテストする。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "表計算とアプリを行き来するデータを、誤操作から守る入出力設計ができる。",
      "reusableConditions": "利用者がデータを自分で編集・復元するプロダクト",
      "translation": "データUX・情報設計",
      "companyTags": [
        "DX",
        "プロダクト",
        "PM"
      ]
    }
  },
  {
    "seedKey": "project-prompt-library",
    "recordStatus": "事実",
    "title": "プロンプトを、検索・分類・再利用できる個人ナレッジにする",
    "type": "実例",
    "domain": "私生活",
    "summary": "よく使うプロンプトを、カテゴリ・検索・並び順で整理し、必要な時に取り出せるようにする。",
    "tags": [
      "プロンプト",
      "ナレッジ管理",
      "UIUX",
      "AI"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "プロンプトメモの分類整理、タイトル・本文検索、よく使う順・追加順の管理を含む個人ナレッジ管理を扱っている",
      "when": "継続",
      "role": "個人開発・運用",
      "stakeholders": "自分",
      "result": "AIとのやりとりを一回性の会話ではなく、再利用資産として扱う"
    },
    "evidenceText": "プロンプトメモUI\n検索・並び替えの機能",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "技術・仕組みを扱う",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "よく使うものほど、記憶ではなく検索と再利用に寄せる。",
      "counterEvidence": "分類を先に決めすぎると、後から増えた用途が入らなくなる。",
      "nextExperiment": "使った回数と改善履歴を追加するか検討する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "一回性の思考やプロンプトを、検索できる再利用資産に変える。",
      "reusableConditions": "反復使用する文章・判断型の業務",
      "translation": "ナレッジマネジメント・AIワークフロー",
      "companyTags": [
        "DX",
        "AI"
      ]
    }
  },
  {
    "seedKey": "hobby-soccer-analysis",
    "recordStatus": "自己観察",
    "title": "サッカーを、戦術・選手・大会文脈から深く見る",
    "type": "習慣",
    "domain": "趣味",
    "summary": "クラブ・代表・国際大会について、結果だけでなく戦術、選手構成、歴史、強さの理由を調べて考える。",
    "tags": [
      "サッカー",
      "分析",
      "戦術",
      "Jリーグ",
      "代表"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "サッカーについて、クラブ実務だけでなく、代表戦、海外・各国事情、選手・チームの強さを継続して調べている",
      "when": "継続",
      "role": "個人",
      "stakeholders": "自分",
      "result": "仕事にも趣味にもつながるドメイン知識を深めている"
    },
    "evidenceText": "サッカー関連の調査・分析メモ\n観戦・会話の蓄積",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 1,
      "capability": 4,
      "dataAxis": 2,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "選手個人、戦術、クラブ文化、リーグ構造をつなげると、観戦の解像度が上がる。",
      "counterEvidence": "知識が増えるほど、目の前の試合を単純に楽しめなくなる時がある。",
      "nextExperiment": "観戦後に『事実・解釈・次に見たいこと』を3行で残す。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "スポーツを、戦術・文化・事業の複数視点から深く読み解く。",
      "reusableConditions": "一次情報と背景情報を往復できるテーマ",
      "translation": "スポーツビジネス・コンテンツリサーチ",
      "companyTags": [
        "スポーツ",
        "リサーチ"
      ]
    }
  },
  {
    "seedKey": "hobby-shogi-learning",
    "recordStatus": "自己観察",
    "title": "将棋を、目標設定と反復学習で上達させる",
    "type": "習慣",
    "domain": "趣味",
    "summary": "級位者として初段を目標にし、対局・定跡・振り返りを通じて学習を続ける。",
    "tags": [
      "将棋",
      "学習",
      "目標設定",
      "振り返り"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "将棋で、級位者から初段を目標に、学習テーマと継続方法を考えている",
      "when": "継続",
      "role": "個人",
      "stakeholders": "自分",
      "result": "短期の勝敗だけでなく、学習の設計として趣味を続けている"
    },
    "evidenceText": "将棋の目標設定メモ\n学習相談の記録",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 2,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "『できない』を能力不足で終わらせず、学習ステップの設計として見ると続けやすい。",
      "counterEvidence": "振り返りを増やしすぎると、対局量が減る。",
      "nextExperiment": "1局ごとにテーマを1つだけ選び、次局で試す。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "hobby-reading",
    "recordStatus": "自己観察",
    "title": "読書から、考え方と言葉のストックをつくる",
    "type": "習慣",
    "domain": "趣味",
    "summary": "仕事・哲学・心理・文化などを読み、言葉や見方を自分の思考に取り込む。",
    "tags": [
      "読書",
      "知識",
      "言葉",
      "思考"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "読書を継続し、仕事や自己理解に使える考え方・表現を集めている",
      "when": "継続",
      "role": "個人",
      "stakeholders": "自分",
      "result": "短期の実用だけでない知的な基盤をつくっている"
    },
    "evidenceText": "読書メモ\n会話・企画への参照",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 1,
      "capability": 3,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 0,
      "operationsAxis": 0,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "すぐに使わない知識でも、後から企画や言葉の土台になる。",
      "counterEvidence": "読むこと自体が目的になると、出力や経験に接続しにくい。",
      "nextExperiment": "読後に『今の仕事に接続できる一文』を残す。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "hobby-hello-project",
    "recordStatus": "自己観察",
    "title": "アイドル文化を、作品・メンバー・運営・ファンの文脈から楽しむ",
    "type": "習慣",
    "domain": "趣味",
    "summary": "BEYOOOOONDS等のハロプロを、楽曲・構成・活動・コミュニティの観点で追う。",
    "tags": [
      "ハロプロ",
      "BEYOOOOONDS",
      "カルチャー",
      "ファン"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "ハロプロを継続的に追い、楽曲・メンバー構成・ライブ・活動の背景について考えている",
      "when": "継続",
      "role": "個人",
      "stakeholders": "自分",
      "result": "好きな文化を、受け身でなく文脈ごと楽しむ習慣がある"
    },
    "evidenceText": "鑑賞・会話の蓄積\nイベント・楽曲に関するメモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 1,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 0,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "コンテンツそのものだけでなく、メンバーの変化やグループの物語を見る。",
      "counterEvidence": "好きな領域ほど、外からの批評や数字を受け取りづらくなることがある。",
      "nextExperiment": "『好きな理由』を、作品・人・仕組みの3方向から言語化する。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "self-count-focus",
    "recordStatus": "自己観察",
    "title": "短いカウントで注意を戻し、集中を立ち上げる",
    "type": "習慣",
    "domain": "健康",
    "summary": "10〜15秒を数えることで、注意が散った状態から作業へ戻る自分なりの方法を使う。",
    "tags": [
      "集中",
      "ADHD傾向",
      "カウント",
      "セルフマネジメント"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "短い時間を数えることで落ち着き、集中を戻しやすいという実感から、カウントアプリも作っている",
      "when": "2026年6月までの自己観察",
      "role": "個人",
      "stakeholders": "自分",
      "result": "注意の切り替えを、意志だけに頼らず外部化する方法を持つ"
    },
    "evidenceText": "カウント集中法メモ\ncountvoiceアプリ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "当日対応",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 1,
      "capability": 3,
      "dataAxis": 0,
      "meaningAxis": 1,
      "peopleAxis": 0,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 1,
      "notes": "『集中しよう』より、短い単位で今に戻るほうが動き出しやすい。",
      "counterEvidence": "疲労や痛みが強い日は、カウントだけで回復しない。",
      "nextExperiment": "どの作業・時間帯で効くかを簡単に記録する。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "self-adhd-externalization",
    "recordStatus": "自己観察",
    "title": "締切のない仕事を、外部化と小さな区切りで動かす",
    "type": "気づき",
    "domain": "健康",
    "summary": "5分集中、数える、通話、メモ化、他者のために変換するなど、自分が動きやすい条件を試している。",
    "tags": [
      "ADHD傾向",
      "外部化",
      "習慣化",
      "作業設計"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "締切のない仕事は進みにくく、外部化・小さな締切・他者との接点があると動きやすいという方法を整理している",
      "when": "2026年6月までの自己観察",
      "role": "個人",
      "stakeholders": "自分",
      "result": "意志や気合に頼らない作業環境の設計を試している"
    },
    "evidenceText": "ADHD向け作業法メモ\n5分集中・通話・数える等の記録",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "未記録",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 3,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 1,
      "operationsAxis": 3,
      "creativeAxis": 0,
      "technicalAxis": 1,
      "notes": "仕事を『自分のため』だけでなく、誰かに渡せるものへ変換すると着手しやすい。",
      "counterEvidence": "仕組みを作ること自体が先延ばしになることがある。",
      "nextExperiment": "作業の開始条件を1つに絞り、1週間だけ検証する。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "pattern-externalize-then-act",
    "recordStatus": "仮説",
    "title": "外部化して納得できると、行動の出力が上がる",
    "type": "気づき",
    "domain": "私生活",
    "summary": "頭の中だけで進めるより、メモ・表・会話・画面へ出すと、次の行動を選びやすくなる。",
    "tags": [
      "外部化",
      "自己理解",
      "行動",
      "構造化"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "自分は雰囲気で動くより、外部化してから納得できると強い、という自己理解を言葉にしている",
      "when": "2026年6月の自己理解メモ",
      "role": "個人",
      "stakeholders": "自分",
      "result": "行動を始める前に必要な支援の形を仮説化した"
    },
    "evidenceText": "自己理解メモ：外部化してから納得の動きができると強い\n個人ツール開発の継続",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "未記録",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "裁量あり",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 1,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 3,
      "creativeAxis": 1,
      "technicalAxis": 2,
      "notes": "メモ化・表・会話・ツール化が、思考の終点ではなく着手の起点になる。",
      "counterEvidence": "外部化の形式にこだわりすぎると、行動を始める前に疲れる。",
      "nextExperiment": "同じタスクを『口頭』『箇条書き』『表』の3形式で外部化し、着手速度を比べる。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "曖昧な状態を外部化し、納得して動ける形へ変える。",
      "reusableConditions": "情報や選択肢が頭の中で混線している状況",
      "translation": "情報構造化・セルフマネジメント",
      "companyTags": [
        "PM",
        "プロダクト"
      ]
    }
  },
  {
    "seedKey": "pattern-criteria-before-expression",
    "recordStatus": "仮説",
    "title": "表現の議論より先に、目的と判断基準を置くと前に進みやすい",
    "type": "気づき",
    "domain": "仕事",
    "summary": "コピー・資料・企画・運用で、良し悪しの議論を目的・受け手・行動で固定すると合意が早い。",
    "tags": [
      "判断基準",
      "合意形成",
      "編集",
      "企画"
    ],
    "frequency": "繰り返し",
    "lastPracticedAt": "",
    "fact": {
      "what": "企画・文章・制作の多くで、目的と受け手を先に置くと違和感を説明しやすいという経験を重ねている",
      "when": "継続実務の振り返り",
      "role": "企画・編集",
      "stakeholders": "社内外の関係者",
      "result": "表現好みの対立を、判断できる論点へ戻す"
    },
    "evidenceText": "KV制作要件\n告知文編集\n企画資料の修正履歴",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "中程度",
      "stakeholderScale": "複数部署",
      "uncertainty": "例外あり",
      "attributes": [
        "目的が明確",
        "文章化が必要",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 4,
      "dataAxis": 0,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 1,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "判断基準があると、相手の意見を否定せずに比較できる。",
      "counterEvidence": "目的の設定自体に対立があると、判断基準だけでは解けない。",
      "nextExperiment": "会議冒頭に『今回の判断基準』を3つだけ表示する。"
    },
    "presentation": {
      "use": "使う",
      "oneLiner": "表現や意見の違いを、目的と判断基準の議論へ戻す。",
      "reusableConditions": "複数の正解候補があり、関係者の意見が分かれる案件",
      "translation": "意思決定ファシリテーション・コミュニケーション戦略",
      "companyTags": [
        "PARK",
        "PM",
        "戦略"
      ]
    }
  },
  {
    "seedKey": "pattern-nuance-and-logic",
    "recordStatus": "仮説",
    "title": "論理と納得度へのこだわりが、説明・調整・編集で力になる",
    "type": "気づき",
    "domain": "仕事",
    "summary": "自分が『なぜそうするのか』の説明にこだわる傾向を、曖昧さを減らす力として扱う。",
    "tags": [
      "論理",
      "納得度",
      "説明",
      "合意形成"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "転職面接の自己理解で、論理や納得度にこだわりがあり、その部分を強みにできると感じている",
      "when": "2026年6月の自己理解・面接準備",
      "role": "個人",
      "stakeholders": "自分",
      "result": "性格の表現を、仕事での具体的な働き方へ翻訳しようとしている"
    },
    "evidenceText": "面接準備の会話\n資料・文章・進行の実例",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "未記録",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "例外あり",
      "attributes": [
        "文章化が必要",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 2,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "相手が納得して動ける状態まで説明を詰めたいという欲求がある。",
      "counterEvidence": "納得を待ちすぎると、試しながら決めるべき局面で遅れる。",
      "nextExperiment": "『今決めること』と『試してから決めること』を分けて書く。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "理由と判断基準を言語化し、関係者が納得して動ける状態をつくる。",
      "reusableConditions": "複数人の理解や判断が必要な案件",
      "translation": "合意形成・論点設計",
      "companyTags": [
        "PM",
        "Producer",
        "PR"
      ]
    }
  },
  {
    "seedKey": "pattern-trial-and-error",
    "recordStatus": "仮説",
    "title": "最短解より、試行錯誤を通じて攻略法を見つけるほうが力が出る",
    "type": "気づき",
    "domain": "私生活",
    "summary": "完成形を一発で出すより、実際に触り、修正し、条件を見つける過程に強みがあるという仮説。",
    "tags": [
      "試行錯誤",
      "学習",
      "プロトタイピング",
      "改善"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "個人開発・将棋・作業法の検討を通じて、『最短で勝つのではなく攻略で勝つ』という方針を言語化している",
      "when": "2026年6月の自己理解メモ",
      "role": "個人",
      "stakeholders": "自分",
      "result": "自分が力を出しやすい学習・制作のモードを仮説化した"
    },
    "evidenceText": "自己理解メモ\n個人ツールの反復改善",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "余裕あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし"
      ]
    },
    "reflection": {
      "enjoyment": 5,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 2,
      "peopleAxis": 0,
      "operationsAxis": 2,
      "creativeAxis": 2,
      "technicalAxis": 3,
      "notes": "動かして見える問題から、次の仕様や学習テーマを決める。",
      "counterEvidence": "締切が厳しい案件では、探索を続けすぎると決め切れない。",
      "nextExperiment": "探索フェーズと収束フェーズの終了条件を先に決める。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "試作・検証・修正を通じて、複雑な課題の攻略法を見つける。",
      "reusableConditions": "試しながら条件を発見できる不確実な課題",
      "translation": "プロトタイピング・仮説検証",
      "companyTags": [
        "プロダクト",
        "Goodpatch",
        "PM"
      ]
    }
  },
  {
    "seedKey": "pattern-role-and-self",
    "recordStatus": "仮説",
    "title": "役割や正解を意識しすぎると、伸び伸びした出力が落ちる",
    "type": "気づき",
    "domain": "私生活",
    "summary": "面接や人との関わりで、役割や正解探しが強すぎると、自然な発言・判断が狭くなるという仮説。",
    "tags": [
      "自己理解",
      "面接",
      "自信",
      "パフォーマンス"
    ],
    "frequency": "ときどき",
    "lastPracticedAt": "",
    "fact": {
      "what": "面接でも日常でも、役割を意識しすぎず『my rule』で動く必要があると考えている",
      "when": "2026年6月の自己理解メモ",
      "role": "個人",
      "stakeholders": "自分",
      "result": "力が出ない条件を、性格の欠点でなく状況と認知の問題として扱おうとしている"
    },
    "evidenceText": "自己理解メモ：のびのびやる\n面接準備の会話",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "当日対応",
      "autonomy": "中程度",
      "stakeholderScale": "少人数",
      "uncertainty": "例外あり",
      "attributes": [
        "前例なし",
        "関係者が多い"
      ]
    },
    "reflection": {
      "enjoyment": 2,
      "depletion": 4,
      "capability": 2,
      "dataAxis": 0,
      "meaningAxis": 2,
      "peopleAxis": 3,
      "operationsAxis": 1,
      "creativeAxis": 1,
      "technicalAxis": 0,
      "notes": "不意を突かれない準備は必要だが、準備が正解探しに変わると逆効果になる。",
      "counterEvidence": "役割を意識することで、相手への配慮や責任が保てる場面もある。",
      "nextExperiment": "面接回答を『正解』ではなく『自分の経験から言えること』で1分話す練習をする。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  },
  {
    "seedKey": "pattern-meaningful-work",
    "recordStatus": "仮説",
    "title": "仕事の価値を、成果だけでなく自分の納得と社会的意味で見たい",
    "type": "気づき",
    "domain": "仕事",
    "summary": "転職検討で、広報・PR・ブランディング・社会連携を通じて、何を増やす仕事かを考えている。",
    "tags": [
      "キャリア",
      "価値観",
      "PR",
      "ブランディング"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "企業選びで、仕事内容だけでなく、解釈を企画・実装へ変えられるか、社会や人への意味があるかを重視している",
      "when": "2026年6月の転職検討",
      "role": "個人",
      "stakeholders": "自分",
      "result": "応募先の共通軸と、自分が伸び伸び働ける条件を探している"
    },
    "evidenceText": "候補企業の整理：コンセント、ファンベースカンパニー、inquire、Re:public、SIGNING、PARK、KESIKI等\n転職検討メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "裁量あり",
        "前例なし",
        "目的が明確"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 3,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 2,
      "operationsAxis": 1,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "言葉や企画が、実際に人や組織の行動を変える仕事に惹かれている。",
      "counterEvidence": "価値観の一致を求めすぎると、現実的な条件や学べる環境を見落とす。",
      "nextExperiment": "応募先ごとに『自分が提供できること』『学べること』『避けたい条件』を1枚で比較する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "解釈を企画と実装へ変え、人や組織の行動につながる仕事を選ぶ。",
      "reusableConditions": "価値観と実務の両方を確かめられる選考",
      "translation": "キャリア判断・ブランドコミュニケーション",
      "companyTags": [
        "PARK",
        "inquire",
        "ファンベースカンパニー",
        "コンセント"
      ]
    }
  },
  {
    "seedKey": "career-pm-producer-pr",
    "recordStatus": "自己観察",
    "title": "キャリアの役割優先度を、PM＞Producer＞PRとして整理する",
    "type": "気づき",
    "domain": "仕事",
    "summary": "広報を入口に持ちつつ、企画・進行・実装まで担うPM／プロデューサー役で力を出したい。",
    "tags": [
      "キャリア",
      "PM",
      "Producer",
      "PR"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "転職の役割希望として、PM＞Producer＞PRの順を整理している",
      "when": "2026年6月",
      "role": "個人",
      "stakeholders": "自分",
      "result": "過去の経験を、次の役割選択へ接続している"
    },
    "evidenceText": "転職準備メモ\n職務経歴書の主スキル整理",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "目的が明確",
        "文章化が必要"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 3,
      "operationsAxis": 3,
      "creativeAxis": 2,
      "technicalAxis": 1,
      "notes": "企画を言葉だけで終わらせず、関係者と実装・運用まで持つ役割に魅力を感じる。",
      "counterEvidence": "役割名だけで選ぶと、実際の裁量や業務比率を見落とす。",
      "nextExperiment": "求人ごとに『企画・進行・発信・運用』の比率を記録する。"
    },
    "presentation": {
      "use": "候補",
      "oneLiner": "広報の視点を持ちながら、企画から実装までを進めるPM／プロデューサーを志向する。",
      "reusableConditions": "企画・実装・関係者調整を横断できる役割",
      "translation": "プロジェクトマネジメント・プロデュース",
      "companyTags": [
        "PARK",
        "ShapePartner",
        "OZMA"
      ]
    }
  },
  {
    "seedKey": "career-company-fit",
    "recordStatus": "自己観察",
    "title": "企業の表層ではなく、仕事の構造から相性を比較する",
    "type": "習慣",
    "domain": "仕事",
    "summary": "候補企業を、自然に力が出そうか、解釈を企画・実装へ変えられるか、領域相性はどうかで分類する。",
    "tags": [
      "転職",
      "企業研究",
      "比較",
      "自己理解"
    ],
    "frequency": "継続中",
    "lastPracticedAt": "",
    "fact": {
      "what": "候補企業をS/A/Bで分け、コンセント、ファンベースカンパニー、inquire、Re:public、SIGNING、PARK、KESIKI、HERALBONY、Goodpatch等の相性を比較している",
      "when": "2026年6月",
      "role": "個人",
      "stakeholders": "自分",
      "result": "社名や条件だけでなく、仕事の構造と自分の発揮条件を突き合わせている"
    },
    "evidenceText": "候補企業のS/A/B整理\n面接準備メモ",
    "linkedRecordIds": [],
    "conditions": {
      "deadline": "期限あり",
      "autonomy": "高い",
      "stakeholderScale": "自分中心",
      "uncertainty": "前例なし",
      "attributes": [
        "目的が明確",
        "裁量あり"
      ]
    },
    "reflection": {
      "enjoyment": 4,
      "depletion": 2,
      "capability": 3,
      "dataAxis": 1,
      "meaningAxis": 3,
      "peopleAxis": 1,
      "operationsAxis": 1,
      "creativeAxis": 2,
      "technicalAxis": 0,
      "notes": "企業のかっこよさより、どんな課題をどんな手触りで扱うかを見る。",
      "counterEvidence": "情報が公開されている企業ほど、発信の巧さに印象が引っ張られる。",
      "nextExperiment": "面接で確認すべき『案件の進め方・裁量・評価・チーム』をテンプレート化する。"
    },
    "presentation": {
      "use": "まだ使わない",
      "oneLiner": "",
      "reusableConditions": "",
      "translation": "",
      "companyTags": []
    }
  }
]);
