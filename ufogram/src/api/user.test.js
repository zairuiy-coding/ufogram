/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import getUsers from './user';

const mockAxios = new MockAdapter(axios);

const users = [
  {
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
  },
  {
    username: 'lionelhu',
    password: '1234567',
    following: [
      {
        username: 'zairuiy',
        id: 1,
      },
    ],
    followers: [
      {
        username: 'zairuiy',
        id: 1,
      },
    ],
    id: 2,
  },
];

describe('the api returned the correct data for all users', () => {
  mockAxios.onGet().reply(200, users);
});

test('the users are correct', async () => {
  const response = await getUsers();
  expect(response.data).toStrictEqual(users);
});
