/* import React from 'react';
import { render, screen } from '@tesring-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('PokeCards test', () => {
  test('Ecibe a logo e o texto "Pesquisar"', () => {
    render(<App/>);

    const logoImg = screen.getByRole('img');
    expect(logoImg).toBeInTheDocument();

    const textTitle = screen.getByRole('heading', {
      level: 3,
      name: /pomemon/i,
    });
    expect(textTitle).toBeInTheDocument();
  });

  test('Verifica se o input e o botão estão sendo renderizados', () => {
    render(<App/>);

    const inputText = screen.getByRole('textbox');
    expect(inputText).toBeInTheDocument();

    const searchButton = screen.getByRole('button', {
      name: "Pesquisar",
    })
    expect(searchButton).toBeInTheDocument();
  });

  test('verifica se o input recebe entrada de dados', () => {
    render(<App/>);

    const inputText = screen.getByRole('textbox');
    expect(inputText).toBeInTheDocument();

    userEvent.type(inputText, 'oi');
    expect(inputText).toHaveValue('oi');
  });

  test('Aparece o card quando o pokemon é pesquisado', async () => {
    global.fetch = jest.fn( function (url) {
      return Promise.resolve({
        json: () => Promise.resolve({ cards: 'Pikachu'})
      })
    });

    render(<App/>);

    const inputText = screen.getByRole('textbox');
    expect(inputText).toBeInTheDocument();
    userEvent.type(inputText, 'pikachu');

    const searchButton = screen.getByRole('button', {
      name: "pesquisar",
    })
    userEvent.click(searchButton);

    const pikachuName = await screen.findByRole('heading', {
      level: 3,
      name: 'Pikachu-EX',
    })
    expect(pikachuName).toBeInTheDocument();
  })

});

///////////////////  AULA 1  //////////////////////  AULA 1  /////////////////////  AULA 1  ////////////////////

import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

describe('Tela de inserção do email'), () => {
  it('Verifica que há um campo input de email na tela', () => {
    // Acessa os elementos
    const { getByLabeltext } = render(<App/>);
    const inputEmail = getByLabeltext('Email');

    // Realiza os teste
    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail.type).toBe('email');
  });

  it('Verifica que há dois botão', () => {
    const { getByRole } = render(<App/>);
    const button = getbyRole('button');

    expect(button.length).toBe(2);
  });

  it('Verifica que há dois botão', () => {
    const { getByTestId } = render(<App/>);
    const button = getbyRole('id-send');

    expect(button).toBeInTheDocument();
    expect(button).toHaveValue('Enviar');
  });

  it('Verifica que, ao inserir um email e clicar em "Enviar", o email aparece na tela', () => {
    const { getByTestId, getByLabelText } = render(<App />);
    const emailInput = getbyLabelText('Email');
    const sendButton = getByTestId('id-send');
    const userEmail = getbyTestId('id-email-user');

    // Interagir com eles (se houver necessidade)
    fireEvent.change(emailInput, { target: { value: 'alberto@teste.com' }});
    fireEvent.click(sendButton);

    // Fazendo o teste
    expect(emailInput.value).toBe('');
    expect(userEmail.textContent).toBe('Valor: alberto@teste.com');
  })
}

///////////////////  AULA 2  //////////////////////  AULA 2  /////////////////////  AULA 2  ////////////////////

funcaoA = jest.fn().mockImplementation((a,b) => console.log('Finge que chamou funcaoB'));
funcaoA = jest.fn((a,b) => console.log('Finge que chamou a funcaoB com {a} + {b}'))

const meuObjeto = { json: () => console.log('Oi!') };
meuObjeto.Json() // => retorna o console.log

const response = { json: () => Promise.resolve({ joke: 'Whiteboards... are remarkable' })};
response.json(); // => retorna uma promise devido à Promise.resolve

test('Verifica que, quando recebo uma piada, mostro ela na tela', async () => {
  const joke = {
    id: 'fopewjfpeç',
    joke: 'yeah',
    status: 200,
  };

  const response = { json: jest.fn().mockResolvedValue(joke)};
  // ou
  const response = { json: jest.fn().mockImplementation(() => Promise.resolve(joke))};
  // ou
  const response = { json: jest.fn(() => Promise.resolve(joke))};
  // ou
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn(() => Promise.resolve(joke))
  });

  const { findByText } = render(<App />)
  await findByText('yeah'); // =>   await findByText('yeah'); // =>
  // ou
  await waitFor(() => getByText('yeah')); //   await waitFor(() => findByText('yeah'));
});

///////////////////  AULA 3  //////////////////////  AULA 3  /////////////////////  AULA 3  ////////////////////

// Arquivo RenderWithRouter
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { render } from '@testing-library/react';

const renderWithRouter = (componnet) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history } >{component}</Router>), history,
  });
};

// Arquivo Teste
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('teste da aplicação toda', () => {
  it('Verifica se, após a renderização, aparece a página inicial', () => {
    const { getByText } = renderWithRouter(<App />);

    const home = getByText('Você está na página Início');
    expect(home).toBeInTheDocument();
  });

  it('deve renderizar o componente Sobre', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText(/Sobre/i));
    // history.push('/about');

    const { pathname } = history.location;

    expect(pathname).toBe('/about');
    const aboutAll = getByText(/Você esta na pagina sobre/);
    expect(aboutAll).toBeInTheDocument();
  });

  it('deve testar um cmainho não existente e a renderização do not Found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagina/videoX');

    const noMatch = getByText(/página não encontrada/i);
    expect(noMatch).toBeInTheDocument();

  });

  it('deve renderizar o componente about  (apenas componente)', () => {
    const { getByText } = renderWIthRouter(<About />);
    const aboutOnly = getByText(/você está na página sobre/i);
    expect(aboutOnly).toBeInTheDocument();
  });
});

 */
