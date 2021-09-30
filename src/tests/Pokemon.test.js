import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa funcionalidades da página Pokemon', () => {
  it('testa se existe as informações do Pokemon no Card', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img');
    const imgAlt = screen.getByAltText(/Pikachu sprite/i);

    expect(name.textContent).toBe('Pikachu');
    expect(type.textContent).toBe('Electric');
    expect(weight.textContent).toBe('Average weight: 6.0 kg');
    expect(img).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgAlt).toBeInTheDocument();
    // https://testing-library.com/docs/queries/bytext/#api - Como utilizar o textContent.
  });

  it('testa se existe o link "More Details"', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('testa se existe o icone de favorito', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favCheckbox);

    const favoriteIcon = screen.getAllByRole('img');
    expect(favoriteIcon[1]).toHaveProperty('src', 'http://localhost/star-icon.svg');
    const favoriteIconAlt = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoriteIconAlt).toBeInTheDocument();
  });
});
