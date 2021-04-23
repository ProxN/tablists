import { useRef } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '@components/Layout';
import { AuthProvider } from '@context/auth.context';
import { ToastProvider } from '@context/toast.context';
import { theme, GlobalStyles } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  const queryclient = useRef<QueryClient>();
  if (!queryclient.current) {
    queryclient.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ToastProvider>
          <QueryClientProvider client={queryclient.current}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
