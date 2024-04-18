import ErroFonologico, { ErroFonologicoInput, ErroFonologicoInputUpdate, ErroFonologicoOutput } from '../models/ErroFonologico'

interface IErroFonologicoRepository {
    create(payload: ErroFonologicoInput): Promise<ErroFonologicoOutput>
    get(): Promise<ErroFonologicoOutput[]>
    getDetail(id: number): Promise<ErroFonologicoOutput | null>
    getByUser(userId: number): Promise<ErroFonologicoOutput | null>
    update(id: number, payload: ErroFonologicoInputUpdate): Promise<boolean>
    delete(id: number): Promise<boolean>
}

class ErroFonologicoRepository implements IErroFonologicoRepository {
    create(payload: ErroFonologicoInput): Promise<ErroFonologicoOutput> {
        return ErroFonologico.create({...payload})
    }

    get(): Promise<ErroFonologicoOutput[]> {
        return ErroFonologico.findAll({
            attributes: ['id', 'email', 'username', 'isValidEmail']
        })
    }

    getDetail(id: number): Promise<ErroFonologicoOutput | null> {
        return ErroFonologico.findByPk(id, {
            attributes: ['id', 'tipo_interacao', 'tipo_acao', 'realizado', 'idealizado'],
            // include: [
                // {
                //     model: Role,
                //     as: 'role',
                //     required: false
                // }
            // ]
        })
    }

    getByUser(userId: number): Promise<ErroFonologicoOutput | null> {
        return ErroFonologico.findOne({
            where: {
                userId
            }
        })
    }

    async update(
        userId: number,
        payload: ErroFonologicoInputUpdate
    ): Promise<boolean> {
        const [updatedErroFonologicoCount] = await ErroFonologico.update(payload, {
            where: {
                id: userId
            }
        })
        return !!updatedErroFonologicoCount
    }

    async delete(userId: number): Promise<boolean> {
        const deletedErroFonologicoCount = await ErroFonologico.destroy({
            where: {
                id: userId
            }
        })
        return !!deletedErroFonologicoCount
    }
}

export default new ErroFonologicoRepository()
