declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    NODE_ENV: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASS: string;
    DB_USER: string;
    DB_NAME_TEST: string;
    SESSION_SECRET: string;
    MAIL_HOST: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    CLOUDINARY_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_SECRET: string;
  }
}
