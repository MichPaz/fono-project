import { FindOptions, Model } from 'sequelize';

interface IPersonRepository<Toutput> {
    getByUserId(userId: number): Promise<Toutput | null>;
    getByCPF(cpf: string): Promise<Toutput | null>;
    getByPhoneNumber(phoneNumber: string): Promise<Toutput | null>;
}

interface GenericModel<Toutput> {
    findOne(options: FindOptions): Promise<Toutput | null>
}

export class PersonRepository<Toutput> implements IPersonRepository<Toutput> {

    public genericModel!: GenericModel<Toutput>

    constructor(genericModel: GenericModel<Toutput>) {
        this.genericModel = genericModel
    }

    getByUserId(userId: number): Promise<Toutput | null> {
        return this.genericModel.findOne({
            where: {
                userId
            }
        });
    }


    getByCPF(cpf: string): Promise<Toutput | null> {
        return this.genericModel.findOne({
            where: {
                cpf
            }
        });
    }

    getByPhoneNumber(phoneNumber: string): Promise<Toutput | null> {
        return this.genericModel.findOne({
            where: {
                phoneNumber
            }
        });
    }

}