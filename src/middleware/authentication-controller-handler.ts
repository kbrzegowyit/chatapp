import { NextFunction, Request, RequestHandler, Response } from "express";

interface Callback {
    (...args: any[]): any;
};

export function authenticationControllerHandler(controller: Callback, statusCode: number = 201): RequestHandler {
    return async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await controller(res.locals);
            res.status(statusCode).json({ token });
        } catch (error) {
            next(error);
        }
    };
    
}