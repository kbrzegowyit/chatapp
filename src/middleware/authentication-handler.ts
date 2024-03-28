import { NextFunction, Request, Response } from "express";
import { ISecureTokenService } from "../services/secure-token.js";
import { TokenNotFound } from "../errors/authentication/TokenNotFound.js";

export function authenticationHandler(secureTokenService: ISecureTokenService) {
     return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            const token = req.cookies.token;
            
            if (!token) {
                throw new TokenNotFound();
            }

            const user = secureTokenService.verifyToken(token);
            req.body.user = user;
            next();
        } catch (error) {
            next(error);
        }
    }
};