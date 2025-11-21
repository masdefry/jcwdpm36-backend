import { prisma } from '../config/prisma.client';
import { City } from '../generated/prisma/client';

export const cityService = {
  async create({ name }: Pick<City, 'name'>) {
    await prisma.city.create({
        data: {
            name  
        }
    })
  },
};
