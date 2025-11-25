import { NextFunction, Request, Response } from 'express';
import { routeService } from '../services/route.service';

export const routeController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const { departureCityId, destinationCityId } = req.body;

    await routeService?.create({ departureCityId, destinationCityId });

    res.status(201).json({
      success: true,
      message: 'Create route successfull',
      data: { departureCityId, destinationCityId },
    });
  },
};
