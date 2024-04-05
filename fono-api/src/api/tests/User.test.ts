import * as bcrypt from 'bcrypt'
import AdminRepository from '../repositories/AdminRepository'
import { AdminInput, AdminInputUpdate, AdminOutput } from '../models/Admin'
import UserRepository from '../repositories/UserRepository'
import { RESPONSE_MESSSAGES } from '../../constants/messages'
import User from '../models/User'
import { UserInput } from '../models/User';
import { PersonInput } from '../models/Person';

const emailDomains = ['gmail', 'hotmail', 'outlook', 'batata', 'teste', 'lidxs']

const getRandomText = ()=> (Math.random() + 1).toString(36).substring(7)
const getRandomTextNumeric = (size: Number)=> Object.keys(new Array(size)).concat()

interface configRunUserCRUD {
    names: string[]
    surnames: string[]
    cities: string[]
    streets: string[]
    size: number
}

interface UserTest {
    runUserCRUD(config: configRunUserCRUD): void
}

class UserTest implements UserTest {

    // newRandomUser(keys?: Array<keyof UserInput>): Partial<UserInput> {
    //     const userKeyGenerator = {
    //         username: getRandomText,
    //         email: () => userKeyGenerator.username + '@' + emailDomains[emailDomains.length] + '.com',
    //         isValidEmail: () => false,
    //         password: getRandomText,
    //     }
    //     let AuxUser:any = {}
    //     if(keys !==undefined){
    //         for(const key of keys){
    //             if(key in Object.keys(userKeyGenerator)){
    //                 AuxUser[key] = userKeyGenerator[key as keyof typeof userKeyGenerator]
    //             }
    //         }
    //         const user:UserInput = AuxUser
    //         return user
    //     }else{
    //         for(const [key, value] of Object.entries(userKeyGenerator)){
    //             AuxUser[key] = value()
    //         }
    //         const user:UserInput = AuxUser

    //         return user
    //     }
    // }

    // newRandomPerson(keys?: Array<keyof PersonInput >): Partial<PersonInput> {
    //     const personKeyGenerator: PersonInput = {
            
    //         cpf: getRandomTextNumeric(11),
    //         // PAREI AQUI NESSA LINHA OH
    //         name: () => personKeyGenerator.name + '@' + emailDomains[emailDomains.length] + '.com',
    //         surname: () => false,
    //         phoneNumber: getRandomText,
    //     }
    //     let AuxUser:any = {}
    //     if(keys !==undefined){
    //         for(const key of keys){
    //             if(key in Object.keys(personKeyGenerator)){
    //                 AuxUser[key] = personKeyGenerator[key as keyof typeof personKeyGenerator]
    //             }
    //         }
    //         const user:UserInput = AuxUser
    //         return user
    //     }else{
    //         for(const [key, value] of Object.entries(personKeyGenerator)){
    //             AuxUser[key] = value()
    //         }
    //         const user:UserInput = AuxUser

    //         return user
    //     }
    // }

    // async create(payload: AdminInput): Promise<AdminOutput> {
        
    // }

    // get(): Promise<AdminOutput[]> {
    //     return AdminRepository.get()
    // }

    // async getDetail(adminId: number): Promise<AdminOutput> {

    // }

    // async update(
    //     adminId: number,
    //     payload: AdminInputUpdate
    // ): Promise<boolean> {

    // }

    // async delete(adminId: number): Promise<boolean> {

    // }
}

export default new UserTest()
