import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');

    expect(name.textContent).toBe('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight: 6.0 kg');

    const img = screen.getByAltText(/Pikachu sprite/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/);
    userEvent.click(checkbox);

    const star = screen.getByAltText(/Pikachu is marked as favorite/);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
