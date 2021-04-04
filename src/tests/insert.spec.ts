import getKnexWithSchema from './getKnexWithSchema'

it('Should validate unique constraint', async () => {
    const knex = await getKnexWithSchema()

    await knex('users').insert({
        name: 'Jorge',
        createdAt: 10,
        updatedAt: 10,
    })

    const catcher = jest.fn()

    await knex('users').insert({
        name: 'Jorge',
        createdAt: 10,
        updatedAt: 10,
    }).catch(catcher)

    expect(catcher.mock.calls).toHaveLength(1)
})

it('Should not allow values that are not integers on integer columns', async () => {
    const knex = await getKnexWithSchema()
    const catcher = jest.fn()
    await knex('users').insert({
        name: 'Jorge',
        createdAt: 'TestValue',
        updatedAt: 10,
    }).catch(catcher)
    expect(catcher.mock.calls).toHaveLength(1)
})

it('Should return the auto incremented id when inserting', async () => {
    const knex = await getKnexWithSchema()

    const [userId] = await knex('users').insert({
        name: 'Jorge',
        createdAt: 10,
        updatedAt: 10,
    })
    expect(userId).toBe(1)

    const [secondUserId] = await knex('users').insert({
        name: 'Margareth',
        createdAt: 10,
        updatedAt: 10,
    })
    expect(secondUserId).toBe(2)
})
