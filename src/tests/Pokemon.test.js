import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 6: ', () => {
  it('Testa se é renderizado um card com as informações do pokémon', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });
  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const fireBTN = screen.getByRole('button', { name: 'Fire' });
    userEvent.click(fireBTN);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Fire');
  });
  it('Exibe o peso médio?', () => {
    renderWithRouter(<App />);
    const pokePeso = screen.getAllByTestId('pokemon-weight');
    // console.log(('oi', pokePeso[0]));
    expect(pokePeso[0]).toHaveTextContent(/Average weight: 6.0 kg/i);
  });
  it('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const img = screen.getByAltText('Pikachu sprite');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(src);
  });
  it('Testa a rota de detalhes do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkDetalhes);

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(h2).toBeInTheDocument();
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    const starFavorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(starFavorite).toBeInTheDocument();

    // const src = '/star-icon.svg';
    expect(starFavorite).toHaveAttribute('src', '/star-icon.svg');
    // const noFavorite = screen.queryByAltText('Pikachu is marked as favorite');
    // userEvent.click(checkbox);
    // expect(noFavorite).not.toBeInTheDocument();
  });
});
