import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const costumHistory = createMemoryHistory();
  const selectorRLT = render(
    <Router history={ costumHistory }>
      { component }
    </Router>,
  );
  return {
    ...selectorRLT,
    history: costumHistory,
  };
}

export default renderWithRouter;
