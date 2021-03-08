import knexCreate from './knexCreate'

it('Insert fails with invalid table name', () => {
    const knex = knexCreate()

    expect(() => {
        knex('users')
            .insert({ name: 'Hello' })
    }).toThrowError()
})

it('Insert single record', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 40)
    })

    knex('users')
        .insert({ name: 'Hello' })

    const usersData = knex.dbData.users

    expect(usersData).toHaveLength(1)
    expect(usersData[0]).toStrictEqual({ name: 'Hello' })
})

it('Insert multiple rows on table', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 40)
    })

    knex('users')
        .insert([
            { name: 'Hello' },
            { name: 'world' }
        ])

    const usersData = knex.dbData.users
    expect(usersData).toHaveLength(2)
    expect(usersData[0]).toStrictEqual({ name: 'Hello' })
    expect(usersData[1]).toStrictEqual({ name: 'world' })
})
