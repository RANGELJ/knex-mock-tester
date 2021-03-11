import { DbSchema, DbData, InsertInstruction } from './types'
import formatColumnValue from './formatColumnValue'
import valueIsUndefined from './valueIsUnefined'

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

        table.columns.forEach((column) => {
            const propValue = record[column.name]

            const formatedValue = formatColumnValue({
                column,
                value: propValue,
            })
            console.log('formatedValue', formatedValue)

            if (valueIsUndefined(formatedValue)) {
                if (column.notNullable || column.primary) {
                    throw new Error(`Column [${column.name}] is not nullable, a value must be supplied`)
                }
                return
            }

            if (column.primary) {
                const matchedRow = dbData[tableName]
                    .find((row) => row[column.name] === formatedValue)

                if (matchedRow) {
                    throw new Error(`Column [${column.name}] should be unique, DUP found`)
                }
            }

            actualRow[column.name] = formatedValue
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
