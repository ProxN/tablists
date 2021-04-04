import { Controller, useForm } from 'react-hook-form';
import { useForgotPassword } from '@hooks/useAuth';
import Input from '@components/Elements/Input';
import Auth from '@components/Template/Auth';
import Button from '@components/Elements/Button';
import Text from '@components/Elements/Text';

const ForgotPassword = () => {
  const { control, handleSubmit, formState } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const [mutate, { isLoading, emailSent, error }] = useForgotPassword();

  const onSubmit = async (inputs: { email: string }) => {
    await mutate(inputs);
  };

  return (
    <Auth hideLinks onSubmit={handleSubmit(onSubmit)} title='Forgot your password?'>
      {emailSent ? (
        <Text>
          Check your email for a link to reset your password. If it doesn’t appear within
          a few minutes, check your spam folder.
        </Text>
      ) : (
        <>
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
          {error && <Text status='danger'>{error.message}</Text>}
          <Button
            loading={isLoading}
            disabled={!formState.isValid || isLoading}
            block
            type='submit'
          >
            Send reset link
          </Button>
        </>
      )}
    </Auth>
  );
};

export default ForgotPassword;
