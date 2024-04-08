import {expect, test} from "@playwright/test";
import { CARD_DATA } from "../../front-end/data/constants";
import { RequestUtils } from "../data/request-utils";

test.describe.serial('API Trello CRUD', ()=>{

    let cardId: String
    test('Create a card', async ({ request }) => {
        const reqUtils = new RequestUtils(request)
        cardId = await reqUtils.createACard(CARD_DATA.cardTitle);
    })

    test('Get a card', async ({ request }) => {
        const reqUtils = new RequestUtils(request)
        expect(await reqUtils.getACard(cardId)).toBeOK()
    })

    test('Edit a card', async ({ request }) => {
        const reqUtils = new RequestUtils(request)
        console.log(await reqUtils.editACard(cardId, CARD_DATA.editedCardTitle))
    })

    test('Delete a card', async ({ request }) => {
        const reqUtils = new RequestUtils(request)
        expect(await reqUtils.deleteACard(cardId)).toBeOK()
    })

    test('Delete all cards in list', async ({ request }) => {
        const reqUtils = new RequestUtils(request)
        expect(await reqUtils.deleteAllCardsInList(CARD_DATA.idList)).toBeOK()
    })
})
