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

// const posts = [
//   {
//     caption: 'Hello World!',
//     fileURL: 'https://picsum.photos/200/301',
//     likes: 0,
//     author: {
//       id: 1,
//       username: 'zairuiy',
//     },
//     id: 1,
//   },
//   {
//     caption: '123',
//     fileURL: 'https://picsum.photos/200/303',
//     likes: 0,
//     author: {
//       id: 1,
//       username: 'zairuiy',
//     },
//     id: 2,
//   },
// ];

test('renders no posts text', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Signup />} />
          </Routes> */}
          <Activity />
      </Router>
    );
    const linkElement = screen.getByText(/No posts/);
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
