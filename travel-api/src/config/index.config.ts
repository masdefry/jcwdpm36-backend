import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const JWT_SECRET_KEY_AUTH = process.env.JWT_SECRET_KEY_AUTH;
