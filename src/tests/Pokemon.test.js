import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente Pokemon', () => {
  it('Um card com informações de determinado pokemon deve ser renderizado', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    const pokeDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    expect(pokeDetails).toBeInTheDocument();

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName.textContent).toBe('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType.textContent).toBe('Electric');

    const pokeWeight = screen.getByTestId('pokemon-weight');
    expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');

    const pokeSprite = screen.getByAltText('Pikachu sprite');
    const spriteUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokeSprite).toHaveAttribute('src', spriteUrl);
  });
  it('Deve existir um icone de estrela nos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsButton);

    const isFavoriteCheck = screen.getByRole('checkbox');
    userEvent.click(isFavoriteCheck);

    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
