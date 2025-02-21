

export function formatBigIntToString(value: bigint) {
    return typeof value === 'bigint' ? value.toString() : value
}