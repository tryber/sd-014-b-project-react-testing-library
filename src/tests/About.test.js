import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

test('Se a pagina contem um heading h2 com o texto About "About Pokédex" ', () => {
  render(<About />);

  const title = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(title).toBeInTheDocument();
});
