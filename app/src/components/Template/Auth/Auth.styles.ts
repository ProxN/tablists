import styled, { css } from 'styled-components';

export const AuthContainer = styled.div`
  height: calc(100vh - 7rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AuthBox = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bg.main};
    border-radius: ${theme.borderRadius / 2}px;
  `};
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);

  max-width: 36rem;
  padding: 2.5rem;
`;

export const Title = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights[1]};
  font-size: 2.4rem;
`;

export const Form = styled.form`
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  input {
    margin-bottom: 1.2rem;
  }
`;

export const AuthContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Text = styled.span`
  color: rgba(0, 0, 0, 0.65);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

export const AuthLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.main};
  font-weight: ${({ theme }) => theme.fontWeights[1]};
  cursor: pointer;
  font-size: 1.3rem;
`;
