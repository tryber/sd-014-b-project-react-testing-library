import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testing if <About /> is rendering the correct information', () => {
  it('should have a h2 text containing About Pokedex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('should have 2 <p> with Pokédex info', () => {
    renderWithRouter(<About />);

    expect(screen.getByText(/This/i)).toBeInTheDocument();
    expect(screen.getByText(/One/i)).toBeInTheDocument();
  });

  it('should have the following image in Pokédex', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
