import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste do componente About.', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const pokedexAbout = screen.getByText(/About Pokédex/i);
    expect(pokedexAbout).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const pokedexHeading = screen.getByRole('heading', { level: 1, name: 'Pokédex' });
    expect(pokedexHeading).toHaveTextContent(/Pokédex/i);
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const pokedexParagraph1 = screen.getByText(/This application simulates a/i);
    const pokedexParagraph2 = screen.getByText(/One can filter Pokémons by/i);
    expect(pokedexParagraph1).toBeInTheDocument();
    expect(pokedexParagraph2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
