import * as authErrors from './errors';

export const isEmail = (email: string) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return email.match(regex);
};

const validate = (body: { email: string; password: string }) => {
  const { email, password } = body;
  if (!email) {
    return authErrors.EmailIsRequired;
  }

  if (!isEmail(email)) {
    return authErrors.ValidEmail;
  }

  if (!password) {
    return authErrors.PasswordIsRequired;
  }

  if (password.length < 8) {
    return authErrors.PasswordLength;
  }
};

export default validate;
