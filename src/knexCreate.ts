import schemaCreate from './schemaCreate'
import { KnexMock, DbData } from './types'

const knexCreate = (): KnexMock => {
    const schema = schemaCreate()
    const dbData: DbData = {}

    const knexFunction: KnexMock = (tableName) => ({
        insert: (newRecord) => {
            const table = schema.tables[tableName]

            // Validation of table on schema
            if (!table) {
                throw new Error(`Table does not exist: [${tableName}]`)
            }

            // Making sure table data exist
            if (!dbData[tableName]) {
                dbData[tableName] = []
            }

            // Inserting row on table
            if (Array.isArray(newRecord)) {
                newRecord.forEach((childRecord) => {
                    dbData[tableName].push(childRecord)
                })
            } else {
                dbData[tableName].push(newRecord)
            }
        },
    })

    knexFunction.schema = schema
    knexFunction.dbData = dbData

    return knexFunction
}

export default knexCreate
