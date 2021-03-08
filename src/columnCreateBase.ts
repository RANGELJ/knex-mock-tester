import { TableColumnBase } from './types'

const columnCreateBase = (name: string): TableColumnBase => ({
    name,
    primary: false,
    notNullable: false,
    unique: false,
})

export default columnCreateBase
