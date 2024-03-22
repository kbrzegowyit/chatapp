import { CreateUserLocalsDto, CreateUserOutputDto, DeleteUserLocalsDto, DeleteUserOutputDto, RetrieveUserLocalsDto, RetrieveUserOutputDto } from "../dtos/user.js";
import { IUserService } from "../services/user.js";

export interface IUserController {
    createUser(locals: CreateUserLocalsDto): Promise<CreateUserOutputDto>;
    retrieveUser(locals: RetrieveUserLocalsDto): Promise<RetrieveUserOutputDto | null>;
    deleteUser(locals: DeleteUserLocalsDto): Promise<DeleteUserOutputDto>;
}

export class UserController implements IUserController {
    constructor(private readonly userService: IUserService) {}

    public createUser = async (locals: CreateUserLocalsDto): Promise<CreateUserOutputDto> => {
        return this.userService.createUser(locals.body);
    }

    public retrieveUser = async (locals: RetrieveUserLocalsDto): Promise<RetrieveUserOutputDto | null> => {
        return this.userService.retrieveUserById(locals.params);
    }

    public deleteUser = async (locals: DeleteUserLocalsDto): Promise<DeleteUserOutputDto> => {
        return this.userService.deleteUser(locals.params);
    }
}