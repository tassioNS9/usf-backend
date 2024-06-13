import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

/*type TokenPayload = {
    id: string;
    iat:number;
    exp:number;
}*/

export function AuthMiddlewares(
    request: Request,
    response: Response,
    next: NextFunction
){
   
    const  authToken = request.headers.authorization

    if(!authToken){
        return response.status(401).json({error : "Token nao oferecido!"})
    }

    const [, token] = authToken.split(" ");

    try{
       verify(token, process.env.SECRET);

        return next();
    }catch(error){
        return response.status(401).json({error: "Token invalido!"})
    }
}