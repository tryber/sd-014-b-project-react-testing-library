import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { About } from '../components';

describe('the application have Pokédex info', () => {
  test('if has an h2 whith a text', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutTitle).toBeInTheDocument();
  });
  test('if has two paragraphs whith text about Pokédex', () => {
    const history = createMemoryHistory();
    const text1 = 'This application simulates a Pokédex, ';
    const text2 = 'a digital encyclopedia containing all Pokémons';
    const text3 = 'One can filter Pokémons by type, ';
    const text4 = 'and see more details for each one of them';
    const fullText1 = text1 + text2;
    const fullText2 = text3 + text4;
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const firstParagraph = screen
      .getByText(fullText1);
    const secondParagraph = screen.getByText(fullText2);
    expect(firstParagraph && secondParagraph).toBeInTheDocument();
  });
  test('if has an image', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
