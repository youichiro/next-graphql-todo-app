import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Top from '../components/page/Top/Top';

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

export default function Home() {
  return <Top />;
}
