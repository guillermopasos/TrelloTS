import dotenv from 'dotenv';
dotenv.config();

export const CREDENTIALS = {
    username: process.env.TRELLO_USERNAME,
    password: process.env.TRELLO_PASSWORD,
}

export const URLS = {
    baseURL: process.env.BASE_URL
}

export const CARD_DATA = {
    listName : {
        toDo: 'To Do',
        doing: 'Doing',
       done: 'Done'
    },
    cardTitle: 'This is a test card'

}