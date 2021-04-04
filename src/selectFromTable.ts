import { TableDef } from './types'
import valueIsUndefined from './typeAssertions/valueIsUndefined'
import getInvalidColumnsNameFromDef from './getInvalidColumnsNameFromDef'

type Args = {
    tableDef: TableDef;
    columnNames: string[];
    tableData: Record<string, unknown>[];
}

const selectFromTable = ({
    tableDef,
    tableData,
    columnNames,
}: Args) => {
    const invalidColumns = getInvalidColumnsNameFromDef({
        columnNames,
        columnsDefs: tableDef.columns,
    })

    if (invalidColumns.length > 0) {
        throw new Error(`Invalid column name: [${invalidColumns[0]}] in table: [${tableDef.name}]`)
    }

    return tableData.map((completeRow) => {
        const formatedRow: Record<string, unknown> = {}
    
        columnNames.forEach((columnName) => {
            formatedRow[columnName] = completeRow[columnName]
        })
    
        return formatedRow
    })
}

export default selectFromTable