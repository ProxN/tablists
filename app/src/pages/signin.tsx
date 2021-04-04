import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { useSignin } from '@hooks/useAuth';
import { useAuth } from '@context/auth.context';
import checkAuth from '@utils/checkAuth';
import Auth from '@components/Template/Auth';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';
import Text from '@components/Elements/Text';
import { AuthInputs } from '../types/inputs';

const Signin = () => {
  const { setAuth } = useAuth();
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<AuthInputs>({
    mode: 'onChange',
  });
  const [mutate, { error, isLoading, user }] = useSignin();

  const onSubmit = async (inputs: AuthInputs) => {
    await mutate(inputs);
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
    <Auth title='Sign in' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={(props) => (
          <Input placeholder='Email' id='email' type='email' {...props} />
        )}
        name='email'
        control={control}
        rules={{
          required: 'Email is required',
        }}
        defaultValue=''
      />
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
      {error && <Text status='danger'>{error.message}</Text>}
      <Button
        loading={isLoading}
        disabled={!formState.isValid || isLoading}
        block
        type='submit'
      >
        Sign in
      </Button>
    </Auth>
  );
};

export const getServerSideProps = checkAuth;

export default Signin;
