import styled, { css } from 'styled-components';
import { getColor, isLight } from '@components/utils/color';
import { Size, Status } from '../types/commonTypes';
import Loader from '../Loader';

interface ButtonProps
  extends ButtonStyleProps,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  loading?: boolean;
}

interface ButtonStyleProps {
  size?: Size;
  status?: Status;
  block?: boolean;
}

const Sizes = {
  small: '.4rem 1rem',
  middle: '0.6rem 1.2rem',
  large: '1.2rem 1.6rem',
};

const BaseButton = styled.button<ButtonStyleProps>`
  ${({ theme, size }) => css`
    font-size: ${theme.fontSizeBase};
    font-weight: ${theme.fontWeights[1]};
    padding: ${Sizes[size as keyof typeof Sizes]};
    border-radius: ${theme.borderRadius / 3}px;
  `};
  background: transparent;
  border: 1px solid transparent;
  letter-spacing: 0.01em;
  font-weight: 400;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  outline: none;
  font-family: inherit;
  white-space: nowrap;
  text-transform: none;
  box-shadow: 0 2.1px 0 rgb(0 0 0 / 2.5%);

  ${({ block }) =>
    block &&
    css`
      width: 100%;
      display: block;
    `};

  :disabled {
    cursor: not-allowed;
  }
`;
const ColorButton = styled(BaseButton)`
  ${({ theme, status }) => {
    const col = getColor(theme.colors, status as string, 'main');
    return css`
      background: ${col};
      color: ${isLight(col) ? theme.colors.text : '#fff'};
      border-color: ${col};
      :hover {
        background: ${getColor(theme.colors, status as string, 'dark')};
      }
      :disabled {
        background: ${getColor(theme.colors, status as string, 'light')};
      }
    `;
  }}
`;

const Button: React.FC<ButtonProps> = (props) => {
  const { size = 'middle', status = 'primary', loading, children, ...rest } = props;
  return (
    <ColorButton size={size} status={status} {...rest}>
      {loading ? <Loader color='default' size='small' /> : children}
    </ColorButton>
  );
};

export default Button;
