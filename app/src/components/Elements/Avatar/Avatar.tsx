import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  name?: string;
}

const AvatarBox = styled.div<{ bg?: boolean }>`
  background: ${({ theme, bg }) => bg && theme.colors.primary.light};
  height: 3.5rem;
  width: 3.5rem;
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
`;

const AvatarImg = styled.img`
  max-width: 100%;
  display: flex;
  height: auto;
`;

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  return (
    <AvatarBox bg={!src}>
      {src ? <AvatarImg src={src} alt='User Image Profile' /> : <span>{name}</span>}
    </AvatarBox>
  );
};

export default Avatar;
