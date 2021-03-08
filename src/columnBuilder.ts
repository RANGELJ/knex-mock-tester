import {
    TableColumn,
    TableColumnBuilder,
} from './types'

const columnBuilder = (column: TableColumn): TableColumnBuilder => {
    const builder = {
        primary: () => {
            column.isPrimary = true

            return builder
        },
    }

    return builder
}

export default columnBuilder
