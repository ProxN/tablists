import NextLink from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';

const TabsContainer = styled.div`
  width: 15rem;
  margin-right: 6rem;
`;

const TabsLinks = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabLink = styled.a<{ active?: boolean }>`
  ${({ theme, active }) => css`
    color: ${theme.colors.text};
    font-weight: ${theme.fontWeights[1]};
    background: ${active && '#cee3f5'};

    :hover {
      background: #cee3f5;
    }
  `};

  border-radius: 30rem;
  font-size: 1.4rem;
  cursor: pointer;
  padding: 0.5rem 2rem;
  margin: 0.2rem -2rem;
  transition: background 0.2s ease-in-out;
`;

const links = [
  {
    name: 'Account',
    href: '/account',
  },
  {
    name: 'Password',
    href: '/account/password',
  },
];

const AccountTabs = () => {
  const router = useRouter();
  return (
    <TabsContainer>
      <TabsLinks>
        {links.map((el) => (
          <NextLink key={el.href} href={el.href}>
            <TabLink active={router.pathname === el.href}>{el.name}</TabLink>
          </NextLink>
        ))}
      </TabsLinks>
    </TabsContainer>
  );
};

export default AccountTabs;
