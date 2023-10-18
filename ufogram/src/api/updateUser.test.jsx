/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import updateUser from './updateUser';

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

test('should successfully update a user', async () => {
  mockAxios.onPut('http://localhost:3000/users/1').reply(200);
  const response = await updateUser(1, zairuiy);
  expect(response.status).toStrictEqual(200);
});

// Mock a 404 error response

test('should handle errors and return an error object', async () => {
  mockAxios.onPut('http://localhost:3000/users/1').reply(404);
  try {
    await updateUser(1, zairuiy);
  } catch (error) {
    // Assert that the error status is 404
    expect(error.response.status).toEqual(404);
  }
});

// test('should handle errors and return an error object', async () => {
//     mockAxios.onPost('http://localhost:3000/Users').reply(409);
//   const response = await register('test101', '1234567');
//   expect(response).toStrictEqual(409);
// });
