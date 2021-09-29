import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/rota-desconhecida-que-não-existe');
      const titleNotFound = screen.getByText('Page requested not found');
      const spanNotFound = screen.getByText('😭');
      expect(titleNotFound).toBeInTheDocument();
      expect(spanNotFound).toBeInTheDocument();
    });
  test('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-desconhecida-que-não-existe');
    const image = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
