import { render, screen, waitFor } from '@testing-library/react';
import client from 'next-auth/client';
import Home from '../src/pages';
jest.mock('next-auth/client');

describe('HOME', () => {
  it('renders a heading', async () => {
    const mockSession = {
      expires: '1',
      user: { email: 'a', name: 'a', image: 'a' },
    };

    (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, true]);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('Validation session...'));
    })
  });
});
