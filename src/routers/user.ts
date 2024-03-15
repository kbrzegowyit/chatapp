import { Router } from "express";
import { ApiParams, ApiRoutes } from "./constatns.js";
import { IUserController } from "../controllers/user.js";

export class UserRouter {
    public readonly router: Router;

    constructor(private readonly userController: IUserController) {
        this.router = Router();
        
        this.router.post(ApiRoutes.ROOT, async (req, res) => {
            const user = await this.userController.createUser(req, res);
            res.json(user);
        });

        this.router.get(ApiParams.ID, async (req, res) => {
            console.log('UserRouter.get:', req.params.id);
            const user = await this.userController.retrieveUser(req, res);
            console.log('UserRouter.get.user:', user);
            res.json(user);
        });
        
        this.router.delete(ApiParams.ID, async (req, res) => {
            const deletedId = await this.userController.deleteUser(req, res);
            res.json({ deletedId });
        });
    }
}