import Auth from '@components/Template/Auth';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';

const Signin = () => {
  return (
    <Auth title='Sign in'>
      <Input placeholder='email' />
      <Input placeholder='password' />
      <Button block>Sign in</Button>
    </Auth>
  );
};

export default Signin;
