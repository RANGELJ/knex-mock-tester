import { DbSchema, DbData, InsertInstruction } from './types'
import validateColumnValue from './validateColumnValue'

type Args = {
    schema: DbSchema;
    tableName: string;
    dbData: DbData;
}

const insertIntoTable = ({
    schema,
    tableName,
    dbData,
}: Args): InsertInstruction => (newRecord) => {
    const table = schema.tables[tableName]

    if (!table) {
        throw new Error(`Table does not exist: [${tableName}]`)
    }

    if (!dbData[tableName]) {
        dbData[tableName] = []
    }

    const insertIndividualRecord = (record: Record<string, unknown>) => {
        const actualRow: Record<string, unknown> = {}
        Object.entries(record).forEach(([propName, propValue]) => {
            const column = table.columns.find((col) => col.name === propName)

            if (!column) {
                throw new Error(`Column [${propName}] does not exist on table [${tableName}]`)
            }

            actualRow[propName] = validateColumnValue({
                column,
                value: propValue,
            })
        })
        dbData[tableName].push(actualRow)
    }

    if (Array.isArray(newRecord)) {
        newRecord.forEach((childRecord) => {
            insertIndividualRecord(childRecord)
        })
    } else {
        insertIndividualRecord(newRecord)
    }
}

export default insertIntoTable
