import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "About.js"', () => {
  test('Verificar se os elementos do componente "About.js" renderizam.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const abouteTitle = screen.getByRole('heading', { level: 2 });
    expect(abouteTitle).toBeInTheDocument();
    expect(abouteTitle).toHaveTextContent('About Pokédex');

    const aboutPokedexImage = screen.getByAltText('Pokédex');
    expect(aboutPokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
