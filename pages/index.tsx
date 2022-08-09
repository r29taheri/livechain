import Head from 'next/head';
import type { NextPage } from 'next';

import { Header } from '@components/index';

const Home: NextPage = () => (
  <>
    <Head>
      <title>LiveChain</title>
    </Head>
    <Header />
  </>
);

export default Home;
