// npx stryker run ./stryker/About.conf.json
import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('teste do componente About', () => {
  it('deve conter h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.getByRole('heading');
    expect(h2.textContent).toBe('About Pokédex');
  });

  it('deve conter dois parágrafos com texto sobre Pokédex', () => {
    render(<About />);
    const paragraph0 = screen.getByText(/application simulates a Pokédex/);
    const paragraph1 = screen.getByText(/filter Pokémons by type/);
    expect(paragraph0).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
  });

  it('deve conter imagem da pokédex com sua devida source', () => {
    render(<About />);
    const img = screen.getByAltText('Pokédex');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img).toHaveAttribute('src', src);
  });
});
