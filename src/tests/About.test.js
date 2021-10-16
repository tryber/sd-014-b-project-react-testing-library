import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2 - Teste o componente About ', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const title = screen.getByRole('heading',
      { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const textPodédexInfo = screen.getAllByText(/Pokémons/);
    expect(textPodédexInfo).toHaveLength(2);
  });

  test('se a página contém a seguinte imagem de uma Pokédex `https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.`', () => {
    renderWithRouter(<About />);

    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img.src).toBe(src);
  });
});
