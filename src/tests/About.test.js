import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente About', () => {
  test('Testa se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<App />);

    const pathname = screen.getByRole('link', { name: 'About' });

    fireEvent.click(pathname);

    const title = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });

    expect(title).toBeInTheDocument();
  });

  test('Testa se tem dois paragrafos e os seus conteúdos', () => {
    renderWithRouter(<App />);

    const pathname = screen.getByRole('link', { name: 'About' });

    fireEvent.click(pathname);

    const paragrafo1 = screen.getByText(/This application simulates a Pokédex/i);

    const paragrafo2 = screen.getByText(/One can filter Pokémons by type/i);
    // console.log(Object.keys(paragrafos[0]));
    // console.log(paragrafos[0])
    // expect(paragrafos).toBe(2)
    expect(paragrafo1).toBeInTheDocument();
    expect(paragrafo2).toBeInTheDocument();
  });

  test('Testa a imagem', () => {
    renderWithRouter(<App />);

    const pathname = screen.getByRole('link', { name: 'About' });

    fireEvent.click(pathname);

    const imagemPokdex = screen.getByRole('img');
    // console.log(imagemPokdex);

    expect(imagemPokdex).toBeInTheDocument();
    expect(imagemPokdex).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
