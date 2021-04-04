import insertIntoTable from './insertIntoTable'
import schemaCreate from './schemaCreate'
import selectFromTable from './selectFromTable'
import valueIsUndefined from './typeAssertions/valueIsUndefined'
import { KnexMock, DbData } from './types'

const knexCreate = (): KnexMock => {
    const schema = schemaCreate()
    const dbData: DbData = {}

    const getTableDefinitionByTableName = (tableName: string) => {
        const tableDef = schema.tables[tableName]

        if (!tableDef) {
            throw new Error(`Table does not exist: [${tableName}]`)
        }

        return tableDef
    }

    const getTableDataByTableName = (tableName: string) => {
        getTableDefinitionByTableName(tableName)

        if (valueIsUndefined(dbData[tableName])) {
            dbData[tableName] = []
        }

        return dbData[tableName]
    }

    const knexFunction: KnexMock = (tableName) => ({
        insert: async (data) => {
            return insertIntoTable({
                newRecord: data,
                tableDef: getTableDefinitionByTableName(tableName),
                tableData: getTableDataByTableName(tableName),
            })
        },
        select: async (...columnNames) => {
            return selectFromTable({
                tableDef: getTableDefinitionByTableName(tableName),
                tableData: getTableDataByTableName(tableName),
                columnNames,
            })
        },
    })

    knexFunction.schema = schema
    knexFunction.dbData = dbData

    return knexFunction
}

export default knexCreate
