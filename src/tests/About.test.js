import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Se são renderizadas as informações sobre a Pokedex', () => {
  test('Se contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutHeading).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const aboutInfosOne = screen.getByText(/simulates/i);
    const aboutInfosTwo = screen.getByText(/filter/i);

    expect(aboutInfosOne).toBeInTheDocument();
    expect(aboutInfosTwo).toBeInTheDocument();
  });
});