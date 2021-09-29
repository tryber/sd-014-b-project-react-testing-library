import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import { About } from '../components';

beforeEach(() => RenderWithRouter(<About />));

describe('testa o componente About.js', () => {
  test('se página contém um heading h2 com o texto `About Pokédex`', () => {
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a pokédex.', () => { // https://stackoverflow.com/questions/65122974/getbyrole-query-for-paragraph-not-working-during-react-testing
    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs.length).toBe(2);
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
