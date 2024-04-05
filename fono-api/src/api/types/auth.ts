import { UserInput } from "../models/User";

export type LoginType = {
    email: string;
    password: string;
};

export type SignUpType = {
    user: UserInput
};
