import { screen } from '@testing-library/react';
import renderRoute from '../helper/renderRoute';

describe('4 - Exiba uma página padrão para caminhos inexistentes', () => {
  const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const pathRoute = '/undefined';

  test('Se ao navegar para um caminho inexistente exibe a mensagem padrão', () => {
    const { history } = renderRoute(pathRoute);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    })).toBeInTheDocument();

    expect(history.location.pathname).toBe(pathRoute);
  });

  test('Se ao navegar para um caminho inexistente exibe a imagem padrão', () => {
    const { history } = renderRoute(pathRoute);

    const expectedImg = screen.getAllByRole('img').find((img) => img.src === imgURL);
    expect(expectedImg).toBeInTheDocument();

    expect(history.location.pathname).toBe(pathRoute);
  });
});
