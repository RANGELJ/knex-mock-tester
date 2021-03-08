import columnCreateBase from './columnCreateBase'
import { TableColumnType, TableColumnString } from './types'

const columnCreateString = (name: string, length: number): TableColumnString => ({
    ...columnCreateBase(name),
    length,
    type: TableColumnType.STRING,
})

export default columnCreateString
