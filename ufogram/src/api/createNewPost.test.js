/**
 * @jest-environment jsdom
 */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createNewPost from './createNewPost';

const mockAxios = new MockAdapter(axios);

describe('the api returned the correct data for all posts', () => {
  mockAxios.onPost('http://localhost:3000/Posts').reply(201);
});

/// sample data for reateNewPost(caption, fileURL, author)
const caption = 'caption';
const fileURL = 'https://picsum.photos/200/308';
const author = {
  id: 1,
  username: 'zairuiy',
};

test('should successfully create a new post', async () => {
  const response = await createNewPost(caption, fileURL, author);
  expect(response).toStrictEqual(201);
});

// Mock a 404 error response
mockAxios.onPost('http://localhost:3000/Posts').reply(404);

test('should handle errors and return an error object', async () => {
  const response = await createNewPost(caption, fileURL, author);
  expect(response).toStrictEqual(201);

  try {
    await createNewPost(caption, fileURL, author);
  } catch (error) {
    // Assert that the error status is 404
    expect(error.response.status).toEqual(404);
  }
});
