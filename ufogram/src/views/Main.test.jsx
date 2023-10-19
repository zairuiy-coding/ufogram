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
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import Main from './Main';

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

mockAxios.onGet('http://localhost:3000/Posts').reply(200, posts);

const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'localhost:3001/main',
    state: { userId: 2, username: 'lionelhu', users },
  }),
  useNavigate: () => mockedNavigate,

}));

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     // useNavigate: () => ({ navigate: mockedNavigate})
//     useNavigate: () => mockedNavigate,
// }));

test('renders title', () => {
  render(
    <Router>
      {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
      <Main />
    </Router>,
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
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /My Profile/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders new post button', () => {
  render(
    <Router>
      {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
      <Main />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Create New Post/,
  });
  expect(linkElement).toBeInTheDocument();
});

test('renders search button', () => {
  render(
    <Router>
      {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
      <Main />
    </Router>,
  );
  const linkElement = screen.getByRole('button', {
    name: /Search/,
  });
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

// test navigating to Signup page when clicking the "Sign Up" button
test('Tests My Profile button', async () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        {' '}
        {/* Set the initial route */}
        <Main />
      </MemoryRouter>,
    );
  });
  // render(
  //   <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
  //     <Login />
  //   </MemoryRouter>
  // );

  const myProfileButton = screen.getByText('My Profile');
  act(() => { fireEvent.click(myProfileButton); });

  // check if you have successfully navigated to the expected page
  // const newPageElement = screen.getByText('Signup');

  // expect(newPageElement).toBeInTheDocument();
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/userprofile', {
      state: {
        userId: 2, username: 'lionelhu', self: true, sName: 'lionelhu', sId: 2, users, followed: true,
      },
    });
  });
  // await waitFor(() => expect(window.location.href).toContain('/signup'));
});

test('Tests new post button', async () => {
  act(() => {
    render(
      <MemoryRouter initialEntries={['/main']}>
        {' '}
        {/* Set the initial route */}
        <Main />
      </MemoryRouter>,
    );
  });
  // render(
  //   <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
  //     <Login />
  //   </MemoryRouter>
  // );

  const newPostButton = screen.getByRole('button', {
    name: 'Create New Post',
  });
  act(() => { fireEvent.click(newPostButton); });

  // check if you have successfully navigated to the expected page
  // const newPageElement = screen.getByText('Signup');

  // expect(newPageElement).toBeInTheDocument();
  await waitFor(() => {
    expect(mockedNavigate).toHaveBeenCalledWith('/newpost', { state: { userId: 2, username: 'lionelhu', users } });
  });
  // await waitFor(() => expect(window.location.href).toContain('/signup'));
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
