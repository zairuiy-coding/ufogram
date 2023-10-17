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
      username: 'lionelhu4',
      id: 7,
    },
    {
      username: 'lionelhu5',
      id: 8,
    },
  ],
  followers: [
    {
      username: 'lionelhu4',
      id: 7,
    },
    {
      username: 'lionelhu5',
      id: 8,
    },
  ],
  id: 1,
};

describe('the api returned the correct data for the given user', () => {

  //   mockAxios.onGet('/Users/1').reply(200, zairuiy);
  mockAxios.onGet('http://localhost:3000/Users/1').reply(200, zairuiy);
});

test('the user is correct', async () => {
  const response = await getUser(1);
  expect(response.data).toStrictEqual(zairuiy);
});
