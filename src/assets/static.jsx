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
const static_post = {
  pid: '123',
  time: '2021-09-01',
  content: 'This is a post content',
  img: ['/logo.svg', '/../src/assets/img/FamilyCirclePic.png', '../src/assets/img/gameCirclePic.png'],
  actinfo: [
    { name: 'Likes', value: 30 },
    { name: 'Stars', value: 20 },
    { name: 'Marks', value: 10 }
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
  { poster: static_poster, post: static_post },
  { poster: static_poster, post: static_post },
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