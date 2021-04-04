import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useAuth } from '@context/auth.context';
import { useResetPassword } from '@hooks/useAuth';
import Auth from '@components/Template/Auth';
import Input from '@components/Elements/Input';
import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';

interface INewPassword {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [passError, setPassError] = useState('');
  const { setAuth } = useAuth();
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<INewPassword>({
    mode: 'onChange',
  });
  const [mutate, { isLoading, user, error }] = useResetPassword();

  const onSubmit = async (inputs: INewPassword) => {
    if (inputs.password !== inputs.confirmPassword) {
      setPassError(`Password confirmation doesn't match the password`);
    } else {
      await mutate({
        newPassword: inputs.password,
        resetToken: router.query.token as string,
      });
    }
  };

  useEffect(() => {
    if (user) {
      setAuth(user);
    }
  }, [user]);

  if (user) {
    router.push('/');
  }

  return (
    <Auth hideLinks onSubmit={handleSubmit(onSubmit)} title='Reset your password'>
      <Controller
        render={(props) => (
          <Input placeholder='Password' id='password' type='password' {...props} />
        )}
        name='password'
        control={control}
        rules={{
          required: 'Password is required',
        }}
        defaultValue=''
      />
      <Controller
        render={(props) => (
          <Input
            placeholder='Confirm Password'
            id='confirmPassword'
            type='password'
            {...props}
          />
        )}
        name='confirmPassword'
        control={control}
        rules={{
          required: 'Confirm password is required',
        }}
        defaultValue=''
      />
      {(error ?? passError) && <Text status='danger'>{error?.message ?? passError}</Text>}
      <Button
        loading={isLoading}
        disabled={!formState.isValid || isLoading}
        block
        type='submit'
      >
        Reset Password
      </Button>
    </Auth>
  );
};

export default ResetPassword;
