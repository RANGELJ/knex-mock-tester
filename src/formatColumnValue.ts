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
    default:
        return value
    }
}

export default formatColumnValue
