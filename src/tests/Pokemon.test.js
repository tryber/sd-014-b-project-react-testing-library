import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderwithRouter';
import App from '../App';

describe('Testa o componente Pokemon.js', () => {
  const details = 'More details';
  const url = '/pokemons/25';
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const Name = screen.getByTestId('pokemon-name');
    expect(Name.textContent).toBe('Pikachu');
    const Type = screen.getByTestId('pokemon-type');
    expect(Type.textContent).toBe('Electric');
    const Weigth = screen.getByTestId('pokemon-weight');
    expect(Weigth.textContent).toBe('Average weight: 6.0 kg');
    const Img = screen.getByRole('img');
    expect(Img).toBeInTheDocument();
    expect(Img.alt).toBe('Pikachu sprite');
    expect(Img).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test(`Teste se o card na Pokédex contém um link de navegação
  para exibir os detalhes.`, () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: details,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', url);
  });
  it('Teste se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: details,
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(url);
  });
  test(`Teste se ao clicar no link,
  é feito o redirecionamento para a página de detalhes.`,
  () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: details,
    });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    expect(history.location.pathname).toBe(url);
    const Details = screen.getByRole('heading', {
      level: 2, name: 'Pikachu Details',
    });
    expect(Details).toBeInTheDocument();
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: details });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const checked = screen.getByLabelText('Pokémon favoritado?');
    expect(checked).toBeInTheDocument();
    userEvent.click(checked);
    const Img = screen.getByAltText('Pikachu is marked as favorite');
    expect(Img).toHaveAttribute('src', '/star-icon.svg');
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const markedPokemon = screen.getByAltText('Pikachu is marked as favorite');
    expect(markedPokemon).toBeInTheDocument();
  });
});
