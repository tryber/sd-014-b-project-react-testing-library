import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const expectedHeading = screen.getByText(/Page requested not found/i);

    expect(expectedHeading).toBeInTheDocument();
  });
  test('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter(<NotFound />);

      const expectedIMG = screen.getAllByRole('img');

      expect(expectedIMG[1]).toHaveAttribute(
        'src',
        'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
      );
    });
});
