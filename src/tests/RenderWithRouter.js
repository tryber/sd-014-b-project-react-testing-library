import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

function renderWithRouter(component) {
  const seletores = render(
    <Router history={ history }>
      { component }
    </Router>,
  );

  return { ...seletores, history };
}

export default renderWithRouter;
