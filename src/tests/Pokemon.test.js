import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente Pokemon', () => {
  const moreDetString = 'More details';
  const pokeSrcIdString = '/pokemons/25';
  it('se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByRole('img');
    const electricBtn = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(electricBtn);
    expect(pokeName).toHaveTextContent('Pikachu');
    expect(pokeType).toHaveTextContent('Electric');
    expect(pokeWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokeImg).toHaveAttribute(
      'src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('se o card do Pokémon indicado na Pokédex contém um link de navegação para '
  + 'exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, '
  + 'onde <id> é o id do Pokémon exibido.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(moreDetString);
    expect(moreDetailsLink).toBeInTheDocument();
    expect(moreDetailsLink).toHaveAttribute('href', pokeSrcIdString);
  });

  it('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
  + 'da aplicação para a página de detalhes de Pokémon.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(moreDetString);
    userEvent.click(moreDetailsLink);
    const detailsText = screen.getByText('Pikachu Details');
    expect(detailsText).toBeInTheDocument();
  });

  it('se a URL exibida no navegador muda para /pokemon/<id>, onde <id>'
  + ' é o id do Pokémon cujos detalhes se deseja ver.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(moreDetString);
    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(pokeSrcIdString);
  });

  it('se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText(moreDetString);
    userEvent.click(moreDetailsLink);
    const favCheckbox = screen.getByRole('checkbox');
    userEvent.click(favCheckbox);
    const starIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
