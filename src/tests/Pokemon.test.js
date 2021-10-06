import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const MORE_DETAILS = 'More details';

describe('Testa o componente <Pokemon.js />', () => {
  it(`Testa se é renderizado um card
  com as informações de determinado pokémon.`, () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      'Average weight: 6.0 kg',
    );
    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  it(`Testa se o card do Pokémon indicado na Pokédex
  contém um link de navegação para exibir detalhes deste Pokémon.`, () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('link', { name: MORE_DETAILS })).toHaveAttribute(
      'href',
      '/pokemons/25',
    );
  });

  it('A imagem do Pokémon deve ser exibida.', () => {
    renderWithRouter(<App />);
    expect(screen.getByAltText('Pikachu sprite')).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it(`Testa se ao clicar no link de navegação do Pokémon,
  é feito o redirecionamento da aplicação para
  a página de detalhes de Pokémon.`, () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS }));
    expect(screen.getByText('Summary')).toBeInTheDocument();
  });

  it(`Testa também se a URL exibida no
  navegador muda para /pokemon/<id>.`, () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS }));
    expect(history.location.pathname).toBe('/pokemons/25');
  });
});

describe(`Testa se existe um ícone
de estrela nos Pokémons favoritados.`, () => {
  it(`O ícone deve ser uma imagem com
  o atributo src contendo o caminho /star-icon.svg`, () => {
    const { history } = renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    userEvent.click(links[3]);
    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    history.push('/favorites');
    expect(
      screen.getByAltText('Pikachu is marked as favorite'),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Pikachu is marked as favorite'),
    ).toHaveAttribute('src', '/star-icon.svg');
  });
});
