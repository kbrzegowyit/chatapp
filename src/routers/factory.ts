import { IControllerFactory } from "../controllers/factory.js";
import { IServiceFactory } from "../services/factory.js";
import { ApiRouter } from "./api.js";
import { AuthenticationRouter } from "./authentication.js";
import { UserRouter } from "./user.js";
import { ViewRouter } from "./view.js";

export interface IRouterFactory {
    viewRouter: ViewRouter;
    apiRouter: ApiRouter;
    authenticationRouter: AuthenticationRouter;
}

export class RouterFactory {
    public factory: IRouterFactory;

    constructor(private readonly controllerFactory: IControllerFactory, private readonly serviceFactory: IServiceFactory) {
        const viewRouter = new ViewRouter(this.serviceFactory.secureTokenService);
        const authenticationRouter = new AuthenticationRouter(this.controllerFactory.authenticationController);
        const userRouter = new UserRouter(this.controllerFactory.userController);
        const apiRouter = new ApiRouter(userRouter);

        this.factory = {
            viewRouter,
            apiRouter,
            authenticationRouter,
        };
    }
    
}