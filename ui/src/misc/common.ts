
export const getExt = (str: string) => {
    return str.split('.').pop() || ''
}
