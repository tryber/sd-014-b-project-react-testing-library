import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const randomUrl = '/randomURL';

describe('Testa se o componente Favoritos renderiza corretamente', () => {
  test('Verifica se a aplicação é redirecionada em links inexistentes', () => {
    const { history } = renderWithRouter(<App />);

    history.push(randomUrl);
    const getRandom = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(getRandom).toBeInTheDocument();
  });

  test('Verifica o emoji', () => {
    const { history } = renderWithRouter(<App />);

    history.push(randomUrl);
    const getImg = screen.getByRole('img', {
      name: /Crying emoji/i,
    });
    expect(getImg).toBeInTheDocument();
  });

  test('Verifica a URL da imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push(randomUrl);

    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const getImg = screen.getByAltText(/Pikachu crying/i);
    expect(getImg.src).toBe(src);
  });
});
