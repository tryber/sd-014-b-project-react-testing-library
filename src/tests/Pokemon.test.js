import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se o componente Pokedex.js', () => {
  // Funções a serem utilizadas nos testes
  const getPokemon = (weight) => screen.getByText(`Average weight: ${weight} kg`);
  const getAlt = (name) => screen.getByAltText(`${name} sprite`);

  const pikachuUrl = '/pokemons/25';
  const charmanderUrl = '/pokemons/4';

  test('Verifica o card do pokemon', () => {
    renderWithRouter(<App />);

    // Faz os Testes com o Pikachu
    getPokemon('6.0');
    getAlt('Pikachu');
    expect(getAlt('Pikachu').src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    // Faz os testes com o Charmander
    fireEvent.click(screen.getByText(/fire/i));
    getPokemon('8.5');
    getAlt('Charmander');
    expect(getAlt('Charmander').src).toBe('https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');
  });

  it('verifica se os links contêm a URL correta', () => {
    renderWithRouter(<App />);

    // Faz os Testes com o Pikachu
    expect(screen.getByRole('link', { name: /details/i })
      .href).toContain(pikachuUrl);

    // Faz os Testes com o Charmander
    fireEvent.click(screen.getByText(/fire/i));
    expect(screen.getByRole('link', { name: /details/i })
      .href).toContain(charmanderUrl);
  });

  it('Testa o redirecionamento da página', () => {
    const { history } = renderWithRouter(<App />);

    // Faz os Testes com o Pikachu
    fireEvent.click(screen.getByText(/details/i));
    expect(history.location.pathname).toBe(pikachuUrl);

    // Faz os testes com o Charmander
    fireEvent.click(screen.getByText(/home/i));
    fireEvent.click(screen.getByText(/fire/i));
    fireEvent.click(screen.getByText(/details/i));
    expect(history.location.pathname).toBe(charmanderUrl);
  });

  test('Verifica se o ícone dos favoritados aparece apenas em favoritados', () => {
    renderWithRouter(<App />);
    const getImgs = () => screen.getAllByRole('img');

    // Iniciando os testes
    fireEvent.click(screen.getByText(/fire/i));
    fireEvent.click(screen.getByText(/details/i));
    expect(getImgs().length).toBe(2 * 2 + 1);
    // Acionando o botão favoritado
    fireEvent.click(screen.getByText(/favoritado/i));
    expect(getImgs().length).toBe(2 * 2 + 2);
    screen.getByAltText(/charmander is marked as favorite/i);
    // Testando se caso ele saia e volte, a estrela continua por lá
    fireEvent.click(screen.getByText(/home/i));
    fireEvent.click(screen.getByText(/fire/i));
    fireEvent.click(screen.getByText(/details/i));
    expect(getImgs().length).toBe(2 * 2 + 2);
  });
});
