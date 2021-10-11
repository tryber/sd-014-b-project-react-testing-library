import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

export default function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  const renderObject = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...renderObject,
    history: customHistory,
  };
}

/* Refs:
Usei como base a aula da Maitê da turma 14-a
https://app.betrybe.com/course/live-lectures/sd-cohort-14-a#aula-153-rtl-testando-react-router
*/
