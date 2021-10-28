import { render, screen } from '@testing-library/react';
import { Session } from 'next-auth';
import client from 'next-auth/client';
import React from 'react';
import Home from '../src/pages';

jest.mock('../src/components/Account', () => () => <div>Account Mock</div>);
jest.mock('../src/components/ProjectList', () => () => <div>ProjectList Mock</div>);
jest.mock('../src/components/TaskList', () => () => <div>TaskList Mock</div>);
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
  });

  describe('session is loaded', () => {
    it('render components', () => {
      const mockSession: Session = {
        id: 1,
        user: {
          name: 'hoge',
          image: 'hoge',
          email: 'hoge',
        },
      };
      const loading = false;

      (client.useSession as jest.Mock).mockReturnValueOnce([mockSession, loading]);

      render(<Home />);
      expect(screen.getByText('Account Mock'));
      expect(screen.getByText('ProjectList Mock'));
      expect(screen.getByText('TaskList Mock'));
    });
  });
});
