import columnCreateBase from './columnCreateBase'
import { TableColumnType, TableColumnInteger } from './types'

const columnCreateInteger = (name: string, length: number): TableColumnInteger => ({
    ...columnCreateBase(name),
    length,
    type: TableColumnType.INTEGER,
})

export default columnCreateInteger
