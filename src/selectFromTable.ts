import { TableDef } from './types'
import valueIsUndefined from './typeAssertions/valueIsUndefined'

type Args = {
    tableDef: TableDef;
    columnNames: string[];
    tableData: Record<string, unknown>[];
}

const selectFromTable = async ({
    tableDef,
    tableData,
    columnNames,
}: Args) => tableData.map((completeRow) => {
    const formatedRow: Record<string, unknown> = {}

    columnNames.forEach((columnName) => {
        const columnDef = tableDef.columns
            .find((columnDefSearch) => columnDefSearch.name === columnName)

        if (valueIsUndefined(columnDef)) {
            throw new Error(`Trying to select invalid column [${columnName}]`)
        }

        formatedRow[columnName] = completeRow[columnName]
    })

    return formatedRow
})

export default selectFromTable