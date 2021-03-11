import { TableColumn, TableColumnType } from './types'

type Args = {
    column: TableColumn;
    value: unknown;
}

const validateColumnValue = ({
    column,
    value,
}: Args) => {
    switch (column.type) {
    case TableColumnType.STRING:
        const formatedValue = `${value}`.slice(0, column.length)
        return formatedValue
    default:
        return value
    }
}

export default validateColumnValue
