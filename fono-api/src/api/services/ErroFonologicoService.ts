import * as bcrypt from 'bcrypt'
import ErroFonologicoRepository from '../repositories/ErroFonologico'
import { ErroFonologicoInput, ErroFonologicoInputUpdate, ErroFonologicoOutput } from '../models/ErroFonologico'
import { RESPONSE_MESSSAGES } from '../../constants/messages'

interface IErroFonologicoService {
    create(payload: ErroFonologicoInput): Promise<ErroFonologicoOutput>
    get(): Promise<ErroFonologicoOutput[]>
    getDetail(userId: number): Promise<ErroFonologicoOutput>
    update(userId: number, data: ErroFonologicoInputUpdate): Promise<boolean>
    delete(userId: number): Promise<boolean>
}

class ErroFonologicoService implements IErroFonologicoService {
    async create(payload: ErroFonologicoInput): Promise<ErroFonologicoOutput> {
        return ErroFonologicoRepository.create({
            ...payload,
        })
    }

    get(): Promise<ErroFonologicoOutput[]> {
        return ErroFonologicoRepository.get()
    }

    async getDetail(userId: number): Promise<ErroFonologicoOutput> {
        const user = await ErroFonologicoRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('ErroFonologico'))
        }

        return user
    }

    async update(
        userId: number,
        payload: ErroFonologicoInputUpdate
    ): Promise<boolean> {
        const user = await ErroFonologicoRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('ErroFonologico'))
        }

        return ErroFonologicoRepository.update(userId, payload)
    }

    async delete(userId: number): Promise<boolean> {
        const user = await ErroFonologicoRepository.getDetail(userId)

        if (!user) {
            throw new Error(RESPONSE_MESSSAGES.NOT_FOUNT('ErroFonologico'))
        }

        return ErroFonologicoRepository.delete(userId)
    }
}

export default new ErroFonologicoService()
