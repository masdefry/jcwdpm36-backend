import { Request, Response } from 'express';
import { vehicleService } from '../services/vehicle.service';

export const vehicleController = {
  async create(req: Request, res: Response) {
    const { type, totalSeat } = req.body;

    let files: Express.Multer.File[] =
      (req.files as Record<string, Express.Multer.File[]>).vehicleImages || [];

    const {vehicleId} =  await vehicleService.create({ type, totalSeat }, files);

    res.status(201).json({
      success: true,
      message: 'Create vehicle and vehicle images successfull',
      data: {
        vehicleId, 
        type,
        totalSeat,
      },
    });
  },
};
