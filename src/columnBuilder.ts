import {
    TableColumn,
    TableColumnBuilder,
} from './types'

const columnBuilder = (column: TableColumn): TableColumnBuilder => {
    const builder = {
        primary: () => {
            column.primary = true
            return builder
        },
        notNullable: () => {
            column.notNullable = true
            return builder
        },
        unique: () => {
            column.unique = true
            return builder
        }
    }

    return builder
}

export default columnBuilder
