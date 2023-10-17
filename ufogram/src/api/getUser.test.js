/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getUser from './getUser';

const mockAxios = new MockAdapter(axios);

const zairuiy = {
  username: 'zairuiy',
  password: '1234567',
  following: [
    {
      username: 'lionelhu',
      id: 2,
    },
  ],
  followers: [
    {
      username: 'lionelhu',
      id: 2,
    },
  ],
  id: 1,
};

describe('the api returned the correct data for all posts', () => {
  mockAxios.onGet('Users/1').reply(200, zairuiy);
});

test('the posts are correct', async () => {
  const response = await getUser(1);
  expect(response.data).toStrictEqual(zairuiy);
});
