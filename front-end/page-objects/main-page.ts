import {Locator, Page, expect} from '@playwright/test'

export class MainBoard{ // Exporting class in order to use it across the tests.
    // Locators are all in the constructor to optimize centralization and good practices.
    readonly page: Page
    readonly landingPageLabel: Locator
    readonly testBoard: Locator
    readonly listTitleNames: Locator
    readonly addCardButton: Locator
    readonly cardTitleInput: Locator
    readonly cardSubmitButton: Locator
    readonly cardList: Locator
    readonly threeDotsMenu: Locator
    readonly archiveAllCardsOption: Locator
    readonly submitArchiveAllButton: Locator

    constructor(page: Page){
        this.landingPageLabel =  page.getByRole('heading', { name: 'YOUR WORKSPACES' })
        this.testBoard =  page.locator("div[title='Test board']")
        this.listTitleNames = page.locator("li[data-testid='list-wrapper']")
        this.addCardButton = page.locator("button[data-testid='list-add-card-button']")
        this.cardTitleInput = page.locator("textarea[data-testid='list-card-composer-textarea']")
        this.cardSubmitButton = page.locator("button[type='submit']")
        this.cardList = page.locator("li[data-testid='list-card']")
        this.threeDotsMenu = page.locator("button[data-testid='list-edit-menu-button']")
        this.archiveAllCardsOption = page.locator('.js-archive-cards')
        this.submitArchiveAllButton = page.locator("input[value='Archive all']")
    }
    // Functions that perform actions. Function naming convention should be actions.
    async addACard(listName: string, cardTitle: string){
        await this.testBoard.click()
        await this.deteleAllTasks(listName)
        await this.listTitleNames.filter({hasText: listName}).locator(this.addCardButton).click();
        await this.cardTitleInput.fill(`${cardTitle}_${Date.now()}`)
        const cardName = await this.cardTitleInput.textContent()
        await this.cardSubmitButton.click()
        return cardName
        // await this.listTitleNames.filter({hasText: listName}).getByTestId('list-add-card-button').click();          //({hasText: listName}).textContent());
    }

    // Validar que la carta este al momento de crearse. 
    async assertCardAddedSuccessfully(listname: string, cardTitle: string){
        await expect(this.listTitleNames.filter({hasText: listname}).locator(this.cardList).filter({hasText:cardTitle})).toBeVisible() // Agregar assert de toBeVisible()
        //const addedCard = await this.listTitleNames.filter({hasText: listname}).locator(this.cardList).filter({hasText:cardTitle}).textContent(); // Agregar assert de toBeVisible()
        //await expect(addedCard).toEqual(cardTitle); // Este esta deprecado
    }

    async deteleAllTasks(listName: string){
        await this.listTitleNames.filter({hasText: listName}).locator(this.addCardButton).waitFor();
        await this.listTitleNames.filter({hasText: listName}).locator(this.threeDotsMenu).click();
        await this.archiveAllCardsOption.click();
        await this.submitArchiveAllButton.click();
    }
}