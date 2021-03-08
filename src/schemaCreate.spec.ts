import schemaCreate from './schemaCreate'

it('Should add the table to record of tables', () => {
    const schema = schemaCreate()

    schema.createTable('users', (table) => {
        table.increments('id').primary()
    })

    expect(schema.tables.users).not.toBeUndefined()
})

it('Should fail when the table already exist', () => {
    const schema = schemaCreate()

    schema.createTable('users', (table) => {
        table.increments('id').primary()
    })

    expect(() => {
        schema.createTable('users', (table) => {
            table.increments('id').primary()
        })
    }).toThrowError()
})

it('Should add column when builder calls the method to do so', () => {
    const schema = schemaCreate()

    schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name', 40).notNullable()
    })

    const tableColumns = schema.tables.users.columns

    expect(tableColumns).toHaveLength(2)
})
