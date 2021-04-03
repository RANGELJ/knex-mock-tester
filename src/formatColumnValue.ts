import valueIsInteger from './typeAssertions/valueIsInteger'
import valueIsNumber from './typeAssertions/valueIsNumber'
import { TableColumn, TableColumnType } from './types'
import valueIsUndefined from './valueIsUnefined'

type Args = {
    column: TableColumn;
    value: unknown;
}

const formatColumnValue = ({
    column,
    value,
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
        if (valueIsUndefined(value)) {
            return 1
        }
        return value
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
