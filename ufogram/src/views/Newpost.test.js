/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Newpost from './Newpost';

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3001/newpost",
      state: { userId: 1, username: 'lionelhu', users: [] }
    })
  }));


test('renders title', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <Newpost />
      </Router>
    );
    const linkElement = screen.getByText(/New Post/);
    expect(linkElement).toBeInTheDocument();
  });

test('renders main button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Newpost />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Main/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders post button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Newpost />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Post/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders discard button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Newpost />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Discard/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders image/video label', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <Newpost />
      </Router>
    );
    const linkElement = screen.getByText(/Image\/Video:/);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders caption label', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <Newpost />
      </Router>
    );
    const linkElement = screen.getByText(/Caption:/);
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
    <Newpost />
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
