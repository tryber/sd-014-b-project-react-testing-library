import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from './RenderWithRouter';

describe('testa o componente NotFound.js', () => {
  test('se página contém um heading h2 com o texto `Page requested not found`', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/uma-pagina-inexistente');
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(headingText).toBeInTheDocument();
  });

  test(`se página mostra a imagem
  https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`, () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/uma-pagina-inexistente');
    const img = screen.getAllByRole('img')[1];
    expect(img).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
