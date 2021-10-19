import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 6 - Teste o componente Pokemon', () => {
  test('se é renderizado um card com todas as informações de um pokémon', () => {
    renderWithRouter(<App />);

    const name = screen.getByText('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    const averageWeight = screen.getByText(/Average weight: 6.0 kg/i);

    expect(name).toBeInTheDocument();
    expect(type).toHaveTextContent(/Electric/i);
    expect(averageWeight).toBeInTheDocument();

    const img = screen.getByRole('img');

    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img.alt).toBe('Pikachu sprite');
  });

  test('se o card do pokémon que está na pokédex contém um link de detalhes', () => {
    renderWithRouter(<App />);

    const linkNav = screen.getByRole('link', { name: 'More details' });
    expect(linkNav).toBeInTheDocument();

    userEvent.click(linkNav);

    const detailsTitle = screen.getByText('Summary');
    expect(detailsTitle).toBeInTheDocument();
  });

  test('se a URL exibida no navegador muda /pokemon/<id>, do id do pokémon', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');
  });

  test('se existe um ícone de estrelas nos pokémons favoritos', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details);

    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const icon = screen.getByRole('img', { name: /Pikachu is marked as favorite/ });
    const altImg = screen.getByRole('img', { name: /marked as favorite/ });
    expect(icon).toHaveAttribute('src', '/star-icon.svg');
    expect(altImg).toBeInTheDocument();
  });
});
