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

it('Should crop largen than stated string, (just like aurora or mysql do by default)', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 5)
    })

    knex('users').insert({ name: '123456' })

    const usersData = knex.dbData.users
    expect(usersData[0].name).toBe('12345')
})

it('Should fail with notNullable constraint is violated', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('name', 10).notNullable()
        table.string('secondname', 10)
    })

    expect(() => {
        knex('users').insert({ secondname: 'Margareth' })
    }).toThrowError()
})

it('When a column is primary is implicid that is not nullable and unique', () => {
    const knex = knexCreate()

    knex.schema.createTable('users', (table) => {
        table.string('id', 10).primary()
    })

    expect(() => {
        knex('users').insert({ hi: 124 })
    }).toThrowError()

    knex('users').insert({ id: 'a' })

    expect(() => {
        knex('users').insert({ id: 'a' })
    }).toThrowError()
})
