import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../../helper/renderWithRouter';
import About from '../components/About';

// Linha 34 retirada do stackoverflow.com...
// /questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src

describe('Testa o componente About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouter(<About />);

    const descriptionPart1 = 'This application simulates a Pokédex,';
    const descriptionPart2 = ' a digital encyclopedia containing all Pokémons';
    const pokedexInfo = screen.getByText(descriptionPart1 + descriptionPart2);
    expect(pokedexInfo).toBeInTheDocument();

    const funcionalityTextPart1 = 'One can filter Pokémons by type,';
    const funcionalityTextPart2 = ' and see more details for each one of them';
    const pokedexInfo2 = screen.getByText(funcionalityTextPart1 + funcionalityTextPart2);
    expect(pokedexInfo2).toBeInTheDocument();
  });

  test('', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
