import { DbSchema, DbData, InsertInstruction, Table } from './types'
import formatColumnValue from './formatColumnValue'
import valueIsUndefined from './valueIsUnefined'

type Args = {
    tableDef: Table;
    tableData: Record<string, unknown>[];
    newRecord: Record<string, unknown> | Record<string, unknown>[];
}

const insertIntoTable = ({
    tableDef,
    tableData,
    newRecord,
}: Args) => {
    const insertIndividualRecord = (record: Record<string, unknown>) => {
        const actualRow: Record<string, unknown> = {}

        let rowId: unknown

        tableDef.columns.forEach((column) => {
            const propValue = record[column.name]

            const formatedValue = formatColumnValue({
                column,
                value: propValue,
                tableData,
            })

            const getMatchedRow = () => tableData
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

        tableData.push(actualRow)

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
