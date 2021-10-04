import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 2', () => {
  test('Verifica se renderiza o titulo da página About', () => {
    render(<About />);
    const AboutTitle = screen.getByRole('heading', { level: 2, name: /About Pokédex/ });
    expect(AboutTitle).toBeInTheDocument();
  });
  test('Verifica se possui os paragrafos de descrições da pokedex ', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex,/i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  test('Verifica se tem a imagem', () => {
    render(<About />);
    const figure = screen.getByRole('img');
    expect(figure.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
