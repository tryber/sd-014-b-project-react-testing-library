import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';
import App from '../App';

describe('Testa componente `About`', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(aboutLink);

    expect(aboutLink).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('se a página contém um heading `h2` com o texto `About Pokédex`.', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexFirstParagraph = screen.getByText(
      (content) => content.startsWith('This application'),
    );

    const pokedexSecondParagraph = screen.getByText(
      (content) => content.startsWith('One can filter'),
    );
    expect(pokedexFirstParagraph).toBeInTheDocument();
    expect(pokedexSecondParagraph).toBeInTheDocument();
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pokedexImage = screen.getByRole('img');

    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');

    expect(pokedexImage).toBeInTheDocument();
  });

});
