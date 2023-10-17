/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { useNavigate } from 'react-router-dom';

const mockAxios = new MockAdapter(axios);

// jest.mock('react-router-dom', () => {
//     useNavigate: () => ({ nvigate: jest.fn()})
// })

test('renders title', () => {
    render(
      <Router>
          {/* <Routes>
              <Route path="/signup" element={<Login />} />
          </Routes> */}
          <Login />
      </Router>
    );
    const linkElement = screen.getByText(/UFOgram/);
    expect(linkElement).toBeInTheDocument();
  });

test('renders username label', () => {
  render(
    <Router>
        {/* <Routes>
            <Route path="/signup" element={<Login />} />
        </Routes> */}
        <Login />
    </Router>
  );
  const linkElement = screen.getByText(/Username:/);
  expect(linkElement).toBeInTheDocument();
});

test('renders password label', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Login />
        </Router>
      );
      const linkElement = screen.getByText(/Password:/);
    expect(linkElement).toBeInTheDocument();
});

test('renders signup button', () => {
    render(
        <Router>
            {/* <Routes>
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Login />
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
                <Route path="/signup" element={<Login />} />
            </Routes> */}
            <Login />
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
    <Login />
</Router>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('When user enters a username it is displayed', async () => {
    render(
        <Router>
            <Login />
        </Router>
      );
    // create a reference to the textbox
    const element = screen.getByRole('textbox')
  
    // type some text (douala) into the textbox
    act(() => {
        userEvent.type(element, 'zairuiy');
    })
    // fire a click on the Ok button
    // await user.click(screen.getByRole('button', {name: /OK/i}))
    // assertion: verify that the text is in the textbox
    expect(element).toHaveValue('zairuiy')
  });

/**
 *  Testing button click
 */

// test navigating to Signup page when clicking the "Sign Up" button
test('Renders Login component and navigates to Sign up page after login', () => {
    act(() => {
        render(
            <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
              <Login />
            </MemoryRouter>
          );
    })
    // render(
    //   <MemoryRouter initialEntries={['/login']}> {/* Set the initial route */}
    //     <Login />
    //   </MemoryRouter>
    // );

    const signupButton = screen.getByText('Signup');
    act(() => {fireEvent.click(signupButton)});

    // check if you have successfully navigated to the expected page
    const newPageElement = screen.getByText('Signup');

    expect(newPageElement).toBeInTheDocument();
    // expect(navigate).toHaveBeenCalledWith('/signup');
})

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
