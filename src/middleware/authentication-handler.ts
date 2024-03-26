import { NextFunction, Request, Response } from "express";
import { ISecureTokenService } from "../services/secure-token.js";
// Add error handling
export function authenticationHandler(secureTokenService: ISecureTokenService) {
     return async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const user = await secureTokenService.verifyToken(token);
            req.body.user = user;
            next();
            return;
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
};