import columnBuilder from './columnBuilder'
import columnCreateIncrements from './columnCreateIncrements'

it('Should alter primary flag when primary function is called', () => {
    const column = columnCreateIncrements('col1')
    columnBuilder(column).primary()

    expect(column).toStrictEqual({
        ...column,
        isPrimary: true,
    })
})

it('Should chain calls to primary function', () => {
    const column = columnCreateIncrements('col1')
    const builder = columnBuilder(column)
    const chained = builder.primary()

    expect(builder === chained).toBe(true)
})
