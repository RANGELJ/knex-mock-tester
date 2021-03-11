import insertIntoTable from './insertIntoTable'
import schemaCreate from './schemaCreate'
import { KnexMock, DbData } from './types'

const knexCreate = (): KnexMock => {
    const schema = schemaCreate()
    const dbData: DbData = {}

    const knexFunction: KnexMock = (tableName) => ({
        insert: insertIntoTable({
            dbData,
            schema,
            tableName,
        }),
    })

    knexFunction.schema = schema
    knexFunction.dbData = dbData

    return knexFunction
}

export default knexCreate
