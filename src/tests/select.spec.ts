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
