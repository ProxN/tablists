import NextLink from 'next/link';

import {
  AuthContainer,
  AuthBox,
  AuthContent,
  AuthLink,
  Form,
  Text,
  Title,
} from './Auth.styles';

const info = {
  login: {
    text: 'Don’t have an account yet?',
    href: '/signup',
    linkText: 'Sign up',
  },
  signup: {
    text: 'Adready a member?',
    href: '/signin',
    linkText: 'Sign in',
  },
};

interface AuthProps {
  title?: string;
  page?: 'login' | 'signup';
  onSubmit?: () => void;
  hideLinks?: boolean;
}

const Auth: React.FC<AuthProps> = ({
  children,
  onSubmit,
  title,
  page = 'login',
  hideLinks,
}) => {
  return (
    <AuthContainer>
      <AuthBox>
        <Title>{title}</Title>
        <Form onSubmit={onSubmit}>{children}</Form>
        {!hideLinks && page && (
          <AuthContent>
            <Text>
              {info[page].text}
              <NextLink href={info[page].href}>
                <AuthLink>&nbsp;{info[page].linkText}</AuthLink>
              </NextLink>
            </Text>
            <NextLink href='/forgot_password'>
              <AuthLink>Forgot Password?</AuthLink>
            </NextLink>
          </AuthContent>
        )}
      </AuthBox>
    </AuthContainer>
  );
};

export default Auth;
