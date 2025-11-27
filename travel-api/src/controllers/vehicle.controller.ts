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

  async getAll(req: Request, res: Response){
    const vehicles = await vehicleService.getAll()

    res.status(200).json({
      success: true, 
      message: 'Get vehicles successfull', 
      data: {
        vehicles, 
        imagePath: 'src/uploads'
      }
    })
  }
};
