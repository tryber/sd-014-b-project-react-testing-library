import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });
});
