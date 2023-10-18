/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import renderer from 'react-test-renderer';
import {
  BrowserRouter as Router, Routes, Route, MemoryRouter,
} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import Newpost from './Newpost';

const mockAxios = new MockAdapter(axios);
const users = [
  {
    username: 'zairuiy',
    password: '1234567',
    following: [
      {
        username: 'lionelhu',
        id: 2,
      },
    ],
    followers: [
      {
        username: 'lionelhu',
        id: 2,
      },
    ],
    id: 1,
  },
  {
    username: 'lionelhu',
    password: '1234567',
    following: [
      {
        username: 'zairuiy',
        id: 1,
      },
    ],
    followers: [
      {
        username: 'zairuiy',
        id: 1,
      },
    ],
    id: 2,
  },
];

mockAxios.onPost('http://localhost:3000/Posts').reply(201);

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3001/newpost',
    state: { userId: 2, username: 'lionelhu', users },
  }),
  useNavigate: () => mockedNavigate,
}));

test('renders title', () => {
  render(
    <Router>
      {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
      <Newpost />
    </Router>,
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
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Main/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders post button', () => {
  render(
    <Router>
      {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
      <Newpost />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Post/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders discard button', () => {
  render(
    <Router>
      {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
      <Newpost />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Discard/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders image/video label', () => {
  render(
    <Router>
      {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
      <Newpost />
    </Router>,
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
    </Router>,
  );
  const linkElement = screen.getByText(/Caption:/);
  expect(linkElement).toBeInTheDocument();
});

/**
 * Snapshot Testing
 */

test('the component matches the snapshot', () => {
  const component = renderer.create(
    <Router>
      {/* <Routes>
        <Route path="/signup" element={<Signup />} />
    </Routes> */}
      <Newpost />
    </Router>,
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Tests main button', async () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/newpost']}>
        {' '}
        {/* Set the initial route */}
        <Newpost />
      </MemoryRouter>,
    );
  });

  const loginButton = screen.getByText('Main');
  act(() => { fireEvent.click(loginButton); });

  // check if you have successfully navigated to the expected page
  // const newPageElement = screen.getByText('Signup');

  // expect(newPageElement).toBeInTheDocument();
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/main', { state: { userId: 2, username: 'lionelhu', users } });
  });
  // expect(mockedNavigate).toHaveBeenCalledWith('/main');
  // await waitFor(() => expect(window.location.href).toContain('/main'));
});

test('Tests discard button', async () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/newpost']}>
        {' '}
        {/* Set the initial route */}
        <Newpost />
      </MemoryRouter>,
    );
  });

  const loginButton = screen.getByText('Discard');
  act(() => { fireEvent.click(loginButton); });

  // check if you have successfully navigated to the expected page
  // const newPageElement = screen.getByText('Signup');

  // expect(newPageElement).toBeInTheDocument();
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/main', { state: { userId: 2, username: 'lionelhu', users } });
  });
  // expect(mockedNavigate).toHaveBeenCalledWith('/main');
  // await waitFor(() => expect(window.location.href).toContain('/main'));
});

test('Tests post button', async () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/newpost']}>
        {' '}
        {/* Set the initial route */}
        <Newpost />
      </MemoryRouter>,
    );
  });

  const fileLinkBox = screen.getByTestId('linkBox');
  // const usernameBox = screen.getByDisplayValue('usernameBox');

  act(() => {
    userEvent.type(fileLinkBox, 'https://picsum.photos/200/303');
  });

  // const passwordBox = screen.getByRole('textbox')
  const captionBox = screen.getByTestId('captionBox');

  act(() => {
    userEvent.type(captionBox, 'post10');
  });

  const postButton = screen.getByText('Post');
  act(() => { fireEvent.click(postButton); });

  // check if you have successfully navigated to the expected page
  // const newPageElement = screen.getByText('Signup');

  // expect(newPageElement).toBeInTheDocument();
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/main', { state: { userId: 2, username: 'lionelhu', users } });
  });
  // expect(mockedNavigate).toHaveBeenCalledWith('/main');
  // await waitFor(() => expect(window.location.href).toContain('/main'));
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
