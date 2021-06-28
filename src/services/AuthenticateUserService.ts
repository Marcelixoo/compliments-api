import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { User } from "../entities/User";
import { AuthenticationError } from "../errors/AuthenticationError";
import { UsersRepository } from "../repositories/UsersRepository"

interface UserCredentials {
    email: string;
    password: string;
}

class AuthenticateUserService {
    usersRepository: UsersRepository;

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async authenticate({ email, password }: UserCredentials) {
        const user = await this.getUserWithEmail(email);

        await this.assertPasswordsMatch(password, user.password);

        const token = this.generateTokenForUser(user);

        return token;
    }

    private async getUserWithEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });

        if (!user) {
            throw new InvalidCredentials();
        }

        return user;
    }

    private async assertPasswordsMatch(passwordProvided: string, passwordFromUserWithEmailProvided: string) {
        const invalidPasswordGiven = ! await compare(passwordProvided, passwordFromUserWithEmailProvided);

        if (invalidPasswordGiven) {
            throw new InvalidCredentials();
        }
    }

    private generateTokenForUser(user: User) {
        return sign(
            { email: user.email },
            "e13fa72aa716245964705c1ab8d8692e",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );
    }
}

class InvalidCredentials extends AuthenticationError {
    constructor() {
        super("Invalid credentials provided.");
    }
}

export { AuthenticateUserService }