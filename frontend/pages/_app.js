import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head'; // Importación faltant
import store from '../redux/store';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        {/* Viewport para responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;