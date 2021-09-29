import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

const ekansLink = '/pokemons/23';

describe('Teste 6 - Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    fireEvent.click(poisonButton);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText('Ekans sprite');

    expect(pokemonName.textContent).toBe('Ekans');
    expect(pokemonType.textContent).toBe('Poison');
    expect(pokemonWeight.textContent).toBe('Average weight: 6.9 kg');
    expect(pokemonImage).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    );
  });
  it(`Teste se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes`, () => {
    renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    fireEvent.click(poisonButton);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', ekansLink);
  });
  it(`Teste se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const poisonButton = screen.getByRole('button', { name: 'Poison' });
    fireEvent.click(poisonButton);

    const detailsLink = screen.getByRole('link', { name: 'More details' });
    fireEvent.click(detailsLink);

    expect(history.location.pathname).toBe(ekansLink);
  });
  it(`Teste também se a URL exibida no navegador muda para /pokemon/<id>,
  onde <id> é o id do Pokémon cujos detalhes se deseja ver;`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(ekansLink);

    expect(history.location.pathname).toBe(ekansLink);
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(ekansLink);

    const favoritCheckbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favoritCheckbox).toBeInTheDocument();

    fireEvent.click(favoritCheckbox);
    const starIco = screen.getByAltText('Ekans is marked as favorite');
    expect(starIco).toHaveAttribute('src', '/star-icon.svg');
  });
});
