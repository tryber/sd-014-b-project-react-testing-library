import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('2 - Teste se a página contém as informações sobre a Pokédex', () => {
  it('se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const title = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const firstParagraph = screen.getByText('This application simulates',
      { exact: false });
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText('One can filter Pokémons',
      { exact: false });
    expect(secondParagraph).toBeInTheDocument();
  });

  it('se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
