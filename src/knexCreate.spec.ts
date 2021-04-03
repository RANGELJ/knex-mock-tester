import knexCreate from './knexCreate'

it('Insert fails with invalid table name', async () => {
    const knex = knexCreate()

    const catcher = jest.fn()

    await knex('users')
        .insert({ name: 'Hello' })
        .catch(catcher)

    expect(catcher.mock.calls).toHaveLength(1)
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

it('Should crop largen than stated string, (just like aurora or mysql do by default)', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 5)
    })

    knex('users').insert({ name: '123456' })

    const usersData = knex.dbData.users
    expect(usersData[0].name).toBe('12345')
})

it('Should fail with notNullable constraint is violated', async () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 10).notNullable()
        table.string('secondname', 10)
    })

    const catcher = jest.fn()

    await knex('users')
        .insert({ secondname: 'Margareth' })
        .catch(catcher)

    expect(catcher.mock.calls).toHaveLength(1)
})

it('When a column is primary is implicid that is not nullable and unique', async () => {
    const knex = knexCreate()

    await knex.schema.createTable('users', (table) => {
        table.string('id', 10).primary()
    })

    const catcher = jest.fn()

    await knex('users').insert({ hi: 124 })
        .catch(catcher)

    expect(catcher.mock.calls).toHaveLength(1)

    await knex('users').insert({ id: 'a' })

    await knex('users').insert({ id: 'a' })
        .catch(catcher)

    expect(catcher.mock.calls).toHaveLength(2)
})

// Basing auto increment on doc from mysql:
// https://dev.mysql.com/doc/refman/8.0/en/example-auto-increment.html
it('An auto increment auto inserts a 1 when no value is passed on first row', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.increments('id')
        table.string('name', 40)
    })

    knex('users').insert({ name: 'Jorge' })

    const usersData = knex.dbData.users

    expect(usersData).toStrictEqual([{
        id: 1,
        name: 'Jorge',
    }])
})
