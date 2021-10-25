import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

// test('Verifica se existem 3 links de navegacao', () => {
//   const customHistory = createMemoryHistory();
//   render(
//     <Router history={customHistory}>
//       <App />
//     </Router>
//   );

//   const links = screen.getAllByRole('link');

//   expect(links).toHaveLength(4);
//   expect(links[0]).toHaveValue('Home');
//   expect(links[1]).toHaveValue('About');
//   expect(links[2]).toHaveValue('Favorite Pokémons');
// });

test('Verifica rota para a pagina inicial ao clicar no Home', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const linkHome = screen.getByRole('link', { name: 'Home' });

  userEvent.click(linkHome);

  expect(customHistory.location.pathname).toBe('/');
});

test('Verifica rota ao clicar no About', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const linkAbout = screen.getByRole('link', { name: 'About' });

  userEvent.click(linkAbout);

  expect(customHistory.location.pathname).toBe('/about');
});

test('Verifica rota ao clicar no Favorite Pokemons', () => {
  const customHistory = createMemoryHistory();
  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

  userEvent.click(linkFavorite);

  expect(customHistory.location.pathname).toBe('/favorites');
});
