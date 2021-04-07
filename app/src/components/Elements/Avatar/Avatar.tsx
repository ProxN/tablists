import styled, { css } from 'styled-components';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  onClick?: () => void;
}

const Sizes = {
  1: '3.5rem',
  2: '6rem',
  3: '8rem',
};

const AvatarBox = styled.div<{ bg?: boolean; size?: number }>`
  background: ${({ theme, bg }) => bg && theme.colors.primary.light};

  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1.5rem;
    color: #fff;
    font-weight: 500;
  }

  ${({ size }) =>
    size &&
    css`
      height: ${Sizes[size as keyof typeof Sizes]};
      width: ${Sizes[size as keyof typeof Sizes]};
    `};
`;

const AvatarImg = styled.img`
  max-width: 100%;
  display: flex;
  height: auto;
`;

const Avatar: React.FC<AvatarProps> = ({ src, name, size = 1, ...rest }) => {
  return (
    <AvatarBox size={size} bg={!src} {...rest}>
      {src ? <AvatarImg src={src} alt='User Image Profile' /> : <span>{name}</span>}
    </AvatarBox>
  );
};

export default Avatar;
