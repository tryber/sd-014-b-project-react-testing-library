import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const renderRouter = (component) => {
  const historic = createMemoryHistory();
  return ({
    ...render(<Router historic={ historic }>{ component }</Router>), historic,
  });
};

export default renderRouter;
