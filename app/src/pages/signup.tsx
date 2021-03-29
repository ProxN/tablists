import Auth from '@components/Template/Auth';
import Button from '@components/Elements/Button';
import Input from '@components/Elements/Input';

const Signup = () => {
  return (
    <Auth title='Create new account' page='signup'>
      <Input placeholder='email' />
      <Input placeholder='password' />
      <Button block>Create new acconut</Button>
    </Auth>
  );
};

export default Signup;
