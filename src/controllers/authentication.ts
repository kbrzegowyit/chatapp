import { LoginUserLocalsDto, RegisterUserLocalsDto, RegisterUserOutputDto } from "../dtos/authentication.js";
import { CreateUserOutputDto } from "../dtos/user.js";
import { IAuthenticationService } from "../services/authentication.js";

export interface IAuthenticationController {
    login(locals: LoginUserLocalsDto): Promise<CreateUserOutputDto>;
    register(locals: RegisterUserLocalsDto): Promise<CreateUserOutputDto>;
}

export class AuthenticationController implements IAuthenticationController{
    constructor(private readonly authenticationService: IAuthenticationService) {}

    public login = async (locals: LoginUserLocalsDto): Promise<CreateUserOutputDto> => {
        return this.authenticationService.login(locals.body);
    }

    public register = async (locals: RegisterUserLocalsDto): Promise<RegisterUserOutputDto> => {
        return this.authenticationService.register(locals.body);
    }
}