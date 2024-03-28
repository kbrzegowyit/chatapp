import { CreateUserInputDto, CreateUserOutputDto, DeleteUserInputDto, DeleteUserOutputDto, RetrieveUserInputDto, RetrieveUserOutputDto } from "../dtos/user.js";
import { UserNotFound } from "../errors/user/UserNotFound.js";
import { User } from "../models/user.js";
import { IUserRepository } from "../repositories/user.js";

export interface IUserService {
    createUser(userInputDto: CreateUserInputDto): Promise<CreateUserOutputDto>;
    retrieveUserById(userInputDto: RetrieveUserInputDto): Promise<RetrieveUserOutputDto>;
    deleteUser(userInputDto: DeleteUserInputDto): Promise<DeleteUserOutputDto>;
}

export class UserService implements IUserService {
    constructor(private readonly userRepository: IUserRepository) {}
    
    public async createUser(userInputDto: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const user = User.build(userInputDto);
        const record = await this.userRepository.save(user);
        return { id: record.id, nick: record.nick };
    }

    public async retrieveUserById(userInputDto: RetrieveUserInputDto): Promise<RetrieveUserOutputDto> {
        const record = await this.userRepository.retrieveById(userInputDto.id);
        if (!record) throw new UserNotFound();
        return { id: record.id, nick: record.nick };
    }

    public async deleteUser(userInputDto: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
        const record = await this.userRepository.delete(userInputDto.id);
        return { id: record };
    }
}