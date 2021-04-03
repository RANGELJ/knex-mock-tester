import valueIsInteger from './typeAssertions/valueIsInteger'
import { TableColumn, TableColumnType } from './types'
import valueIsUndefined from './valueIsUnefined'

type Args = {
    column: TableColumn;
    value: unknown;
    tableData: Record<string, unknown>[];
}

const formatColumnValue = ({
    column,
    value,
    tableData,
}: Args) => {
    switch (column.type) {
    case TableColumnType.STRING: {
        if (valueIsUndefined(value)) {
            return value
        }

        const formatedValue = `${value}`.slice(0, column.length)
        return formatedValue
    }
    case TableColumnType.INCREMENTS: {
        let largestRow = 0
        tableData.forEach((rowData) => {
            const columnData = rowData[column.name]
            if (!valueIsInteger(columnData)) {
                return
            }
            if (largestRow >= columnData) {
                return
            }
            largestRow = columnData
        })
        return largestRow + 1
    }
    case TableColumnType.INTEGER: {
        if (valueIsUndefined(value)) {
            return value
        }
        if (!valueIsInteger(value)) {
            throw new Error(`Invalid value ${value} for an integer`)
        }
        return value
    }
    default:
        return value
    }
}

export default formatColumnValue
