/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createNewPost from './createNewPost';

const mockAxios = new MockAdapter(axios);

describe('the api returned the correct data for all posts', () => {
  mockAxios.onPost('Posts').reply(201);
});

test('the posts are correct', async () => {
  const response = await createNewPost('test2', 'https://picsum.photos/200/305', {
    id: 1,
    username: 'zairuiy',
  });
  expect(response.status).toStrictEqual(201);
});
