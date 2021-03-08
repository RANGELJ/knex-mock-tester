import columnBuilder from './columnBuilder'
import columnCreateIncrements from './columnCreateIncrements'
import { TableBuilder, TableColumn } from './types'

const tableBuilder = (): TableBuilder => {
    const columnDefinitions: TableColumn[] = []

    const builder: TableBuilder = {
        increments: (name) => {
            const column = columnCreateIncrements(name)
            columnDefinitions.push(column)
            return columnBuilder(column)
        },
        getColumnDefinitions: () => columnDefinitions,
    }

    return builder
}

export default tableBuilder
