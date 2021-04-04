type Args = {
    tableData: Record<string, unknown>[];
}

const selectFromTable = async ({
    tableData,
}: Args) => tableData

export default selectFromTable