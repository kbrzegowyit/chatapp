import { Router } from "express";
import { ApiRoutes } from "./constatns.js";
import { IAuthenticationController } from "../controllers/authentication.js";
import { requestValidator } from "../middleware/request-validator.js";
import { AUTHENTICATION_SCHEMA } from "../schemas/authentication.js";
import { authenticationControllerHandler } from "../middleware/authentication-controller-handler.js";

export class AuthenticationRouter {
    public readonly router: Router;

    constructor(private readonly authenticationController: IAuthenticationController) {
        this.router = Router();
        this.router.post(ApiRoutes.LOGIN, requestValidator(AUTHENTICATION_SCHEMA.LOGIN), authenticationControllerHandler(this.authenticationController.login, 200));
        this.router.post(ApiRoutes.REGISTER, requestValidator(AUTHENTICATION_SCHEMA.REGISTER), authenticationControllerHandler(this.authenticationController.register, 201));
    }
}