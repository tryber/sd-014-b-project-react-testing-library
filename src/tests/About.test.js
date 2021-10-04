import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('Testa o About', () => {
  it('Testa se tem as infos da pokedex', () => {
    render(<About />);
    const about = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(about).toBeInTheDocument();

    const image = screen.getByAltText('Pokédex');
    // https://stackoverflow.com/questions/60509527/jestreact-native-testing-library-how-to-test-an-image-src \/
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
