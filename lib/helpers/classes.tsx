function classes(...names: (string | undefined)[]) {
    return names.filter((name) => { return name !== 'undefined' && name }).join(' ')
}
export default classes