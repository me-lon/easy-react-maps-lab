export const getNotices = (req, res) => {
  res.json([
    {
      id: '000000001',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
      title: 'You have received 14 new weekly reports',
      datetime: '2017-08-09',
      type: 'Notice',
    },
    {
      id: '000000006',
      avatar: '../public/cris.jpg',
      title: 'Cris commented on you',
      description: '#description',
      datetime: '2017-08-07',
      type: 'Message',
    },
    {
      id: '000000009',
      title: '#task name',
      description: 'The task needs to start before 2017-01-12 20:00',
      extra: 'has not started',
      status: 'todo',
      type: 'Upcoming',
    },
  ]);
};
export default {
  getNotices,
};
