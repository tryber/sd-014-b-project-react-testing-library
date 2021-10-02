import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Requisito 02', () => {
  test(
    'Se a página contém as informações sobre a Pokédex',
    () => {
      render(<About />);
      const title = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons');

      expect(title).toBeInTheDocument();
    },
  );

  test(
    'se a página contém um heading h2 com o texto About Pokédex',
    () => {
      render(<About />);
      const headTitle = screen.getByRole('heading', {
        level: 2,
        name: 'About Pokédex',
      });

      expect(headTitle).toBeInTheDocument();
    },
  );

  test(
    'se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      render(<About />);
      // Consultado o PR da Juliana Braga para entender como pegar os P
      const quantityParagraphs = screen.getAllByText(/Pokémons/);
      expect(quantityParagraphs.length).toBe(2);
    },
  );

  test(
    'se a página contém a seguinte imagem de uma Pokédex',
    () => {
      render(<About />);
      const picture = screen.getByRole('img');
      expect(picture).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/'
        + '8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    },
  );
});
