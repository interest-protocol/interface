import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DEXPoolDetailsView from '@/views/dapp/views/dex-pool-details';

const DEXPoolDetailsPage: NextPage = () => {
  const {
    query: { pairAddress },
  } = useRouter();

  return <DEXPoolDetailsView pairAddress={pairAddress as string} />;
};

// @MarcoPitra
// @José Cerqueira
// Quando eu passo o json ao provider me dá um erro nessa page, algo provavelmente relacionado ao paramentro,
// dê uma olhada no erro por favor.
// Error: getStaticPaths is required for dynamic SSG pages and is missing for '/dapp/dex/pool/[pairAddress]'.
// Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value

// export const getStaticProps = (props: any) => {
//   return {
//     props: {
//       messages: {
//         ...require(`../../../../assets/dex/${props.locale}.json`),
//       },
//     },
//   };
// };

export default DEXPoolDetailsPage;
