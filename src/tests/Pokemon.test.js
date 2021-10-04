// npx stryker run ./stryker/Pokemon.conf.json

import { screen, fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testes nos dados do card do pokemon', () => {
  test('nome do pokemon', () => {
    renderWithRouter(<App />);
    const Names = screen.getByTestId('pokemon-name');
    expect(Names.textContent).toBe('Pikachu');
  });

  test('tipo do pokemon', () => {
    renderWithRouter(<App />);
    const type = screen.getByTestId('pokemon-type');
    expect(type.textContent).toBe('Electric');
  });

  test('peso do pokemon', () => {
    renderWithRouter(<App />);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/6.0 kg/);
  });

  test('imagem do pokemon', () => {
    renderWithRouter(<App />);
    const image = screen.getByAltText(/Pikachu sprite/);
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  describe('teste no ´More details´ do card pokemon', () => {
    test('clicar no link ´More details´ vai para página: /pokemons/:id', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByText('More details');
      fireEvent.click(link);
      const pathName = history.location.pathname;
      expect(pathName).toBe('/pokemons/25');
    });
  });

  test('test se há icone estrela em pokemon favoritado', () => {
    renderWithRouter(<App />);
    const link = screen.getByText('More details');
    fireEvent.click(link);

    const checkAsFavorite = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(checkAsFavorite);

    const yellowStar = screen.getByAltText(/marked as favorite/);
    expect(yellowStar).toBeInTheDocument();
    expect(yellowStar).toHaveAttribute(
      'src',
      '/star-icon.svg',
    );
  });
});
