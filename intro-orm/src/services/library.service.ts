import prisma from '../config/prisma.client';
import { LibraryBranch } from '../generated/prisma/client';

export const libraryService = {
  async create({
    address, 
    phoneNumber
  }: Pick<LibraryBranch, 'address' | 'phoneNumber'>) {
    await prisma.libraryBranch.create({
      data: {
        address,
        phoneNumber,
      },
    });
  },
};
