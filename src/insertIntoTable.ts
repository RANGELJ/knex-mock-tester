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
}: Args): InsertInstruction => async (newRecord) => {
    const table = schema.tables[tableName]

    if (!table) {
        throw new Error(`Table does not exist: [${tableName}]`)
    }

    if (!dbData[tableName]) {
        dbData[tableName] = []
    }

    const insertIndividualRecord = (record: Record<string, unknown>) => {
        const actualRow: Record<string, unknown> = {}

        let rowId: unknown

        table.columns.forEach((column) => {
            const propValue = record[column.name]

            const formatedValue = formatColumnValue({
                column,
                value: propValue,
                tableData: dbData[tableName],
            })

            const getMatchedRow = () => dbData[tableName]
                .find((row) => row[column.name] === formatedValue)

            if (valueIsUndefined(formatedValue)) {
                if (column.notNullable || column.primary) {
                    throw new Error(`Column [${column.name}] is not nullable, a value must be supplied`)
                }
                return
            }

            if (column.primary) {
                const matchedRow = getMatchedRow()
                if (matchedRow) {
                    throw new Error(`Column [${column.name}]: ${formatedValue} should be unique`)
                }
                rowId = formatedValue
            }

            if (column.unique) {
                const matchedRow = getMatchedRow()
                if (matchedRow) {
                    throw new Error(`Column [${column.name}]: ${formatedValue} should be unique`)
                }
            }

            actualRow[column.name] = formatedValue
        })

        dbData[tableName].push(actualRow)

        return rowId
    }

    if (Array.isArray(newRecord)) {
        return newRecord.map((childRecord) => insertIndividualRecord(childRecord))
    } else {
        const rowId = insertIndividualRecord(newRecord)
        return [rowId]
    }
}

export default insertIntoTable
