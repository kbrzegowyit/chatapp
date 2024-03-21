import { NextFunction, Request, Response } from "express";

export function routeNotFound(_req: Request, res: Response, _next: NextFunction) {
    res.status(404).render('404');
}