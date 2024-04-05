import * as dotenv from 'dotenv'
dotenv.config()

import { users } from "./users"
import { admins } from "./admins"
import { ocorrencias } from "./ocorrencias"
import AdminRepository from "../api/repositories/AdminRepository"
import UserRepository from "../api/repositories/UserRepository"
import ErroFonologicoRepository from "../api/repositories/ErroFonologico"

type PopulateData = {
    registers: any[]
    repository: any
    createFunction: string
}

const populateData: PopulateData[] = [
    {
        createFunction: 'create',
        registers: users,
        repository: UserRepository
    },
    {
        createFunction: 'create',
        registers: admins,
        repository: AdminRepository
    },
    {
        createFunction: 'create',
        registers: ocorrencias.map(e=>({...e, userId: 1})),
        repository: ErroFonologicoRepository
    },
]

export async function populate() {
    let count = 0
    let sum = 0
    for (const populateRule of populateData) {
        const { registers, repository, createFunction } = populateRule
        sum += registers.length
        for (const reg of populateRule.registers) {
            try {
                const result = await repository[createFunction](reg)
                if (result) count++
            } catch (err) {
                console.log('ERROR', err)
            }
        }
    }
    console.log(count + ' of ' + sum + ' registered')
}

populate()