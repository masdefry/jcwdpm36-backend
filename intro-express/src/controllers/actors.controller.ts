import { Request, Response } from 'express';
import pool from '../connection/pool.connection';

export async function postActorController(req: Request, res: Response) {
  try {
    const { firstName, lastName } = req.body;

    await pool.query(`insert into actor(first_name, last_name) values ($1, $2)`, [firstName, lastName]);

    res.status(201).json({
        success: true, 
        message: 'Create actor successfull', 
        data: {
            firstName, 
            lastName
        }
    })
  } catch (error) {
    console.log(error);
  }
}
