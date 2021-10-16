import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter('/f');
      const h2 = screen.getByRole('heading', {
        level: 2,
        name: 'Page requested not found Crying emoji',
      });
      expect(h2).toBeInTheDocument();
    });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter('/f');
      const img = screen.getAllByRole('img');
      expect(img[1]).toBeInTheDocument();
      expect(img[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
      expect(window.location.pathname).toBe('/f');
    });
});
