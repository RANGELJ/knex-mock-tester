import {
    TableColumnType,
    TableColumnIncrements,
} from './types'

const columnCreateIncrements = (name: string): TableColumnIncrements => ({
    type: TableColumnType.INCREMENTS,
    name,
    isPrimary: false,
})

export default columnCreateIncrements
