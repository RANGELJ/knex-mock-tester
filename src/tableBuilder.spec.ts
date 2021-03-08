import tableBuilder from './tableBuilder'

it('Should create an increment with correct props', () => {
    const builder = tableBuilder()

    builder.increments('id').primary()

    const columnDefinitions = builder.getColumns()

    expect(columnDefinitions).toHaveLength(1)

    const incrementsColDef = columnDefinitions[0]

    expect(incrementsColDef.name).toBe('id')
    expect(incrementsColDef.primary).toBe(true)
})
