import transporter from '../utils/transporter-emailer';
import path from 'path';
import fs from 'fs';
import Handlebars from 'handlebars';

export const mailService = {
  async sendMail(
    email: string, 
    dirName: string, 
    fileName: string, 
    replacements: any
  ) {
    const templateDir = path.resolve(__dirname, dirName);

    const templatePath = path.join(templateDir, fileName);

    const templateSource = fs.readFileSync(templatePath, 'utf-8');

    const templateCompiled = Handlebars.compile(templateSource);

    const template = templateCompiled(replacements);

    await transporter.sendMail({
      from: 'Travel App',
      to: email,
      subject: 'Email Verification',
      html: template,
    });
  },
};
