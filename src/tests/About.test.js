import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('renders about component and applies tests', () => {
  it('should contain a Pokédex title', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });
  it('should contain 2 paragraphs of text', () => {
    renderWithRouter(<About />);
    const text = screen.getAllByText((_content, element) => (
      element.tagName.toLowerCase() === 'p'
    ));
    expect(text.length).toBe(2);
  });
  it('should contain an image', () => {
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imageUrl);
  });
});
