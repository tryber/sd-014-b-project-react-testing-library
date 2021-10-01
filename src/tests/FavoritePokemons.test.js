import React from 'react';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente favoritePokemons', () => {
  test('Teste se sem favoritos aparece a mensagem No favorite pokemon found', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    const text = screen.getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido o card pokemon favoritado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    // procurou o botão de mais detalhes
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    // depois que abriu o botão verifica o checkbox
    const checkBox = screen.getByLabelText('Pokémon favoritado?');

    // cria um evento de click para clicar no checkbox
    userEvent.click(checkBox);
    // clica no link para página de favoritos
    const favPage = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favPage);
    // confere se na página existe um pokemon favoritado através do test-id
    const favCheckName = screen.getByTestId('pokemon-name');

    expect(favCheckName).toBeInTheDocument();
  });
});
