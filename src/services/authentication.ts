import { LoginUserInputDto, LoginUserOutputDto, RegisterUserInputDto, RegisterUserOutputDto } from "../dtos/authentication.js";
import { User } from "../models/user.js";
import { IUserRepository } from "../repositories/user.js";
import { ISecureCryptService } from "./sercure-crypt.js";
import { UserAttributes } from "../dtos/constants.js";
import { ISecureTokenService } from "./secure-token.js";

export interface IAuthenticationService {
    login(loginInputDto: LoginUserInputDto): Promise<LoginUserOutputDto>;
    register(registerInputDto: RegisterUserInputDto): Promise<RegisterUserOutputDto>;
}

export class AuthenticationService implements IAuthenticationService {
    constructor(
        private readonly userRepository: IUserRepository, 
        private readonly secureCryptService: ISecureCryptService, 
        private readonly secureTokenService: ISecureTokenService,
    ) {}
    
    public async login(loginInputDto: LoginUserInputDto): Promise<LoginUserOutputDto> {
        const user = await this.userRepository.findByNick(loginInputDto.nick);
        if (!user) throw new Error("User not found");

        const isPasswordValid = await this.secureCryptService.comparePassword(loginInputDto.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");
        
        const token = await this.secureTokenService.generateToken<User>(user);
        
        return token;
    }

    public async register(registerInputDto: RegisterUserInputDto): Promise<RegisterUserOutputDto> {
        const userExists = await this.checkIfUserExists(registerInputDto.nick);
        if (userExists) throw new Error("User already exists");

        const passwordsMatch = await this.checkIfPasswordsMatch(registerInputDto.password, registerInputDto.confirmPassword);
        if (!passwordsMatch) throw new Error("Passwords do not match");

        const hashedPassword = await this.secureCryptService.hashPassword(registerInputDto.password);
        const user = User.build({ nick: registerInputDto.nick, password: hashedPassword });
        const record = await this.userRepository.save(user);
        
        const token = await this.secureTokenService.generateToken<User>(record);

        return token;
    }

    private async checkIfUserExists(nick: UserAttributes['nick']): Promise<boolean> {
        const user = await this.userRepository.findByNick(nick);
        return !!user;
    }

    private async checkIfPasswordsMatch(password: UserAttributes['password'], confirmPassword: UserAttributes['password']): Promise<boolean> {
        return password === confirmPassword;
    }
}