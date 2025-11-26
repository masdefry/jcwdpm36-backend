import { prisma } from '../config/prisma.client';
import { Vehicle } from '../generated/prisma/client';

export const vehicleService = {
  async create(
    req: Pick<Vehicle, 'type' | 'totalSeat'>,
    files: Express.Multer.File[]
  ) {
    return await prisma.$transaction(async (tx) => {
      const createdVehicle = await tx.vehicle.create({
        data: {
          type: req.type,
          totalSeat: Number(req.totalSeat),
        },
      });

      const vehicleImagesToCreate = files?.map((file: Express.Multer.File) => {
        return { vehicleId: createdVehicle?.id, imageUrl: file?.filename };
      });

      /*
            [
                { vehicleId: ..., imageUrl: fileName }
            ]
        */
      await tx.vehicleImage.createMany({
        data: vehicleImagesToCreate,
      });

      return {
        vehicleId: createdVehicle?.id 
      }
    });
  },
};
