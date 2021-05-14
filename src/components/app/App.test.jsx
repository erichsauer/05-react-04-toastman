import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

describe('Toastman component', () => {
  afterEach(() => cleanup());
  it('should be able to make a get/post/put/patch/delete request to a user-specified url and send along user-entered json', async () => {
    render(<App />);
    screen.getByText('Toastman');
    screen.getByAltText('cute toaster with smiley bread');

    const url = screen.getAllByPlaceholderText('enter url');

    screen.getAllByRole('radio');

    cleanup(<App />);
  });
});
