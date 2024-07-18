const static_empty_user = {
  uid: '',
  name: '',
  email: '',
  avatarUrl: '/logo.svg',
};

const static_poster = {
  uid: '123',
  name: '孤灯明月映落叶',
  email: 'mojo@example.com',
  avatarUrl: '/logo.svg',
};
const static_poster_2 = {
  uid: '12345',
  name: '毛',
  email: 'mojoMao@example.com',
  avatarUrl: '/../src/assets/img/GameCirclePic.png',
};

const static_post = {
  pid: '123',
  time: '2021-09-01 00:12',
  content: 'HPV是Human papilloma virus的缩写，中文名称为人乳头瘤病毒。\
  HPV属于乳多空病毒科乳头瘤空泡病毒A属，是一种球形DNA病毒。\
  HPV感染可引起生殖道皮肤、黏膜发生一系列病变，与子宫颈癌相关性最高。\
  **几乎100%的子宫颈癌与高危HPV的持续感染相关**，其中HPV16/18诱发癌变的风险最高。\
  目前已确定的HPV型别有200余种，根据有无致癌性将HPV分为高危型和低危型；\
  我国国家药品监督管理局根据世界卫生组织国际癌症研究机构的建议，\
  将HPV16、18、31、33、35、39、45、51、52、56、58、59、68定义为高危型.',
  img: ['/logo.svg', '/../src/assets/img/FamilyCirclePic.png', '/../src/assets/img/gameCirclePic.png'],
  actinfo: [
    { name: 'Looks', value: 20 },
    { name: 'Likes', value: 3 },
    { name: 'Coms', value: 104 }
  ]
};
const static_post_2 = {
  pid: '1234455',
  time: '2024-1-1 17:34',
  content: '吃饭',
  img: [
    '/logo.svg',
    '/../src/assets/img/gameCirclePic.png',
    '/logo.svg',
    '/../src/assets/img/FamilyCirclePic.png',
    '/../src/assets/img/gameCirclePic.png',
    '/../src/assets/img/FamilyCirclePic.png',
  ],
  actinfo: [
    { name: 'Looks', value: 23456 },
    { name: 'Likes', value: 1222 },
    { name: 'Coms', value: 789012 }
  ]
};
const static_post_3 = {
  pid: '1234455',
  time: '2024-12-30 12:34',
  content: '吃饭',
  img: [
    '/logo.svg',
    '/../src/assets/img/gameCirclePic.png',
    '/logo.svg',
    '/../src/assets/img/FamilyCirclePic.png',
    '/../src/assets/img/gameCirclePic.png',
    '/../src/assets/img/FamilyCirclePic.png',
  ],
  actinfo: [
    { name: 'Looks', value: 12345678 },
    { name: 'Likes', value: 7890123 },
    { name: 'Coms', value: 123456789999 }
  ]
};
const static_circle_card_info_daily = {
  cid: 'daily123',
  cname: '日常分享',
  description: '日常分享 | 苏州 | 交友 | 旅行 | 吃喝玩乐 | 拍照 | 逛街 | 买买买 | 美妆 | 美照 | 美食 | 美景 | 美女 | 美男 | 美好生活 | 美好时光 | 美好未来 | 美好回忆 | 美好心情',
  image: '/logo.svg',
  isJoined: false,
};

const static_circle_card_info_game = {
  cid: 'game123',
  cname: '游戏分享',
  description: '游戏分享 | 苏州',
  image: '/src/assets/img/gameCirclePic.png',
  isJoined: false,
};

const static_circle_posts = [
  { poster: static_poster, post: static_post_3 },
  { poster: static_poster_2, post: static_post },
  { poster: static_poster_2, post: static_post_2 },
  { poster: static_poster, post: static_post },
];

const static_circles = [
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_card_info_daily,
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_card_info_game,
  static_circle_card_info_daily,
  static_circle_card_info_daily,
  static_circle_card_info_game,
]

export {
  static_poster,
  static_post,
  static_empty_user,
  static_circle_card_info_daily,
  static_circle_card_info_game,
  static_circle_posts,
  static_circles,
};