import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

function renderWithRouter(component) {
  const history = createMemoryHistory();
  const selectorsRTL = render(<Router history={ history }>{component}</Router>);
  return {
    ...selectorsRTL,
    history,
  };
}

export default renderWithRouter;
