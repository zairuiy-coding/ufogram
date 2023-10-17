/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Activity from './Activity';
import getAllPosts from '../api/getAllPosts';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

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

describe('the api returned the correct data for all posts', () => {
    mockAxios.onGet('/Posts').reply(200, posts);
  });

test('renders like button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <Activity />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Like/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders likes label', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Signup />} />
          </Routes> */}
          <Activity />
      </Router>
    );
    const linkElement = screen.getByText(/Likes:/);
    expect(linkElement).toBeInTheDocument();
  });

/**
 *  Testing
 */

// test('welcome is displayed after click the registration button', async () => {
//   render(<Login />);
//   const buttonElement = screen.getByRole('button');
//   await userEvent.click(buttonElement);
//   const welcomeElement = screen.getAllByLabelText(/welcome/i);
//   expect(welcomeElement).toBeInTheDocument();
// });

// test('Username is displayed after clicking on registration button', async () => {
//   render(<Login />);
//   const usernameElement = screen.getByTestId('uname');
//   await userEvent.type(usernameElement, 'lili');
//   const buttonElement = screen.getByRole('button');
//   await userEvent.click(buttonElement);
//   const welcomeElement = screen.getAllByText(/lili/i);
//   expect(welcomeElement).toBeInTheDocument();
// });
