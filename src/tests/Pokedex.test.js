import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokedex', () => {
  const nextBtnString = 'Próximo pokémon';
  const typeId = 'pokemon-type';
  const typeBtnId = 'pokemon-type-button';
  renderWithRouter(<App />);
  const pokeType = screen.getAllByTestId(typeId);
  it('se página contém um heading h2 com o texto Encountered pokémons.', () => {
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Encountered pokémons');
  });

  describe('se é exibido o próximo Pokémon da lista'
  + ' quando o botão Próximo pokémon é clicado.', () => {
    it('se o botão contém o texto Próximo pokémon.', () => {
      renderWithRouter(<App />);
      const nextPokeBtn = screen.getByTestId('next-pokemon');
      expect(nextPokeBtn).toBeInTheDocument();
    });
    it('se os próximos Pokémons da lista são mostrados, um a um,'
    + ' ao clicar sucessivamente no botão.', () => {
      renderWithRouter(<App />);
      const pokeTypeCurrent = screen.getAllByTestId(typeId);
      const nextPokeBtn = screen.getByRole('button', { name: nextBtnString });
      userEvent.click(nextPokeBtn);
      expect(pokeTypeCurrent[0]).toHaveTextContent('Fire');
      expect(pokeTypeCurrent.length).toEqual(1);
    });
    it('se o primeiro Pokémon da lista é mostrado ao clicar no botão,'
    + ' se estiver no último Pokémon da lista', () => {
      renderWithRouter(<App />);
      const nextPokeBtn = screen.getByRole('button', { name: nextBtnString });
      const clicksNumber = 9;
      for (let index = 0; index < clicksNumber; index += 1) {
        userEvent.click(nextPokeBtn);
      }
      expect(pokeType[0]).toHaveTextContent('Electric');
      expect(pokeType.length).toEqual(1);
    });
  });

  it('se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const nextPokeBtn = screen.getByText(nextBtnString);
    expect(pokeType.length).toEqual(1);
    userEvent.click(nextPokeBtn);
    expect(pokeType.length).toEqual(1);
  });

  describe('se a Pokédex tem os botões de filtro.', () => {
    it(
      'se existe um botão de filtragem para cada tipo de Pokémon, sem repetição.', () => {
        renderWithRouter(<App />);
        const types = pokemons.map((pokemon) => pokemon.type);
        const typeButtons = screen.getAllByTestId(typeBtnId);
        types.forEach((type) => {
          typeButtons.forEach((button) => {
            if (type === button.textContent) {
              expect(button).toHaveTextContent(type);
            }
          });
        });
      },
    );

    it('se a partir da seleção de um botão de tipo,'
    + ' a Pokédex circula somente pelos pokémons daquele tipo.', () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByText(nextBtnString);
      const typeButtons = screen.getAllByTestId(typeBtnId);
      typeButtons.forEach((button) => {
        userEvent.click(button);
        if (!nextBtn.hasAttribute('disabled')) {
          userEvent.click(nextBtn);
          const type = screen.getByTestId(typeId).textContent;
          expect(button).toHaveTextContent(type);
        }
      });
    });

    it('se o botão All está sempre visível.', () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByText('All');
      const nextBtn = screen.getByText(nextBtnString);
      const typeButtons = screen.getAllByTestId(typeBtnId);
      typeButtons.forEach((button) => {
        userEvent.click(button);
        if (!nextBtn.hasAttribute('disabled')) {
          userEvent.click(nextBtn);
        }
        expect(allBtn).toBeInTheDocument();
      });
    });
  });

  describe('se a Pokédex contém um botão para resetar o filtro.', () => {
    it('se o texto do botão é All', () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByText('All');
      expect(allBtn).toBeInTheDocument();
    });

    it('se a Pokedéx mostra os Pokémons normalmente (sem filtros)'
    + ' quando o botão All é clicado;', () => {
      renderWithRouter(<App />);
      const allBtn = screen.getByText('All');
      const nextBtn = screen.getByText(nextBtnString);
      const pokeTypeCur = screen.getByTestId(typeId);
      userEvent.click(allBtn);
      userEvent.click(nextBtn);
      expect(pokeTypeCur).toHaveTextContent('Fire');
    });

    it('se ao carregar a página, o filtro selecionado deverá ser All.', () => {
      renderWithRouter(<App />);
      const nextBtn = screen.getByText(nextBtnString);
      const pokeTypeCur = screen.getByTestId(typeId);
      userEvent.click(nextBtn);
      expect(pokeTypeCur).toHaveTextContent('Fire');
    });
  });
});
