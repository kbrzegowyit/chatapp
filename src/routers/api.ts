import { Router } from "express";
import { ApiRoutes } from "./constatns.js";
import { UserRouter } from "./user.js";

export class ApiRouter {
    public readonly router: Router;

    constructor(private readonly userRouter: UserRouter) {
        this.router = Router();
        this.router.use(ApiRoutes.USERS, this.userRouter.router);
    }
}