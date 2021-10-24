import { render, screen, waitFor } from '@testing-library/react';
import { Session } from 'next-auth';
import client from 'next-auth/client';
import React from 'react';
import Home from '../src/pages';

jest.mock('next-auth/client');
const useContextMock = (React.useContext = jest.fn());

describe('Home', () => {
  describe('session is loading', () => {
    it('renders Home page session loading', async () => {
      const mockSession: Session = null;
      const loading = true;

      (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, loading]);
      useContextMock.mockReturnValue({ session: mockSession, loading });

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Validation session...'));
      });
    });
  });

  describe('session is loaded', () => {
    it('renders Home page session loading', async () => {
      const mockSession: Session = {
        user: {
          image: 'hoge'
        }
      };
      const loading = false;

      (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, loading]);
      useContextMock.mockReturnValue({ session: mockSession, loading });

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Validation session...')).not.toBeInTheDocument();
      });
    });
  });
});
