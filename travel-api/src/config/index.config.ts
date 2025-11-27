import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

export const JWT_SECRET_KEY_AUTH = process.env.JWT_SECRET_KEY_AUTH;
export const WHITELIST = [process.env.CLIENT_URL];
export const NEXT_AUTH_SECRET_KEY = process?.env?.NEXT_AUTH_SECRET_KEY;
export const GOOGLE_APP_PASSWORD = process.env.GOOGLE_APP_PASSWORD;
export const GOOGLE_APP_ACCOUNT = process.env.GOOGLE_APP_ACCOUNT;
export const LINK_EMAIL_VERIFICATION = process.env.LINK_EMAIL_VERIFICATION
export const JWT_SECRET_KEY_EMAIL_VERIFICATION = process.env.JWT_SECRET_KEY_EMAIL_VERIFICATION
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;