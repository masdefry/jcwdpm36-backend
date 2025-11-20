import jwt, { SignOptions } from 'jsonwebtoken'

export async function createToken(
    payload: any, 
    secretKey: string, 
    options?: SignOptions
){
    return await jwt.sign(payload, secretKey, options)
}