import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

const renderWithRouter = (componentToRender) => {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        { componentToRender }
      </Router>,
    ),
    history: customHistory,
  };
};

export default renderWithRouter;
