import { prisma } from '../config/prisma.client';
import { Vehicle } from '../generated/prisma/client';
import { cloudinaryUpload } from '../utils/cloudinary';

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

      // IF USING DISK STORAGE
      // const vehicleImagesToCreate = files?.map((file: Express.Multer.File) => {
      //   return { vehicleId: createdVehicle?.id, imageUrl: file?.filename };
      // });

      // await tx.vehicleImage.createMany({
      //   data: vehicleImagesToCreate,
      // });

      // IF USING MEMORY STORAGE & CLOUDINARY
      const vehicleImagesToCreate: any = [];

      for (const file of files!) {
        const response: any = await cloudinaryUpload(file.buffer);
        vehicleImagesToCreate?.push({
          vehicleId: createdVehicle?.id,
          imageUrl: response?.secure_url,
        });
      }
      
      await tx.vehicleImage.createMany({
        data: vehicleImagesToCreate,
      });

      return {
        vehicleId: createdVehicle?.id,
      };
    });
  },

  async getAll() {
    return await prisma.vehicle.findMany({
      include: {
        vehicleImages: true,
      },
    });
  },
};
