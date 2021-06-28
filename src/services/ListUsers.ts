import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"

class ListUsers {
    async execute() {
        const usersRepository = getCustomRepository(UsersRepository);

        const users = usersRepository.find();

        return classToPlain(users);
    }
}

export { ListUsers }