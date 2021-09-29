import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testa componente `About`', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexFirstParagraph = screen.getByText(
      (content) => content.startsWith('This application'),
    );

    const pokedexSecondParagraph = screen.getByText(
      (content) => content.startsWith('One can filter'),
    );
    expect(pokedexFirstParagraph).toBeInTheDocument();
    expect(pokedexSecondParagraph).toBeInTheDocument();
  });
});
