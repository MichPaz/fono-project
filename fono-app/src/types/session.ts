export interface UserOutput {
    id: number
    username?: string
    email: string
    isValidEmail: boolean
}

export interface PersonAttributes {
    id: number
    userId?: number
    cpf: string
    name: string
    surname: string
    phoneNumber: string
    avatarPath?: string

    user?: UserOutput
}

export interface AdminAttributes extends PersonAttributes {
    id: number
    userId: number
    user?: UserOutput

    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export interface Session {
    token?: string
    user?: UserOutput
    admin?: AdminAttributes
}

export interface ISignIn {
    email: string;
    password: string;
}