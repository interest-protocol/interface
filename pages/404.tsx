import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';

const ErrorPage: NextPage = () => <Error statusCode={404} />;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const messages = (await import(`../assets/messages/common/${locale}.json`))
    .default;

  return {
    props: {
      messages,
      now: new Date().getTime(),
      pageTitle: 'common.error',
    },
  };
};

export default ErrorPage;
