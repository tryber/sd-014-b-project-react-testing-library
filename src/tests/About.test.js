import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('2. Testes do About.js', () => {
  it('Testa se a página contém info sobre a Pokédex', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex' });

    expect(aboutPokedex).toBeInTheDocument();

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();

    const imgPokedex = screen.getByAltText('Pokédex');
    expect(imgPokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
