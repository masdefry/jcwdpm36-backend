import { Request, Response } from 'express';
import { libraryService } from '../services/library.service';

export const libraryController = {
  async create(req: Request, res: Response) {
    const { address, phoneNumber } = req.body;

    await libraryService.create({address, phoneNumber})

    res.status(201).json({
      success: true,
      message: 'Create library branch success',
      data: {
        address,
        phoneNumber,
      },
    });
  },
};
