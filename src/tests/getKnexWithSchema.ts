import knexCreate from '../knexCreate'

const getKnexWithSchema = async () => {
    const knex = knexCreate()

    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('name', 40).notNullable().unique()
        table.integer('createdAt', 10).notNullable()
        table.integer('updatedAt', 10).notNullable()
    })

    return knex
}

export default getKnexWithSchema
