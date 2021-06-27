import { getCustomRepository } from "typeorm";
import { BusinessRuleViolation } from "../errors/BusinessRuleViolation";
import { ValidationError } from "../errors/ValidationError";
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
        this.assertEmailIsNotEmpty(email);

        const emailIsAlreadyTaken = await this.usersRepository.findOne({ email })

        if (emailIsAlreadyTaken) {
            throw new EmailHasAlreadyBeenTaken(email);
        }
    }

    assertEmailIsNotEmpty(email: string) {
        if (!email) {
            throw new ValidationError("Field is required.", "email");
        }
    }
}

class EmailHasAlreadyBeenTaken extends BusinessRuleViolation {
    fieldName: string;

    constructor(email: string) {
        super(`The e-mail ${email} has already been taken.`);
    }
}

export { CreateUserService }