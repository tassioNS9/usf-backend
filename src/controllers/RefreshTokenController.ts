import { Request, Response } from "express";
import {RefreshTokenRepository} from "../repositories/RefreshTokenRepository"


class RefreshTokenController{
    async handle(request: Request, response : Response){

        const { refresh_token} = request.body;

        const refreshTokenRepository = new RefreshTokenRepository();

        const token = await refreshTokenRepository.execute(refresh_token)

        return response.json(token)
    }
}

export { RefreshTokenController}