import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/RenderRouter';
import NotFound from '../components/NotFound';

describe('O componente \'NotFound\':', () => {
  it('deve renderizar uma mensagem e uma imagem na tela', () => {
    renderWithRouter(<NotFound />);

    const mainTitle = 'Page requested not found Crying emoji';

    const notFoundTitle = screen.getByRole('heading', { name: mainTitle });
    expect(notFoundTitle).toBeInTheDocument();

    const mainAlt = 'Pikachu crying because the page requested was not found';
    const imageNotFound = screen.getByAltText(mainAlt);
    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
