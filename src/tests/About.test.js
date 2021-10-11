import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('Se a página contém as informações sobre a Pokédex.', () => {
  render(<About />);

  const h2 = screen.getByRole('heading', { level: 2 });

  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent('About Pokédex');

  const p1 = screen.getByText('This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons');
  const p2 = screen.getByText('This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons');

  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();

  const img = screen.getByRole('img');
  expect(img).toHaveAttribute(
    'src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
      + '800px-Gen_I_Pok%C3%A9dex.png',
  );
});

// https://testing-library.com/docs/queries/byrole/
