import { NextFunction, Request, Response } from "express";

export function verifyRole(acceptedRole: string[]){
    return (req: Request, res: Response, next: NextFunction) => {
        const paylaod = res?.locals?.payload;

        if(acceptedRole.includes(paylaod.role)){
            next()
        }else{
            throw new Error('Unauthorized user')
        }
    }
}