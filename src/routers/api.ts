import { Router } from "express";
import { ApiRoutes, DefaultRoutes } from "./constatns.js";
import { UserRouter } from "./user.js";

export class ApiRouter {
    public readonly router: Router;

    constructor(private readonly userRouter: UserRouter) {
        this.router = Router();
        this.router.use(ApiRoutes.USERS, this.userRouter.router);
        this.router.use(DefaultRoutes.OTHERS, (_req, res) => {
            res.status(404).json({ message: 'Not found' })
        });
    }
}