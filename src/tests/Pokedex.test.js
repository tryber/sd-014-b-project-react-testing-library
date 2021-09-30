import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Pokedex.js tests set', () => {
  it('should the page contains a h2 heading with the solicited text', () => {
    // Teste se página contém um heading h2 com o texto Encountered pokémons.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const textEncountered = screen.getByRole('heading', {
      level: 2, name: /encountered pokémons/i });
    expect(textEncountered).toBeInTheDocument();
  });

  it('should the next pokémon will be'
  + ' in the screen if the next button be clicked', () => {
    // Teste se é exibido o próximo Pokémon da lista quando o botão Próximo pokémon é clicado.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachuSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(nextButton).toBeInTheDocument();
    expect(pikachuSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const charmanderSprite = screen.getByRole('img', { name: /charmander sprite/i });
    expect(charmanderSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const caterpieSprite = screen.getByRole('img', { name: /caterpie sprite/i });
    expect(caterpieSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const ekansSprite = screen.getByRole('img', { name: /ekans sprite/i });
    expect(ekansSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const alakazamSprite = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(alakazamSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const mewSprite = screen.getByRole('img', { name: /mew sprite/i });
    expect(mewSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const rapidashSprite = screen.getByRole('img', { name: /rapidash sprite/i });
    expect(rapidashSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const snorlaxSprite = screen.getByRole('img', { name: /snorlax sprite/i });
    expect(snorlaxSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    const dragonairSprite = screen.getByRole('img', { name: /dragonair sprite/i });
    expect(dragonairSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(pikachuSprite).toBeInTheDocument();
  });

  it('shoulde be shown once pokémon per time', () => {
    // Teste se é mostrado apenas um Pokémon por vez.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const numbersOfImgs = screen.getAllByRole('img');
    expect(numbersOfImgs.length).toBe(1);
  });

  it('should Pokedex.js has filter buttons', () => {
    // Teste se a Pokédex tem os botões de filtro.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const allButton = screen.getByRole('button', { name: /all/i });
    const electricButton = screen.getByRole('button', { name: /electric/i });
    const fireButton = screen.getByRole('button', { name: /fire/i });
    const bugButton = screen.getByRole('button', { name: /bug/i });
    const poisonButton = screen.getByRole('button', { name: /poison/i });
    const psychicButton = screen.getByRole('button', { name: /psychic/i });
    const normalButton = screen.getByRole('button', { name: /normal/i });
    const dragonButton = screen.getByRole('button', { name: /dragon/i });
    expect(allButton).toBeInTheDocument();
    expect(electricButton).toBeInTheDocument();
    expect(fireButton).toBeInTheDocument();
    expect(bugButton).toBeInTheDocument();
    expect(poisonButton).toBeInTheDocument();
    expect(psychicButton).toBeInTheDocument();
    expect(normalButton).toBeInTheDocument();
    expect(dragonButton).toBeInTheDocument();

    userEvent.click(psychicButton);
    const alakazamSprite = screen.getByRole('img', { name: /alakazam sprite/i });
    expect(alakazamSprite).toBeInTheDocument();

    const psyType = screen.getByTestId('pokemon-type');
    expect(psyType.innerHTML).toBe('Psychic');

    expect(allButton).toBeInTheDocument();
  });

  it('should Pokédex has a button to clear the filter', () => {
    // Teste se a Pokédex contém um botão para resetar o filtro.
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const allButton = screen.getByRole('button', { name: /all/i });
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    const pikachuSprite = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuSprite).toBeInTheDocument();
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    userEvent.click(nextButton);
    expect(pikachuSprite).toBeInTheDocument();

    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(typeButtons.length).toBe(seven);
  });
});
