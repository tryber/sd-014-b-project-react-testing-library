import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const selectorsRTL = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...selectorsRTL,
    history: customHistory,
  };
}

export default renderWithRouter;
