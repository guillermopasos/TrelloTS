import dotenv from 'dotenv';
dotenv.config();

export const CREDENTIALS = {
    username: process.env.TRELLO_USERNAME,
    password: process.env.TRELLO_PASSWORD,
    token: process.env.TOKEN,
    key: process.env.KEY,
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
    cardTitle: 'Isashiburitaneeeee Garaxto Kun',
    editedCardTitle:'This is a test for edited name',
    idList:'6610411bb2718989304cc9e0',

}