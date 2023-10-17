/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';
import { act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


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

test('Renders signup component and navigates to login page after login', () => {
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
    const newPageElement = screen.getByText('Login');

    expect(newPageElement).toBeInTheDocument();
    // expect(navigate).toHaveBeenCalledWith('/signup');
})

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
