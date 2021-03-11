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
    if (valueIsUndefined(value)) {
        return value
    }

    switch (column.type) {
    case TableColumnType.STRING: {
        const formatedValue = `${value}`.slice(0, column.length)
        return formatedValue
    }
    default:
        return value
    }
}

export default formatColumnValue