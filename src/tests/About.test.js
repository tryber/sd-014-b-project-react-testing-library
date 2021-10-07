import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('tests da pagina about', () => {
  test('se renderiza um h2', () => {
    render(<About />);
    const AboutPKD = screen.getByRole('heading', { level: 2 });
    expect(AboutPKD).toHaveTextContent('About Pokédex');
  });

  test('se renderiza as informações da pokedex', () => {
    render(<About />);
    const descriptions = [ // ideia do amigo Fernando Sepra turma 14 B
      'This application simulates a Pokédex,'
        + ' a digital encyclopedia containing all Pokémons',
      'One can filter Pokémons by type,'
        + ' and see more details for each one of them',
    ];

    const texto1 = screen.getByText(descriptions[0]);
    const texto2 = screen.getByText(descriptions[1]);

    expect(texto1).toBeInTheDocument();
    expect(texto2).toBeInTheDocument();
  });

  test('se contem a imgem da pokedex', () => {
    render(<About />);
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const srcText = screen.getByRole('img', { name: 'Pokédex' });
    expect(srcText.src).toBe(src);
  });

  test('se exibe as informações da pokedex', () => {
    render(<About />);
    const info = [ // ideia do amigo Fernando Sepra turma 14 B
      'This application simulates a Pokédex,'
        + ' a digital encyclopedia containing all Pokémons',
      'One can filter Pokémons by type,'
        + ' and see more details for each one of them',
    ];

    const texto1 = screen.getByText(info[0]);
    const texto2 = screen.getByText(info[1]);

    expect(texto1).toBeInTheDocument();
    expect(texto2).toBeInTheDocument();
  });
});
