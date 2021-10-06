import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it(`Testa se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    render(<FavoritePokemons />);
    const pokemonNotFound = screen.getByText('No favorite pokemon found');
    expect(pokemonNotFound).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    history.push('/favorites');
    const image = screen.getAllByRole('img');
    expect(image.length).toBe(2);
  });
});
