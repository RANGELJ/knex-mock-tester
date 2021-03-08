import columnCreateBase from './columnCreateBase'
import {
    TableColumnType,
    TableColumnIncrements,
} from './types'

const columnCreateIncrements = (name: string): TableColumnIncrements => ({
    ...columnCreateBase(name),
    type: TableColumnType.INCREMENTS,
})

export default columnCreateIncrements
