import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

export default function renderWithRouter(component) {
  // Gera um "historico de navegação" para o teste
  const history = createMemoryHistory();
  // Renderiza o componente a ser testado
  const selectors = render(
    <Router history={ history }>
      { component }
    </Router>,
  );
  return {
    // Retorna todos os itens do objeto Render
    ...selectors,
    // Retorna o createMemoryHistory
    history,
  };
}
