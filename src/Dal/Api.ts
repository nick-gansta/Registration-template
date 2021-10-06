import axios from 'axios';
import { RegistrationFormType } from '../Pages/Registration/Registration';

const createInstance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true
})


export const registerApi = {
    register(data: RegistrationFormType) {
        return createInstance.post<any>('auth/register', data)
    },
    setNewPassword(password: string, resetPasswordToken: string) {
        return createInstance.post<ResponseSetNewPassword>(`auth/set-new-password`, {password, resetPasswordToken})
    },
    passwordRecovery(email: string, from: string, message: string) {
        return createInstance.post<ResponseSetNewPassword>(`auth/forgot`, {email, from, message})
    },
}


export const api = {
    inLogin(email: string, password: string, rememberMe: boolean) {
        return createInstance.post('auth/login', {email, password, rememberMe})
    },
    inLogout() {
        return createInstance.delete('auth/me')
    },
    authMe() {
        return createInstance.post('auth/me', {}).then(res => res)
    },
    changeNameOrAvatar(payload: { name: string, avatar: string }) {
        return createInstance.put(`auth/me`, payload)
    },
}
export const apiPacksCards = {
    getPacks(min?: number) {
        return createInstance.get(`cards/pack?&pageCount=10&min=${min}`)
    },getPacksTest(value?: string,currentPage?:number, pageCount?: number ,min?: number,userID?: string) {
        return createInstance.get(`cards/pack?page=${currentPage}&pageCount=${pageCount}&min=${min}`, {params: {packName: value}})
    },
    addedPack(name: string) {
        return createInstance.post('cards/pack', {cardsPack: {name}})
    },
    deletePack(id: string) {
        return createInstance.delete(`cards/pack?id=${id}`)
    },
    changedPack(name: string, _id: string) {
        return createInstance.put('cards/pack', {cardsPack: {name, _id}})
    },
    getPackPrivatePaginatod(user_id: string,currentPage?:number, pageCount?: number ,min?: number) {
        return createInstance.get(`cards/pack?page=${currentPage}&pageCount=${pageCount}&min=${min}`, {
            params: {
                user_id: user_id,
            }
        })
    },
    searchByName(value: string,currentPage?:number, pageCount?: number ,min?: number,userID?: string) {
        return createInstance.get(`cards/pack?page=${currentPage}&pageCount=${pageCount}&min=${min}`, {params: {packName: value}})
    }
}

export const packsListHelperUtils = {
    searchByName(value: string) {
        return createInstance.get(`cards/pack`, {params: {packName: value, pageCount: 13}})
    },
}

export const apiCards = {
    getCards(packId: string) {
        return createInstance.get(`cards/card?cardsPack_id=${packId}&pageCount=10`)
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        return createInstance.post('cards/card', {card: {cardsPack_id, question, answer}})
    },
    deleteCard(packId: string) {
        return createInstance.delete(`cards/card?id=${packId}`,)
    },
    changeCard(_id: string, question: string, answer: string) {
        return createInstance.put('cards/card', {card: {_id, question, answer}})
    },
    updRaiting(grade: number, card_id: string) {
        return createInstance.put<any>('cards/grade', {grade , card_id})
    }
}

//type
type ResponseSetNewPassword = {
    info: string
    error: string
}
type UpdatedGradeType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}