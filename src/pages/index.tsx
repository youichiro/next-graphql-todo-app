import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import Main from '../layouts/Main';
import Sidebar from '../layouts/Sidebar';
import styles from '../styles/pages/home.module.scss';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  console.log('index.tsx getServerSideProps');
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      }
    };
  }
  return {
    props: {
      session: session
    },
  };
};

export default function Home() {
  const [session, loading] = useSession();

  if (loading) return <p>Validation session...</p>;

  if (!session) return <p>Session nothing...</p>

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar></Sidebar>
      </div>
      <main className={styles.main}>
        <Main />
      </main>
    </div>
  );
}
