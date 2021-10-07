import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Requisito 6', () => {
  test('se é renderizado o card do pokemon', () => {
    renderWithRouter(<App />);
    const btns = screen.getAllByTestId('pokemon-type-button');
    fireEvent.click(btns[0]);
    const poke = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const src = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const srcText = screen.getByRole('img', { name: 'Pikachu sprite' });

    expect(poke).toHaveTextContent('Pikachu');
    expect(type).toHaveTextContent('Electric');
    expect(weight).toHaveTextContent('Average weight:');
    expect(weight).toHaveTextContent('kg');
    expect(srcText.src).toBe(src);

    fireEvent.click(btns[1]);
    expect(poke).toHaveTextContent('Charmander');
    expect(type).toHaveTextContent('Fire');
    expect(weight).toHaveTextContent('Average weight: ');
    expect(weight).toHaveTextContent('kg');
  });

  test('se contem link com mais detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const linkMoreDatails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDatails).toBeInTheDocument();
    userEvent.click(linkMoreDatails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const checkBoxChecked = screen.getByRole('checkbox', { checked: false });
    userEvent.click(checkBoxChecked);
    const src = 'http://localhost/star-icon.svg';
    const srcText = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(srcText).toBeInTheDocument();
    expect(srcText.src).toBe(src);
  });
});
