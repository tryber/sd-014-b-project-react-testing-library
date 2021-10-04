import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components';

describe('Tests the About.js application', () => {
  test('page has the informations about the Pokédex', () => {
    render(<About />);
    const info = screen.getByText(/This application simulates/);
    expect(info).toBeInTheDocument();
  });
  test('page has a level 2 heading with the text `About Pokédex`', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  test('page has 2 paragraphes with text about the Pokédex', () => {
    render(<About />);
    const paragraphes = screen.getAllByText(/Pokémons/);
    const EXPECTED_LENGTH = 2;
    expect(paragraphes).toHaveLength(EXPECTED_LENGTH);
  });
  test('page has Pokédex image', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
