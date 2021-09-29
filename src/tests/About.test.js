import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('about.js tests set', () => {
  it('should the page contains the Pokédex info', () => {
    // Teste se a página contém as informações sobre a Pokédex.
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const textPokedexInfo1 = screen
      .getByText(/a digital encyclopedia containing all Pokémons/i);
    const textPokedexInfo2 = screen.getByText(/One can filter Pokémons by type, and/i);
    const textTitleAbout = screen.getByRole('heading', {
      level: 2, name: /about Pokédex/i });
    const imgAbout = screen.getByRole('img');

    expect(textPokedexInfo1).toBeInTheDocument();
    expect(textPokedexInfo2).toBeInTheDocument();
    expect(textTitleAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
