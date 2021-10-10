import React from "react";
import { screen } from "@testing-library/react";
import { About } from "../components";
import renderWithRouter from "./RenderWithRouter";

describe('Testa o segundo requisito', () => {
  test('Verifica se a página contém um heading h2 com o texto About Pokedex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();  
  });

})  
