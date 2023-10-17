/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import UserProfile from './UserProfile';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3001/userprofile",
      state: { userId: 2, username: 'lionelhu', self: false, sName: 'zairuiy', sId: 1, users: [], followed: false }
    })
  }));


test('renders title', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <UserProfile />
      </Router>
    );
    const linkElement = screen.getByText(/Profile/);
    expect(linkElement).toBeInTheDocument();
  });

test('renders main button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Main/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders follow button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Follow/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders my info text', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
      const linkElement = screen.getByText(/My info/);
      expect(linkElement).toBeInTheDocument();
  });

  test('renders name', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
      const linkElement = screen.getByText(/zairuiy/);
      expect(linkElement).toBeInTheDocument();
  });

test('renders followers label', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
      const linkElement = screen.getByText(/Followers/);
    expect(linkElement).toBeInTheDocument();
});

test('renders following label', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <UserProfile />
        </Router>
      );
      const linkElement = screen.getByText(/Following/);
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
    <UserProfile />
</Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

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
