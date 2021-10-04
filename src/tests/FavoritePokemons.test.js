import React from 'react';
import { screen } from '@testing-library/react';
import myPersonalRender from './renderWithRouter';
import App from '../App';

describe('Exibe em pokemons favoritos', () => {
  it('uma mensagem "No favorite pokemon found" quando não ha favoritados', () => {
    const { historico } = myPersonalRender(<App />);

    historico.push('/favorites');
    const notFav = screen.getByText(/No favorite pokemon found/);

    expect(notFav).toBeDefined();
  });

  // linhas: 11, 13, feitas com base no codgo de Mariana ferreira https://github.com/tryber/sd-014-b-project-react-testing-library/commit/2866db7c7e5131fd39d28648d7465c063d0484a6
});
