import "../styles/style.css";
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return <>
    <Head>
      <link rel="icon" href="favicon.png" />
    </Head>
    <Component {...pageProps} />
  </>
}