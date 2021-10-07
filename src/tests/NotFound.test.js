import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../uteis/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente "NotFound', () => {
  test('se página contém um heading h2 com o texto "Page requested not found".', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { level: 2,
    });
    expect(title).toBeInTheDocument();
  });
});
