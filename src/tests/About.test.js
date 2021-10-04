import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('test component About', () => {
  test('if the page contains a h2 with the text "About Pokédex"', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(title).toBeInTheDocument();
  });
  test('if the page contains 2 paragraphs with text about Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates/i);
    const secondParagraph = screen.getByText(/One can filter/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('if the page contains an image of a Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image)
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
    expect(image).toBeInTheDocument();
  });
});
