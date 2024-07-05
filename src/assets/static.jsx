const static_empty_user = {
  uid: '',
  name: '',
  email: '',
  avatarUrl: '/logo.svg',
};

const static_poster = {
  uid: '123',
  name: 'Mojo',
  email: 'mojo@example.com',
  avatarUrl: '/logo.svg',
};
const static_post = {
  pid: '123',
  time: '2021-09-01',
  content: 'This is a post content',
  img: ['/logo.svg', '/logo.svg', '/logo.svg'],
  actinfo: {
    watches: 10,
    stars: 20,
    likes: 30
  }
};

const static_circle_card_info = {
  cid:'123',
  cname:'日常分享',
  description:'日常分享 | 苏州',
  image:'/logo.svg',
  isJoined: false,
};

const static_circle_posts = [
  {poster:static_poster, post:static_post},
  {poster:static_poster, post:static_post},
  {poster:static_poster, post:static_post},
];

export { static_poster, static_post, static_empty_user, static_circle_card_info, static_circle_posts  };