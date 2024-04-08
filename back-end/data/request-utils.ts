import { APIRequestContext, expect } from "@playwright/test";
import { CREDENTIALS,CARD_DATA, URLS } from "../../front-end/data/constants";

export class RequestUtils{
    readonly apiContext: APIRequestContext
    readonly baseUrl: String
    readonly key: String
    readonly token: String

    constructor(request: APIRequestContext){
        this.apiContext = request,
        this.baseUrl = URLS.baseURL as string
        this.key = CREDENTIALS.key as string
        this.token = CREDENTIALS.token as string
    }


    async createACard(name: String) {
        const createCardRequest = await this.apiContext.post(`${this.baseUrl}1/cards?idList=${CARD_DATA.idList}&key=${this.key}&token=${this.token}&name=${name}`)
        await expect(createCardRequest).toBeOK()
        const createCardRequestJSON = await createCardRequest.json();
        //console.log(createCardRequestJSON.id);
        return createCardRequestJSON.id
    }

    async getACard(id: String) {
        const getACard = await this.apiContext.get(`${this.baseUrl}1/cards/${id}?key=${this.key}&token=${this.token}`)
        return getACard
    }

    async editACard(id: String, name: String) {
        const editedCardName = await this.apiContext.put(`${this.baseUrl}1/cards/${id}?key=${this.key}&token=${this.token}&name=${name}`)
        await expect(editedCardName).toBeOK();
        const editedCardNameJSON = await editedCardName.json();
        return editedCardNameJSON.name
    }

    async deleteACard(id: String) {
        const response = await this.apiContext.delete(`${this.baseUrl}1/cards/${id}?key=${this.key}&token=${this.token}`)
        return response
    }

    async deleteAllCardsInList(listId: String) {
        const response = await this.apiContext.post(`${this.baseUrl}1/lists/${listId}/archiveAllCards?key=${this.key}&token=${this.token}`)
        return response
    }
}