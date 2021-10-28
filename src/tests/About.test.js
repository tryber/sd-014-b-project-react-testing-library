import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Req2: Testing Component <About />', () => {
  test('if <About /> renders one <h2/>', () => {
    renderWithRouter(<About />);

    const subheading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(subheading).toBeInTheDocument();
  });

  test('if <About /> renders two <p/>', () => {
    renderWithRouter(<About />);

    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('if <About /> renders an <img/> of a pokedex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');

    const imgURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(pokedexImg).toHaveProperty('src', imgURL);
  });
});
