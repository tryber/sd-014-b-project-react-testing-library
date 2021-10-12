import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('04 - Teste o componente <NotFound.js />', () => {
  test('a) Se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/notfound');

      const notFoundHeading = screen.getByRole('heading',
        { level: 2, name: 'Page requested not found Crying emoji' });
      expect(notFoundHeading).toBeInTheDocument();
    });

  test('b) Se página mostra a imagem especificada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');

    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(notFoundImage)
      .toBeInTheDocument();
    expect(notFoundImage)
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
