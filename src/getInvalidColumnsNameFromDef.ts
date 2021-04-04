import valueIsUndefined from './typeAssertions/valueIsUndefined'
import { TableColumn } from './types'

type Args = {
    columnsDefs: TableColumn[];
    columnNames: string[];
}

const getInvalidColumnsNameFromDef = ({
    columnsDefs,
    columnNames,
}: Args) => columnNames.filter((columnName) => {
    const matchedDef = columnsDefs.find((def) => def.name === columnName)

    return valueIsUndefined(matchedDef)
})

export default getInvalidColumnsNameFromDef
