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
});
