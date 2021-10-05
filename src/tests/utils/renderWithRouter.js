import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory(); // cria um histórico de memória

  return {
    ...render(
      <Router history={ customHistory }>
        { component }
      </Router>,
    ), // retorna todos elementos do render
    history: customHistory, // adiciona ao final do resultado do render
  };
}

export default renderWithRouter;
