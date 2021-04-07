import styled, { css } from 'styled-components';

export interface InputStyleProps {
  right?: boolean;
}

export const InputBase = styled.input<InputStyleProps>`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    border-radius: ${theme.borderRadius / 3}px;
    font-size: ${theme.fontSizeBase};

    :hover,
    :focus {
      border-color: ${theme.colors.primary.main};
    }
  `};
  line-height: 1.5;
  padding: 0.8rem 1.2rem;
  border: 1px solid #d9d9d9;
  width: 100%;
  outline: none;
  transition: border-color 0.1s ease-in-out;

  ::placeholder {
    color: rgba(0, 0, 0, 0.45);
  }

  ${({ right }) =>
    right &&
    css`
      padding-right: 3.5rem;
    `};
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const IconBox = styled.div<{ right?: boolean }>`
  position: absolute;
  top: 50%;
  margin-top: -1rem;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;

  svg {
    stroke: currentColor;
    width: 100%;
    height: 100%;
  }

  ${({ right }) =>
    right &&
    css`
      right: 1rem;
    `};
`;

export const Label = styled.label`
  font-weight: 500;
  margin-bottom: 0.4rem;
  display: block;
`;
