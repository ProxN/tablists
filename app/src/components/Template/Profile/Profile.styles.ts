import styled, { css } from 'styled-components';
import Button from '@components/Elements/Button';

export const ProfileContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bg.main};
    border-radius: ${theme.borderRadius / 2}px;
  `};
  width: 100%;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 3rem;
`;

export const Heading = styled.h1`
  font-size: 2.2rem;
  opacity: 0.9;
`;

export const ProfileForm = styled.form`
  margin-top: 2.4rem;
`;

export const Box = styled.div`
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
  padding: 1rem 0;
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  display: block;
  font-weight: 500;
`;

export const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

export const UploadButton = styled(Button)`
  background: #fff;
  border-color: #d9d9d9;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-left: 1.6rem;
  font-weight: 500;
  :hover {
    background: #fff;
  }
`;

export const RemoveButton = styled(UploadButton)`
  color: rgba(0, 0, 0, 0.65);
`;

export const FileInput = styled.input`
  display: none;
`;

export const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
`;

export const DeleteAccount = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  span {
    font-weight: 500;
  }
`;

export const Action = styled.div`
  display: flex;
  margin-top: 1.6rem;
  justify-content: flex-end;
`;
