export interface AuthInputs {
  email: string;
  password: string;
}

export interface UpdateProfileInputs {
  file?: File;
  username?: string;
}

export type Error = {
  field: string;
  message: string;
};

export interface NewPasswordInputs {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface IError {
  error?: Error;
}

export interface CreateListInputs {
  name?: string;
  image?: string;
  description?: string;
  type?: string;
}
