import React from 'react';
import { screen } from '@testing-library/react';
import RouterRender from '../components/RouterRender';
import About from '../components/About';

describe('Testing the About.js', () => {
  it('should have a heading h2 with the text About Pokédex', () => {
    RouterRender(<About />);
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('should contains two paragraphs with text about the Pokédex', () => {
    RouterRender(<About />);

    expect(screen.getByText(/This/i)).toBeInTheDocument();
    expect(screen.getByText(/One/i)).toBeInTheDocument();
  });

  it('should contain the following image of a Pokédex', () => {
    RouterRender(<About />);

    const img = screen.getByRole('img');

    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
