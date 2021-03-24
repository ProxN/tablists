import { createConnection } from 'typeorm';
import path from 'path';
import { entities } from './api';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env;

const connectDB = async () => {
  await createConnection({
    type: 'postgres',
    entities,
    logging: NODE_ENV !== 'production',
    synchronize: true,
    port: 5432,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASS,
    migrations: [path.join(__dirname, './migrations/*.ts')],
  }).then(() => console.log('DB CONNECTED SUCCESSFULY'));
};

export default connectDB;
