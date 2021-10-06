import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('02 - Teste o componente <About.js />', () => {
  test('a) Se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pageHeading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(pageHeading).toBeInTheDocument();
  });
  test('b) Se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const paragraphs = screen.getAllByTestId('paragraph');
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs[0].name).not.toBe('');
    expect(paragraphs[1].name).not.toBe('');
  });
  test('c) Se a página contém a imagem especificada de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
