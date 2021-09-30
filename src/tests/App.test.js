import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      const { getByText } = render(<App />);
      const topOfApp = getByText;
      expect().toBeInTheDocument();
    });

  test('A aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.',
    () => {});

  test('Se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.',
    () => {});

  test('A aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
    () => {});
    
  test('a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida',
    () => {});
});
