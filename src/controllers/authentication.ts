import { LoginUserLocalsDto, LoginUserOutputDto, RegisterUserLocalsDto, RegisterUserOutputDto } from "../dtos/authentication.js";
import { IAuthenticationService } from "../services/authentication.js";

export interface IAuthenticationController {
    login(locals: LoginUserLocalsDto): Promise<LoginUserOutputDto>;
    register(locals: RegisterUserLocalsDto): Promise<RegisterUserOutputDto>;
}

export class AuthenticationController implements IAuthenticationController{
    constructor(private readonly authenticationService: IAuthenticationService) {}

    public login = async (locals: LoginUserLocalsDto): Promise<LoginUserOutputDto> => {
        return this.authenticationService.login(locals.body);
    }

    public register = async (locals: RegisterUserLocalsDto): Promise<RegisterUserOutputDto> => {
        return this.authenticationService.register(locals.body);
    }
}