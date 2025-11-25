import { body } from 'express-validator';

export const createRouteValidator = [
  body('departureCityId')
    .notEmpty()
    .withMessage('Departure city id is required')
    .isString()
    .withMessage('Departure city id must be string')
    .trim()
    .escape(),

  body('destinationCityId')
    .notEmpty()
    .withMessage('Destination city id is required')
    .isString()
    .withMessage('Destination city id must be string')
    .trim()
    .escape()
    .custom((value, { req }) => {
      if (value === req.body.departureCityId) {
        throw new Error(
          'Destination city id must be different from departure city id'
        );
      }
      return true;
    }),
];
