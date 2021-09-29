import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js />', () => {
  test('Se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();

    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
