import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from '@mantine/core';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import Header from '../components/header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <Provider store={store}>
          <Header />
          <Component {...pageProps} />
        </Provider>
      </MantineProvider>
    )
}
