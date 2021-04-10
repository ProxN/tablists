import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Layout from '@components/Layout';
import { AuthProvider } from '@context/auth.context';
import { ToastProvider } from '@context/toast.context';
import { theme, GlobalStyles } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <ToastProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
