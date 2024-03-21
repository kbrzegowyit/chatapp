import { NextFunction, Request, RequestHandler, Response } from "express";

interface Callback {
    (...args: any[]): any;
};

export function controllerHandler(controller: Callback, statusCode: number = 200): RequestHandler {
    return async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await controller(res.locals);
            res.status(statusCode).json(result);
        } catch (error) {
            next(error);
        }
    };
    
}