/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
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
            <Post username='lionelhu' imageUrl='https://picsum.photos/200/302' caption='Haha'/>
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Like/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders username label', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Signup />} />
          </Routes> */}
          <Post username='lionelhu' imageUrl='https://picsum.photos/200/302' caption='Haha'/>
      </Router>
    );
    const linkElement = screen.getByText(/Likes:/);
    expect(linkElement).toBeInTheDocument();
  });

/**
 * Snapshot Testing
 */

test('the component matches the snapshot', () => {
  const component = renderer.create(<Router>
    {/* <Routes>
        <Route path="/signup" element={<Signup />} />
    </Routes> */}
    <Post username='lionelhu' imageUrl='https://picsum.photos/200/302' caption='Haha'/>
</Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 *  Testing
 */

// test('welcome is displayed after click the registration button', async () => {
//   render(<Signup />);
//   const buttonElement = screen.getByRole('button');
//   await userEvent.click(buttonElement);
//   const welcomeElement = screen.getAllByLabelText(/welcome/i);
//   expect(welcomeElement).toBeInTheDocument();
// });

// test('Username is displayed after clicking on registration button', async () => {
//   render(<Signup />);
//   const usernameElement = screen.getByTestId('uname');
//   await userEvent.type(usernameElement, 'lili');
//   const buttonElement = screen.getByRole('button');
//   await userEvent.click(buttonElement);
//   const welcomeElement = screen.getAllByText(/lili/i);
//   expect(welcomeElement).toBeInTheDocument();
// });
