import React from 'react';
import { render, screen } from "@testing-library/react";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import userEvent from '@testing-library/user-event';

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

test('Verifica se a aplicacao eh redirecionada para a pagina inicial ao clicar no Home', () => {
  const customHistory = createMemoryHistory();
  render
  (
    <Router history={customHistory}>
      <App />
    </Router>
  );

  const linkHome = screen.getByRole('link', { name: 'Home' });

  userEvent.click(linkHome);


  expect(customHistory.location.pathname).toBe('/');

})

test('Verifica se a aplicacao eh redirecionada para a pagina inicial ao clicar no Home', () => {
  const customHistory = createMemoryHistory();
  render
  (
    <Router history={customHistory}>
      <App />
    </Router>
  );

  const linkAbout = screen.getByRole('link', { name: 'About' });

  userEvent.click(linkAbout);


  expect(customHistory.location.pathname).toBe('/about');

})

test('Verifica se a aplicacao eh redirecionada para a pagina inicial ao clicar no Home', () => {
  const customHistory = createMemoryHistory();
  render
  (
    <Router history={customHistory}>
      <App />
    </Router>
  );

  const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });

  userEvent.click(linkFavorite);


  expect(customHistory.location.pathname).toBe('/favorites');

})
