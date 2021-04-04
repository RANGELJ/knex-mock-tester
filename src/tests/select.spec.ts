import getKnexWithSchema from './getKnexWithSchema'

it('Should be able to select', async () => {
    const knex = await getKnexWithSchema()

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

it('Return only matched coulumn', async () => {
    const knex = await getKnexWithSchema()

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
        .select('name')

    expect(rows).toStrictEqual([
        { name: 'Jorge' },
        { name: 'Margareth' },
    ])
})

it('Sould return an empty array when no rows are on table', async () => {
    const knex = await getKnexWithSchema()
    const rows = await knex('users').select('name')
    expect(rows).toHaveLength(0)
})

it('Should fail when selecting non existing column', async () => {
    const knex = await getKnexWithSchema()
    const catcher = jest.fn()

    await knex('users').select('name2').catch(catcher)

    expect(catcher.mock.calls).toHaveLength(1)
})
