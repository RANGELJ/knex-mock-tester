import tableBuilder from './tableBuilder'
import { DbSchema, Table } from './types'

const schemaCreate = (): DbSchema => {
    const tables: Record<string, Table> = {}

    const schema: DbSchema = {
        tables,
        createTable: async (name, buildColumns) => {
            if (tables[name]) {
                throw new Error(`The table with name [${name}] already exist`)
            }
            const tabBuilder = tableBuilder()

            buildColumns(tabBuilder)

            tables[name] = {
                columns: tabBuilder.getColumns()
            }
        },
    }

    return schema
}

export default schemaCreate
