import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

function renderWithRouter(componentRender) {
  const customHistory = createMemoryHistory();

  const renderObject = render(
    <Router history={ customHistory }>
      {componentRender}
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}

export default renderWithRouter;
