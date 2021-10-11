import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  test('Testa se contém um heading h2 com o texto Page requested not found 😭', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(notFound).toBeInTheDocument();
  });
  test('Testa se a página contém a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const image = screen.getByAltText('Pikachu crying', { exact: false });
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
