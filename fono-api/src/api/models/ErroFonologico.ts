import { Request } from 'express';
import { Model, DataTypes, Optional } from 'sequelize';
import { db } from '../../database/config';
import { UserOutput } from './User';
import Desvios from './Desvios';
import appConfig from '../../config/appConfig';
// import fetch from 'node-fetch';
// import {Agent} from 'http'

// const fetch = () => import('node-fetch').then(({default: fetch}) => fetch(...args));

type TipoIteracao = 'entrada' | 'saida'
type TipoAcao = 'escrevi' | 'cantei' | 'li' | 'compreendi' | 'escutei'

interface ErroFonologicoAttributes {
    id: number
    tipo_interacao: TipoIteracao
    tipo_acao: TipoAcao
    errado: string
    idealizado: string
    desvios: Desvios[]
    userId?: number
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date

    user?: UserOutput
}

export type ErroFonologicoInput = Optional<ErroFonologicoAttributes, 'id'>
export type ErroFonologicoInputUpdate = Optional<
    ErroFonologicoAttributes,
    'id'
>;
export type ErroFonologicoOutput = ErroFonologicoAttributes

class ErroFonologico extends Model<ErroFonologicoAttributes, ErroFonologicoInput> implements ErroFonologicoAttributes {
    public id!: number
    public tipo_interacao!: TipoIteracao
    public tipo_acao!: TipoAcao
    public errado!: string
    public idealizado!: string
    public desvios: Desvios[] = []
    public userId!: number

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
    public readonly deletedAt!: Date

    async makeDesvios() {
        const url = appConfig.comp.domain + '/comparacao'
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            },
            data: {
                errado: this.errado,
                idealizado: this.idealizado
            }
        };


        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error('error:' + err));


        try {
            const res = await fetch(url, options);
            const json = await res.json();
            console.log('json :', json);
        } catch (err) {
            console.log(err);
        }

        // const comp = await mockAxios.get(, {
        //     data: {
        //         errado: this.errado,
        //         idealizado: this.idealizado
        //     }
        // })
        // console.log("comp: ", comp)
    }
}

ErroFonologico.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_interacao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo_acao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        errado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idealizado: {
            type: DataTypes.STRING,
            allowNull: false
        },
        desvios: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        modelName: 'erro_fonologico',
        tableName: 'erros_fonologicos',
        freezeTableName: true,
        timestamps: true,
        paranoid: true,
        sequelize: db
    }
);

// ErroFonologico.belongsTo(User, {
//     foreignKey: 'userId',
//     as: 'user'
// });

export default ErroFonologico;
