import { body } from 'express-validator';

export const createCityValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .trim() // Remove space/spasi " Bekasi "
    .escape(), // Remove special characters " #, @, !, etc "
];
