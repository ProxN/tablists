import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Layout from '@components/Layout';
import { AuthProvider } from '@context/auth.context';
import { theme, GlobalStyles } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
