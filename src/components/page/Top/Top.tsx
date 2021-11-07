import { useSession } from 'next-auth/client';
import { createContext } from 'react';
import Loading from '../../ui/Loading';
import TopPage from '.';

export const SessionContext = createContext({
  session: null,
  loading: true,
});

const Top: React.FC = () => {
  const [session, loading] = useSession();

  if (loading) return <Loading />;
  if (!session) return <p>Session nothing...</p>;

  return (
    <SessionContext.Provider value={{ session, loading }}>
      <TopPage />
    </SessionContext.Provider>
  );
};

export default Top;
