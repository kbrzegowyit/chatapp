import { NextFunction, Request, RequestHandler, Response } from "express";

interface Callback {
    (...args: any[]): any;
};

export function authenticationControllerHandler(controller: Callback, statusCode: number = 200): RequestHandler {
    return async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const token = await controller(res.locals);
            res.cookie('token', token, { httpOnly: true });
            res.status(statusCode).send();
        } catch (error) {
            next(error);
        }
    };
    
}