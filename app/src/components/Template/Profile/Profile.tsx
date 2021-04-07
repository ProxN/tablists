import Avatar from '@components/Elements/Avatar';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';
import { useRef } from 'react';
import styled, { css } from 'styled-components';

const ProfileContainer = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bg.main};
    border-radius: ${theme.borderRadius / 2}px;
  `};
  width: 100%;
  box-shadow: 0 0 5.49px 0.23px rgba(0, 0, 0, 0.08);
  padding: 2.5rem 3rem;
`;

const Heading = styled.h1`
  font-size: 2.2rem;
  opacity: 0.9;
`;

const ProfileForm = styled.form`
  margin-top: 2.4rem;
`;

const Box = styled.div`
  border-bottom: 1px solid rgba(217, 217, 217, 0.5);
  padding: 1rem 0;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  display: block;
  font-weight: 500;
`;

const AvatarGroup = styled.div`
  display: flex;
  align-items: center;
`;

const UploadButton = styled(Button)`
  background: #fff;
  border-color: #d9d9d9;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-left: 1.6rem;
  font-weight: 500;
  :hover {
    background: #fff;
  }
`;

const RemoveButton = styled(UploadButton)`
  color: rgba(0, 0, 0, 0.65);
`;

const FileInput = styled.input`
  display: none;
`;

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
`;

const DeleteAccount = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-weight: 500;
  }
`;

const Action = styled.div`
  display: flex;
  margin-top: 1.6rem;
  justify-content: flex-end;
`;

const Profile = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileUpload = () => {
    inputRef.current?.click();
  };

  return (
    <ProfileContainer>
      <Heading>Account</Heading>
      <ProfileForm>
        <Box>
          <Label htmlFor='avatar'>
            Avatar
            <FileInput ref={inputRef} id='avatar' name='avatar' type='file' />
          </Label>
          <AvatarGroup>
            <Avatar onClick={openFileUpload} name='G' size={3} />
            <UploadButton type='button' onClick={openFileUpload} size='small'>
              Upload
            </UploadButton>
            <RemoveButton type='button' size='small'>
              Remove
            </RemoveButton>
          </AvatarGroup>
        </Box>
        <Box>
          <InputGroup>
            <Input label='Username' />
            <Input label='Email' />
          </InputGroup>
        </Box>
        <DeleteAccount>
          <span>Delete your account</span>
          <Button status='danger'>Delete account</Button>
        </DeleteAccount>
        <Action>
          <Button>Save changes</Button>
        </Action>
      </ProfileForm>
    </ProfileContainer>
  );
};

export default Profile;
