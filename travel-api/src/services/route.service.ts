import { prisma } from '../config/prisma.client';
import { Route } from '../generated/prisma/client';

export const routeService = {
  async create({
    departureCityId,
    destinationCityId,
  }: Pick<Route, 'departureCityId' | 'destinationCityId'>) {
    await prisma.route.create({
      data: {
        departureCityId,
        destinationCityId,
      },
    });
  },
};
