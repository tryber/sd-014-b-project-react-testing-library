import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import About from '../components/About';
import myPersonalRender from './renderWithRouter';

describe('A pagina "sobre" da pokedex contém', () => {
  it('um titulo nivel 2 com o texto "About Pokédex"', () => {
    const { historico } = myPersonalRender(<App />);

    historico.push('/about');

    const about = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(about).toBeInTheDocument();
  });

  it('dois paragrafos', () => {
    myPersonalRender(<About />);
    const paragrafos = screen.getAllByText(/Pokémons/);

    expect(paragrafos.length).toBe(2);
  });

  it('uma imagem da "Pokédex"', () => {
    const { historico } = myPersonalRender(<App />);
    historico.push('/about');

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  // linhas: 22, 23, 25, 34, feitas com base no código do Leomar https://github.com/tryber/sd-014-b-project-react-testing-library/commit/6ee91d0382bac63c7b783c22b95de8e429522a20
});
