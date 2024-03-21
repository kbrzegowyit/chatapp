import { Router } from "express";
import { ApiParams, ApiRoutes } from "./constatns.js";
import { IUserController } from "../controllers/user.js";
import { requestValidator } from "../middleware/request-validator.js";
import { USER_SCHEMA } from "../schemas/user.js";
import { controllerHandler } from "../middleware/controller-handler.js";

export class UserRouter {
    public readonly router: Router;

    constructor(private readonly userController: IUserController) {
        this.router = Router();
        
        this.router.post(ApiRoutes.ROOT, requestValidator(USER_SCHEMA.CREATE), controllerHandler(this.userController.createUser, 201));

        this.router.get(ApiParams.ID, requestValidator(USER_SCHEMA.RETRIEVE), controllerHandler(this.userController.retrieveUser, 200));
        
        this.router.delete(ApiParams.ID, requestValidator(USER_SCHEMA.DELETE), controllerHandler(this.userController.deleteUser, 204));
    }
}