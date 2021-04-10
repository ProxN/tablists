export interface AuthInputs {
  email: string;
  password: string;
}

export interface IError {
  error?: {
    field: string;
    message: string;
  };
}
