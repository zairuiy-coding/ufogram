/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';
import { act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

beforeEach(() => {
    expect(router)
    });

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

  mockAxios.onGet('http://localhost:3000/Users').reply(200, users);
  mockAxios.onPost('http://localhost:3000/Users').reply(201, users);

    const mockedNavigate = jest.fn();

    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        // useNavigate: () => ({ navigate: mockedNavigate})
        useNavigate: () => mockedNavigate,
    }));

test('renders title', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Signup />} />
          </Routes> */}
          <Signup />
      </Router>
    );
    const linkElement = screen.getByText(/UFOgram/);
    expect(linkElement).toBeInTheDocument();
  });

test('renders username label', () => {
  render(
    <Router>
        {/* <Routes>
            <Route path="/signup" element={<Signup />} />
        </Routes> */}
        <Signup />
    </Router>
  );
  const linkElement = screen.getByText(/Username:/);
  expect(linkElement).toBeInTheDocument();
});

test('renders password label', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <Signup />
        </Router>
      );
      const linkElement = screen.getByText(/Password:/);
    expect(linkElement).toBeInTheDocument();
});

test('renders signup button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <Signup />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Signup/
  })
  expect(linkElement).toBeInTheDocument();
});

test('renders login button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes> */}
            <Signup />
        </Router>
      );
  const linkElement = screen.getByRole('button', {
    name: /Login/
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
    <Signup />
</Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Test the login button', async () => {
    act(() => {
        render(
            <MemoryRouter initialEntries={['/signup']}> {/* Set the initial route */}
              <Signup />
            </MemoryRouter>
          );
    })
    // render(
    //   <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
    //     <Login />
    //   </MemoryRouter>
    // );

    const loginButton = screen.getByText('Login');
    act(() => {fireEvent.click(loginButton)});

    // check if you have successfully navigated to the expected page
    // const newPageElement = screen.getByText('Login');

    // expect(newPageElement).toBeInTheDocument();
    // expect(navigate).toHaveBeenCalledWith('/signup');
    await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
});

test('Tests signup button', async () => {
    act(() => {
        render(
            <MemoryRouter initialEntries={['/signup']}> {/* Set the initial route */}
              <Signup />
            </MemoryRouter>
          );
    })
    // render(
    //   <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
    //     <Login />
    //   </MemoryRouter>
    // );

    const usernameBox = screen.getByRole('textbox')
    // const usernameBox = screen.getByDisplayValue('usernameBox');
  
    act(() => {
        userEvent.type(usernameBox, 'test11');
    })

    // const passwordBox = screen.getByRole('textbox')
    const passwordBox = screen.getByTestId('passwordBox');
  
    act(() => {
        userEvent.type(passwordBox, '1234567');
    })

    const signupButton = screen.getByText('Signup');
    act(() => {fireEvent.click(signupButton)});

    // check if you have successfully navigated to the expected page
    // const newPageElement = screen.getByText('Signup');

    // expect(newPageElement).toBeInTheDocument();
    await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('/login');
    });
    // expect(mockedNavigate).toHaveBeenCalledWith('/main');
    // await waitFor(() => expect(window.location.href).toContain('/main'));
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
