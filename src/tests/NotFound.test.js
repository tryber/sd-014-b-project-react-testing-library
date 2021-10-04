import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  it('Verifica se a página possui um Heading com o texto "Page requested not found"',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page/not-found123/');
      const msg = screen.getByRole('heading', { level: 2 });
      expect(msg).toBeInTheDocument();
    });

  it('Verifica se a página possui uma imagem',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/page/not-found123/');
      const img = screen
        .getByAltText('Pikachu crying because the page requested was not found');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
