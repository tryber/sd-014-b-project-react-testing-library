import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('2 - Quando a navegação para o About ocorre', () => {

  it('Será validado se contém as informaçoes sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about')

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const title = screen.getByRole('heading', {level: 2, name: 'About Pokédex'});
    expect(title).toBeInTheDocument();

    const firstParagraph = screen.getByText('This application simulates',
     { exact: false })
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText('One can filter Pokémons',
     { exact: false })
    expect(secondParagraph).toBeInTheDocument();

    const imgPokedex = screen.getByRole('img');
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    expect(imgPokedex).toHaveAttribute('src', urlImg);
  });

});
