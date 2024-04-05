import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import User, { UserOutput } from './User';

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

export type PersonInput = Optional<PersonAttributes, 'id' | 'name'>;
export type PersonInputUpdate = Optional<
    PersonAttributes,
    'id' | 'name' | 'surname' | 'phoneNumber'
>;
export type PersonOutput = Optional<PersonAttributes, 'name'>;

class Person extends Model<PersonAttributes, PersonInput> implements PersonAttributes {
    id!: number
    name!: string
    userId!: number
    surname!: string
    cpf!: string
    phoneNumber!: string
    avatarPath?: string

    user?: UserOutput

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date
}

Person.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        surname: {
            type: DataTypes.STRING
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: true
        },
        avatarPath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        tableName: 'persons',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        sequelize: db
    }
);

Person.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export default Person;
