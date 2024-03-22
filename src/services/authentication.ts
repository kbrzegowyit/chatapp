import { LoginUserInputDto, LoginUserOutputDto, RegisterUserInputDto, RegisterUserOutputDto } from "../dtos/authentication.js";
import { IUserRepository } from "../repositories/user.js";

export interface IAuthenticationService {
    login(loginInputDto: LoginUserInputDto): Promise<LoginUserOutputDto>;
    register(registerInputDto: RegisterUserInputDto): Promise<RegisterUserOutputDto>;
}

export class AuthenticationService implements IAuthenticationService {
    constructor(private readonly userRepository: IUserRepository) {}
    
    public async login(loginInputDto: LoginUserInputDto): Promise<LoginUserOutputDto> {
        console.log("User input DTO: ", loginInputDto, typeof this.userRepository);
        return <any>{};
    }

    public async register(registerInputDto: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        console.log("User input DTO: ", registerInputDto, typeof this.userRepository);
        return <any>{};
    }
}