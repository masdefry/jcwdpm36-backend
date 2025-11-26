import nodemailer from 'nodemailer';
import { GOOGLE_APP_ACCOUNT, GOOGLE_APP_PASSWORD } from '../config/index.config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GOOGLE_APP_ACCOUNT,
    pass: GOOGLE_APP_PASSWORD,
  },
});

export default transporter;
