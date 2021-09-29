import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('2 - Testa o componente About.js', () => {
  it('Testa se a página contém as informações sobre a Pokedéx', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();

    const paragraphOne = screen.getByText(/This application simulates a Pokédex/);
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();

    const imagePokedex = screen.getByAltText('Pokédex');
    // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src \/
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
