import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testando componente About.js', () => {
  test('se a pagina contem h2 com o texto "About Pokédex', () => {
    renderWithRouter(<About />);
    const tituloAbout = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(tituloAbout).toBeInTheDocument();
  });

  test('se a pagina contem 2 paragrafos', () => {
    renderWithRouter(<About />);

    const paragrafoAboutUm = screen.getByText(/This application simulates a Pokédex/);
    const paragrafoAboutDois = screen.getByText(/One can filter Pokémons by type/);

    expect(paragrafoAboutUm).toBeInTheDocument();
    expect(paragrafoAboutDois).toBeInTheDocument();
  });

  test('se a pagina contem a imagem', () => {
    renderWithRouter(<About />);
    const imagemAbout = screen.getByRole('img');
    expect(imagemAbout).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
