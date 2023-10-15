/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Signup from './Signup';


test('renders username label', () => {
  render(
    <BrowserRouter>
        {/* <Routes>
            <Route path="./signup" />
        </Routes> */}
        <Signup />
    </BrowserRouter>
  );
  const linkElement = screen.getAllByLabelText(/Username/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders password label', () => {
  render(<Signup />);
  const linkElement = screen.getAllByLabelText(/Passowrd/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders signup button', () => {
  render(<Signup />);
  const linkElement = screen.getAllByLabelText(/Signup/i);
  expect(linkElement).toBeInTheDocument();
});

/**
 * Snapshot Testing
 */

test('the component matches the snapshot', () => {
  const component = renderer.create(<Signup />);
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
