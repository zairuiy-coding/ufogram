/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Main from './Main';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3001/main",
      state: { userId: 1, username: 'lionelhu', users: [] }
    })
  }));


test('renders title', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <Main />
      </Router>
    );
    const linkElement = screen.getByText(/UFOgram/);
    expect(linkElement).toBeInTheDocument();
  });

test('renders my profile button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Main />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /My Profile/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders new post button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Main />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Create New Post/
  })
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
    <Main />
</Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
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
