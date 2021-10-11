import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './RenderWithRouter';

describe('Testa se a página tem informações sobre a Pokédex:', () => {
  test('se existe um H2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const h2Title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(h2Title).toBeInTheDocument();
  });

  test('se existem dois parágrafos com textos sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const par1 = screen.getByText(/This application/);
    const par2 = screen.getByText(/One can filter/);

    expect(par1).toBeInTheDocument();
    expect(par2).toBeInTheDocument();
  });

  test('se a página contém a imagem especificada da Pokédex', () => {
    renderWithRouter(<About />);

    const imageSrc = screen.getByAltText('Pokédex').src;

    expect(imageSrc).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
