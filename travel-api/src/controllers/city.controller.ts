import { Request, Response } from 'express';
import { cityService } from '../services/city.service';

export const cityController = {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    await cityService.create({ name });

    res.status(201).json({
      success: true,
      message: 'Create city successfull',
      data: {
        name,
      },
    });
  },

  async getAll(_: Request, res: Response) {
    const cities = await cityService.getAll();

    res.status(200).json({
      success: true,
      message: 'Get all city successfull',
      data: cities,
    });
  },
};
