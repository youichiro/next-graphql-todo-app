import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import client from 'next-auth/client';
import React from 'react';
import Home from '../src/pages';

jest.mock('next-auth/client');

describe('Home', () => {
  describe('session is loading', () => {
    it('display a message that session is loading', () => {
      const mockSession: Session = null;
      const loading = true;

      (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, loading]);

      render(<Home />);

      expect(screen.getByText('Session loading...'));
    });
  });

  describe('session is empty', () => {
    it('display a message that session is nothing', () => {
      const mockSession: Session = null;
      const loading = false;

      (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, loading]);

      render(<Home />);

      expect(screen.getByText('Session nothing...'));
    });
  })
});
