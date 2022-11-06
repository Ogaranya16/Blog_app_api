

import supertest from 'supertest'

describe('product', () => {
    describe("get articles route ", () => {

        describe('given the articles does not exist', () => {

            it("should return 404", async() => {
                const articleId = '6367e9609a0d14e09bb24801'

        await supertest().get('/api/articles/${articleId}.expect(400')
            })

        })
    })
})