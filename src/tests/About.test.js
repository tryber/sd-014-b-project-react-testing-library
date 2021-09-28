import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o navBar funciona devidamente', () => {
  test('Verifica as informações e o Título da página', () => {
    renderWithRouter(<App />);

    // Redireciona para a página About
    const getAbout = screen.getByText(/about/i);
    fireEvent.click(getAbout);

    // Faz os Testes
    const getInfo = screen.getAllByText(/pokédex/i);
    const getHeading = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/,
    });
    const getText = screen.getAllByText(/pokémon/i);

    expect(getInfo.length).toBeGreaterThan(2);
    expect(getHeading).toBeInTheDocument();
    expect(getText.length).toBeGreaterThan(2);
  });

  test('Verifica o URL da imagem', () => {
    const { history } = renderWithRouter(<App />);

    // Redireciona para a página About
    history.push('/about');

    // Faz os Testes
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const getImage = screen.getByRole('img');
    expect(getImage.src).toContain(url);
  });
});
