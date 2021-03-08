import columnBuilder from './columnBuilder'
import columnCreateIncrements from './columnCreateIncrements'
import columnCreateString from './columnCreateString'
import { TableBuilder, TableColumn } from './types'

const tableBuilder = (): TableBuilder => {
    const columns: TableColumn[] = []

    const builder: TableBuilder = {
        increments: (name) => {
            const column = columnCreateIncrements(name)
            columns.push(column)
            return columnBuilder(column)
        },
        string: (name, length) => {
            const column = columnCreateString(name, length)
            columns.push(column)
            return columnBuilder(column)
        },
        getColumns: () => columns,
    }

    return builder
}

export default tableBuilder
