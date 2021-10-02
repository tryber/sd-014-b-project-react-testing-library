import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import React from 'react';
import { createMemoryHistory } from 'history';

// A descricao dessa funcao foi dada apenas para que eu nao me esqueça
function myPersonalRender(component) {
  const historico = createMemoryHistory();

  const selectors = render(
    <Router history={ historico }>
      { component }
    </Router>,
  );

  return {
    ...selectors,
    historico,
  };
}

export default myPersonalRender;
