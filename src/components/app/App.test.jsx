import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get(
    'https://futuramaapi.herokuapp.com/api/quotes/1',
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            character: 'Leela',
            quote:
              'You say that those brains are making everyone on Earth stupid. Oh... stupider.',
            image:
              'https://res.cloudinary.com/dzxqhkyqd/image/upload/v1554904145/leela.png',
          },
        ])
      );
    }
  )
);

describe('Toastman component', () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should be able to make a get/post/put/patch/delete request to a user-specified url and send along user-entered json', async () => {
    render(<App />);

    screen.getByAltText('toastman');

    const url = screen.getByPlaceholderText('https://localtoast...');
    userEvent.type(url, 'https://futuramaapi.herokuapp.com/api/quotes/1');

    await screen.findByDisplayValue('GET', { name: 'selectedMethod' });
    const method = await screen.findByDisplayValue('GET');
    userEvent.click(method);

    const button = await screen.findByRole('button', { name: 'GET' });
    userEvent.click(button);

    const timeout = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    await timeout;

    return waitFor(() => {
      const container = screen.getByText(
        'You say that those brains are making everyone on Earth stupid. Oh... stupider.',
        { exact: false }
      );
      expect(container).toMatchSnapshot();
    });
  });
});
