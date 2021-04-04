import knexCreate from '../knexCreate'

const buildTestKnex = async () => {
    const knex = knexCreate()

    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name', 40).notNullable().unique()
        table.integer('createdAt', 10).notNullable()
        table.integer('updatedAt', 10).notNullable()
    })

    return knex
}

it('Should validate unique constraint', async () => {
    const knex = await buildTestKnex()

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
    const knex = await buildTestKnex()
    const catcher = jest.fn()
    await knex('users').insert({
        name: 'Jorge',
        createdAt: 'TestValue',
        updatedAt: 10,
    }).catch(catcher)
    expect(catcher.mock.calls).toHaveLength(1)
})

it('Should return the auto incremented id when inserting', async () => {
    const knex = await buildTestKnex()

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

it('Should be able to select', async () => {
    const knex = await buildTestKnex()

    await knex('users').insert([
        {
            name: 'Jorge',
            createdAt: 10,
            updatedAt: 10,
        },
        {
            name: 'Margareth',
            createdAt: 10,
            updatedAt: 10,
        },
    ])

    const rows = await knex('users')
        .select('id')

    expect(rows).toHaveLength(2)
})
