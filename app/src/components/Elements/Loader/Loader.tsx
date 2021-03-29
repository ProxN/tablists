import styled, { css, keyframes } from 'styled-components';
import { Size } from '../types/commonTypes';

const Sizes = {
  small: '2rem',
  middle: '3.4rem',
  large: '4.6rem;',
};

const Rotate = keyframes`
  0% {
    transform:rotate(0);
  }
  100% {
    transform:rotate(360deg);
  }
`;

const LoaderSvg = styled.svg`
  animation: ${Rotate} linear 1.3s infinite;
`;

const LoaderContainer = styled.div<LoaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: ${({ color, theme }) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    color === 'default' ? 'white' : theme.colors.primary.main};
  svg {
    ${({ size }) =>
      css`
        height: ${Sizes[size as keyof typeof Sizes]};
        width: ${Sizes[size as keyof typeof Sizes]};
      `}
  }
`;

interface LoaderProps {
  size?: Size;
  color?: 'default' | 'primary';
}

const Loader: React.FC<LoaderProps> = ({ size = 'middle', color = 'primary' }) => {
  return (
    <LoaderContainer color={color} size={size}>
      <LoaderSvg
        xmlns='http://www.w3.org/2000/svg'
        width='71'
        height='71'
        viewBox='0 0 71 71'
      >
        <path
          fill='currentColor'
          d='M35.5 0c19.41 0 35.182 15.578 35.495 34.913L71 35.5h-6C65 19.208 51.792 6 35.5 6S6 19.208 6 35.5c0 16.13 12.945 29.236 29.012 29.496L35.5 65v6C15.894 71 0 55.106 0 35.5S15.894 0 35.5 0z'
        />
      </LoaderSvg>
    </LoaderContainer>
  );
};

export default Loader;
