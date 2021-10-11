import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const MORE_DETAILS = 'More details';

describe('Teste o componente <Pokemon.js />', () => {
  test(
    'Teste se é renderizado um card com as informações de'
    + ' determinado pokémon.',
    () => {
      renderWithRouter(<App />);

      const name = screen.getByTestId('pokemon-name').textContent;
      const type = screen.getByTestId('pokemon-type').textContent;
      const averageWeight = screen.getByTestId('pokemon-weight').textContent;
      const imageSrc = screen.getByRole('img').getAttribute('src');
      const imageAlt = screen.getByRole('img').getAttribute('alt');

      expect(name).toEqual('Pikachu');
      expect(type).toEqual('Electric');
      expect(averageWeight).toEqual('Average weight: 6.0 kg');
      expect(imageSrc).toEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(imageAlt).toEqual(`${name} sprite`);
    },
  );

  test(
    'Teste se o card do Pokémon indicado na Pokédex contém um link'
    + ' de navegação para exibir detalhes deste Pokémon.'
    + 'O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon'
    + ' exibidoTeste se o card do Pokémon indicado na Pokédex contém'
    + ' um link de navegação para exibir detalhes deste Pokémon.'
    + ' O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS })
        .getAttribute('href');
      expect(linkMoreDetails).toEqual('/pokemons/25');
    },
  );

  test(
    'Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento'
    + ' da aplicação para a página de detalhes de Pokémon.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);
      const pikachuDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
      expect(pikachuDetails).toBeInTheDocument();
    },
  );

  test(
    'Teste também se a URL exibida no navegador muda para /pokemon/<id>,'
    + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver.',
    () => {
      const { history } = renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);

      expect(history.location.pathname).toEqual('/pokemons/25');
    },
  );

  test(
    'Teste se existe um ícone de estrela nos Pokémons favoritados.',
    () => {
      renderWithRouter(<App />);

      const linkMoreDetails = screen.getByRole('link', { name: MORE_DETAILS });
      userEvent.click(linkMoreDetails);
      const favoritedPokemon = screen.getByRole(
        'checkbox',
        { name: 'Pokémon favoritado?' },
      );
      userEvent.click(favoritedPokemon);
      const starImage = screen.getAllByRole('img')
        .some((image) => image.getAttribute('src') === '/star-icon.svg'
          && image.getAttribute('alt') === 'Pikachu is marked as favorite');

      expect(starImage).toBeTruthy();
    },
  );
});
