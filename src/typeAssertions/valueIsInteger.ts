import valueIsNumber from "./valueIsNumber"

const valueIsInteger = (value: unknown): value is number => {
    if (!valueIsNumber(value)) {
        return false
    }
    return /[0-9]+/.test(`${value}`)
}

export default valueIsInteger
