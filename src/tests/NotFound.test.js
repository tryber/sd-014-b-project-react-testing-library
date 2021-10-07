import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('4. Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pikachu');

    const message = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(message).toBeInTheDocument();
  });

  test('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pikachu');

    const NotFoundImg = screen.getAllByRole('img');
    expect(NotFoundImg[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
