// Estrutura feita com auxílio do vídeo do Alberto no course bloco 15.3
// Criando um novo histórico a cada vez que é renderizado
import React from 'react'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

export default renderWithRouter;