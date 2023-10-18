/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, act, waitFor,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Post from './Post';

test('renders like button', () => {
  render(
    <Router>
      {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
      <Post username="lionelhu" imageUrl="https://picsum.photos/200/302" caption="Haha" />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Like/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders likes label', () => {
  render(
    <Router>
      {/* <Routes>
              <Route path="/signup" element={<Signup />} />
          </Routes> */}
      <Post username="lionelhu" imageUrl="https://picsum.photos/200/302" caption="Haha" />
    </Router>,
  );
  const linkElement = screen.getByText(/Likes:/);
  expect(linkElement).toBeInTheDocument();
});

/**
 * Snapshot Testing
 */

test('the component matches the snapshot', () => {
  const component = renderer.create(<Router>
    <Post username="lionelhu" imageUrl="https://picsum.photos/200/302" caption="Haha" />
  </Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 *  Testing
 */

// test('like button testing', async () => {
//   act(() => {
//     render(
//       <Router>
//         <Post username="lionelhu" imageUrl="https://picsum.photos/200/302" caption="Haha" />
//       </Router>,
//     );
//   });

//   // Find the "Like" button by its text
//   const likeButton = screen.getByRole('button', {
//     name: /Like/,
//   });

//   // Check if the "Like" button is in the document
//   expect(likeButton).toBeInTheDocument();

//   // Click the "Like" button
//   act(() => {
//     userEvent.click(likeButton);
//   });

//   // After clicking, check if the "Unlike" button is in the document
//   const unlikeButton = await screen.findByText(/Unlike/);

//   expect(unlikeButton).toBeInTheDocument();

//   // Click the "Unlike" button
//   act(() => {
//     userEvent.click(unlikeButton);
//   });

//   // After clicking, check if the "Like" button is back in the document
//   const likeButtonAgain = await screen.findByRole('button', {
//     name: /Like/,
//   });

//   expect(likeButtonAgain).toBeInTheDocument();
// });
