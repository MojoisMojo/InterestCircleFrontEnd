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

export { static_poster, static_post, static_empty_user};