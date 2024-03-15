import { IControllerFactory } from "../controllers/factory.js";
import { ApiRouter } from "./api.js";
import { UserRouter } from "./user.js";
import { ViewRouter } from "./view.js";

export interface IRouterFactory {
    viewRouter: ViewRouter;
    apiRouter: ApiRouter;
}

export class RouterFactory {
    public factory: IRouterFactory;

    constructor(private readonly controllerFactory: IControllerFactory) {
        const userRouter = new UserRouter(this.controllerFactory.userController);
        const viewRouter = new ViewRouter();
        const apiRouter = new ApiRouter(userRouter);

        this.factory = {
            viewRouter,
            apiRouter
        };
    }
    
}