import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

// Código abaixo retirado da aula ao vivo do dia 15.3 momento 1:06:00
function renderWithRouter(component) {
  const history = createMemoryHistory();
  const selectorsRTL = render(
    <Router history={ history }>
      { component }
    </Router>,
  );

  return {
    ...selectorsRTL,
    history,
  };
}

export default renderWithRouter;
