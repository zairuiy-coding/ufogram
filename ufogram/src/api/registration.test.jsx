/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import register from './registration';

const mockAxios = new MockAdapter(axios);

test('should successfully create a new post', async () => {
  mockAxios.onPost('http://localhost:3000/Users').reply(201);
  const response = await register('test101', '1234567');
  expect(response).toStrictEqual(201);
});

// Mock a 404 error response

test('should handle errors and return an error object', async () => {
  mockAxios.onPost('http://localhost:3000/Users').reply(404);
  try {
    await register('test101', '1234567');
  } catch (error) {
    // Assert that the error status is 404
    expect(error.response.status).toEqual(404);
  }
});

test('should handle errors and return an error object', async () => {
  mockAxios.onPost('http://localhost:3000/Users').reply(404);
  try {
    await register('', '');
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
