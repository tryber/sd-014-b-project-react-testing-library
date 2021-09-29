import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter ';

describe('Testando o componente "NotFound.js', () => {
  test('Verificar se o texto "Page requested not found" .', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemon-inexistente');

    const notFoundText = screen.getByText(/Page requested not found/);
    expect(notFoundText).toBeInTheDocument();
  });

  test('Verificar se a imagem do componente renderiza.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemon-inexistente');

    const notFoundImage = screen.getByAltText(/Pikachu crying because the page/);
    expect(notFoundImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
