import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './services/renderWithRouter';

describe('Testa o componente <About.js />', () => {
  it('Deveria conter o título "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });

    expect(aboutHeading).toBeInTheDocument();
  });

  it('Deveria conter uma imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImg = screen.getByAltText('Pokédex');

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
