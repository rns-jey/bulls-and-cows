import { render, screen } from '@testing-library/react';
import App from './App';
import { isMatched } from './functions'

test('Check if 6 and 9 is equal', () => {
  expect(isMatched(6,9)).toBe(false)
});

test('Check if 8 and 8 is equal', () => {
  expect(isMatched(8,8)).toBe(true)
});
