import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useProfile, useDeleteAccount } from '@hooks/useProfile';
import useModalState from '@hooks/useModalState';
import { useToast } from '@context/toast.context';
import Avatar from '@components/Elements/Avatar';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';
import ProfileCard from '@components/Elements/ProfileCard';
import Text from '@components/Elements/Text';
import { IUser } from 'types/entities';
import { UpdateProfileInputs } from 'types/inputs';
import {
  AvatarGroup,
  Action,
  Box,
  DeleteAccount,
  FileInput,
  InputGroup,
  Label,
  RemoveButton,
  UploadButton,
} from './Profile.styles';

interface ProfileProps {
  user: IUser;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit, formState } = useForm<UpdateProfileInputs>({
    mode: 'onChange',
  });
  const { updateUser, updated, error } = useProfile();
  const { openModal, closeModal } = useModalState();
  const { setToast } = useToast();
  const [deleteAccount, { deleted }] = useDeleteAccount();

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
      await updateUser({ file: e.target.files[0] });
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

  const onSubmit = async (inputs: UpdateProfileInputs) => {
    if (inputs.username !== user.username) {
      setIsLoading(true);
      await updateUser(inputs);
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    await deleteAccount();
    closeModal();
  };

  const handleDeleteClick = () => {
    openModal({
      body: 'Are you sure you want to delete your account?',
      props: {
        title: 'Delete Account',
        handler: handleDeleteAccount,
      },
    });
  };

  if (deleted) {
    router.push({
      pathname: '/',
      query: { message: 'account-deleted' },
    });
  }

  return (
    <ProfileCard title='Account'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        </Box>
        <Box>
          <InputGroup>
            <Controller
              render={(props) => <Input id='username' label='Username' {...props} />}
              name='username'
              control={control}
              defaultValue={user.username}
              rules={{
                required: 'Username is required',
              }}
            />
            <Input disabled defaultValue={user.email} label='Email' />
          </InputGroup>
        </Box>
        <DeleteAccount>
          <span>Delete your account</span>
          <Button onClick={handleDeleteClick} status='danger'>
            Delete account
          </Button>
        </DeleteAccount>
        {error && <Text status='danger'>{error.message}</Text>}
        <Action>
          <Button
            loading={isLoading}
            disabled={!formState.isValid || isLoading}
            type='submit'
          >
            Save changes
          </Button>
        </Action>
      </form>
    </ProfileCard>
  );
};

export default Profile;
