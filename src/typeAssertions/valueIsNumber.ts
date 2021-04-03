const valueIsNumber = (value: unknown): value is number => {
    if (typeof value !== 'number') {
        return false
    }
    return !Number.isNaN(value)
}

export default valueIsNumber
