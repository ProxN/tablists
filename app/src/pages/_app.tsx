import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import Layout from '@components/Layout';
import { theme, GlobalStyles } from '../styles';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
