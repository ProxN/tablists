import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useChangePassword } from '@hooks/useProfile';
import { useToast } from '@context/toast.context';
import checkAuth from '@utils/checkAuth';
import AccountTabs from '@components/Elements/AccountTabs';
import Container from '@components/Elements/Container';
import Input from '@components/Elements/Input';
import ProfileCard from '@components/Elements/Card';
import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';
import { NewPasswordInputs } from '../../types/inputs';

const Password = () => {
  const [passError, setPassError] = useState<string>();
  const { control, handleSubmit, formState, reset } = useForm<NewPasswordInputs>({
    mode: 'onChange',
  });
  const [changePassword, { isLoading, error, updated }] = useChangePassword();
  const { setToast, toast } = useToast();

  const onSubmit = async (inputs: NewPasswordInputs) => {
    if (toast) {
      setToast(null);
    }
    const { newPassword, oldPassword, confirmPassword } = inputs;
    if (newPassword === confirmPassword) {
      if (passError) setPassError(undefined);
      await changePassword({
        newPassword,
        oldPassword,
      });
    } else {
      setPassError(`Password confirmation doesn't match the password.`);
    }
  };

  useEffect(() => {
    if (updated) {
      reset();
      setToast({
        message: 'your password has been successfully changed.',
      });
    }
  }, [updated]);

  return (
    <Container width='90rem'>
      <AccountTabs />
      <ProfileCard title='Change Password'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            render={(props) => (
              <Input
                id='oldPassword'
                type='password'
                label='Old Password'
                placeholder='Your old password'
                {...props}
              />
            )}
            name='oldPassword'
            control={control}
            defaultValue=''
            rules={{
              required: 'Old password is required',
            }}
          />
          <Controller
            render={(props) => (
              <Input
                id='newPassword'
                label='New Password'
                type='password'
                placeholder='New password'
                {...props}
              />
            )}
            name='newPassword'
            control={control}
            defaultValue=''
            rules={{
              required: 'New password is required',
            }}
          />
          <Controller
            render={(props) => (
              <Input
                id='confirmPassword'
                type='password'
                label='Confirm Password'
                placeholder='Confirm new password'
                {...props}
              />
            )}
            name='confirmPassword'
            control={control}
            defaultValue=''
            rules={{
              required: 'Confirm password is required',
            }}
          />

          {(passError || error) && (
            <Text status='danger'>{passError || (error && error.message)}</Text>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              loading={isLoading}
              disabled={!formState.isValid || isLoading}
              type='submit'
            >
              Save changes
            </Button>
          </div>
        </form>
      </ProfileCard>
    </Container>
  );
};

export const getServerSideProps = checkAuth;

export default Password;
