import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('se a página contém as informações sobre a Pokédex', () => {
  it('deveria exibir um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const titleText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titleText).toBeInTheDocument();
  });
  // it('deveria exibir dois parágrafos com texto sobre a Pokédex', () => { });
  // it('deveria exibir a seguinte imagem de uma Pokédex', () => { });
});
