import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

it('Verifica se os links contem o texto esperado', () => {
  renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('About');
  expect(links[2]).toHaveTextContent('Favorite Pokémons');
});

test('Se os links estão funcionando corretamente', () => {
  const { history } = renderWithRouter(<App />);
  const links = screen.getAllByRole('link');
  userEvent.click(links[0]);
  expect(history.location.pathname).toBe('/');
  userEvent.click(links[1]);
  expect(history.location.pathname).toBe('/about');
  userEvent.click(links[2]);
  expect(history.location.pathname).toBe('/favorites');
});
