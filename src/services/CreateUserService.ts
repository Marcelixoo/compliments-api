import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository"

interface ICreateUserRequest {
    name: string;
    email: string;
    admin?: boolean;
}

class CreateUserService {

    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async execute({ name, email, admin }: ICreateUserRequest) {
        await this.assertEmailIsNotYetTaken(email);

        const user = this.usersRepository.create({ name, email, admin });

        await this.usersRepository.save(user);

        return user;
    }

    async assertEmailIsNotYetTaken(email: string) {
        if (!email) {
            throw new Error("The e-mail address must be provided.");
        }

        const emailIsAlreadyTaken = await this.usersRepository.findOne({ email })

        if (emailIsAlreadyTaken) {
            throw new Error(`The email ${email} is already taken.`);
        }
    }
}

export { CreateUserService }