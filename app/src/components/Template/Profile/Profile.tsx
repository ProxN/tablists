import { useEffect, useRef, useState } from 'react';
import { useUpdateAvatar } from '@hooks/useProfile';
import { useToast } from '@context/toast.context';
import Avatar from '@components/Elements/Avatar';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';
import Text from '@components/Elements/Text';
import { IUser } from 'types/entities';
import {
  ProfileContainer,
  AvatarGroup,
  Action,
  Box,
  DeleteAccount,
  FileInput,
  Heading,
  InputGroup,
  Label,
  ProfileForm,
  RemoveButton,
  UploadButton,
} from './Profile.styles';

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [avatar, setAvatar] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { updateAvatar, updated, error: avatarError } = useUpdateAvatar();
  const { setToast } = useToast();

  const openFileUpload = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      await updateAvatar(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (updated) {
      setToast({
        message: 'Your profile picture has been updated.',
      });
    }
    return () => setToast(null);
  }, [updated]);

  return (
    <ProfileContainer>
      <Heading>Account</Heading>
      <ProfileForm>
        <Box>
          <Label htmlFor='avatar'>
            Avatar
            <FileInput
              onChange={handleFileChange}
              ref={inputRef}
              id='avatar'
              name='avatar'
              type='file'
            />
          </Label>
          <AvatarGroup>
            <Avatar
              onClick={openFileUpload}
              src={avatar || user.avatar}
              name={user.username[0]}
              size={3}
            />
            <UploadButton type='button' onClick={openFileUpload} size='small'>
              Upload
            </UploadButton>
            <RemoveButton type='button' size='small'>
              Remove
            </RemoveButton>
          </AvatarGroup>
          {avatarError && <Text status='danger'>{avatarError.message}</Text>}
        </Box>
        <Box>
          <InputGroup>
            <Input defaultValue={user.username} label='Username' />
            <Input disabled defaultValue={user.email} label='Email' />
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
