import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const titleText = screen.getByRole(
      'heading', { level: 2, name: /Encountered pokémons/i },
    );
    expect(titleText).toBeInTheDocument();
  });
  it(`se é exibido o próximo Pokémon da lista
  quando o botão Próximo pokémon é clicado.`, () => {
    renderWithRouter(<App />);
    const buttonInThePage = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(buttonInThePage).toBeInTheDocument();
  });
});
