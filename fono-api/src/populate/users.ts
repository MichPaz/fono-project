import { UserInput } from "../api/models/User";
import * as bcrypt from 'bcrypt';

export const users: UserInput[] = [
    {
        id: 1,
        email: 'lemoneres.lima@gmail.com',
        isValidEmail: true,
        password: bcrypt.hashSync('melhorsenha', 5),
        username: 'MichPaz'
    }
]