import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../components/renderWithRouter';

describe('testanto se o About esta funcionando corretamente', () => {
  it('Testa se a página contém as informações sobre a Pokédex', () => {
    // https://academind.com/tutorials/testing-react-apps - só uma parte do texto
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(/One can filter Pokémons by type/);

    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    // https://testing-library.com/docs/queries/byalttext/ - como pegar uma imagem
    const altImage = screen.getByAltText('Crying emoji');

    expect(altImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
