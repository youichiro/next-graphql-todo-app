import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import { createContext } from 'react';
import Account from '../components/Account';
import ProjectList from '../components/ProjectList';
import TaskList from '../components/TaskList';
import styles from '../styles/pages/home.module.scss';

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

  if (loading) return <p>Session loading...</p>;
  if (!session) return <p>Session nothing...</p>;

  return (
    <SessionContext.Provider value={{ session, loading }}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Account />
          <ProjectList />
        </div>
        <main className={styles.main}>
          <TaskList />
        </main>
      </div>
    </SessionContext.Provider>
  );
}
