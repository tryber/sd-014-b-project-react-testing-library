import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/RenderRouter';
import { About } from '../components';

describe('O componente \'About\' sobre a pokédex:', () => {
  test('renderiza na tela mostrando um título e 2 parágrafos explicativos', () => {
    renderWithRouter(<About />);

    const headingTitle = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(headingTitle).toBeInTheDocument();

    const firstParagraph = screen.getByText(/This application simulates a Pokédex,/);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type, /);
    expect(secondParagraph).toBeInTheDocument();

    const pokedexImage = screen.getByAltText('Pokédex');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
