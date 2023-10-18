/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getAllPosts from './getAllPosts';

const mockAxios = new MockAdapter(axios);

const posts = [
  {
    caption: 'Hello World!',
    fileURL: 'https://picsum.photos/200/301',
    likes: 0,
    author: {
      id: 1,
      username: 'zairuiy',
    },
    id: 1,
  },
  {
    caption: '123',
    fileURL: 'https://picsum.photos/200/303',
    likes: 0,
    author: {
      id: 1,
      username: 'zairuiy',
    },
    id: 2,
  },
];

// describe('the api returned the correct data for all posts', () => {
//   mockAxios.onGet().reply(200, posts);
// });

test('the posts are correct', async () => {
  mockAxios.onGet().reply(200, posts);
  const response = await getAllPosts();
  expect(response.data).toStrictEqual(posts);
});

test('the posts are incorrect', async () => {
  mockAxios.onGet().reply(404);
  const response = await getAllPosts();
  expect(response).toStrictEqual(404);
});
