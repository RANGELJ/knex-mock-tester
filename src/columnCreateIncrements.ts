import {
    TableColumnType,
    TableColumnIncrements,
} from './types'

const columnCreateIncrements = (name: string): TableColumnIncrements => ({
    type: TableColumnType.INCREMENTS,
    name,
    primary: false,
    notNullable: false,
    unique: false,
})

export default columnCreateIncrements
