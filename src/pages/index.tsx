import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { createContext } from 'react';
import Loading from '../components/common/Loading';
import HomeLayout from '../layouts/HomeLayout';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export const SessionContext = createContext({
  session: null,
  loading: true,
});

export default function Home() {
  const [session, loading] = useSession();

  if (loading) return <Loading />;
  if (!session) return <p>Session nothing...</p>;

  return (
    <SessionContext.Provider value={{ session, loading }}>
      <HomeLayout />
    </SessionContext.Provider>
  );
}
