import classes from '../classes'
describe('classes', () => {
    it('接受 1 个className', () => {
        const result = classes('a')
        expect(result).toEqual('a')
    })
    it('接受 2 个className', () => {
        const result = classes('a', 'b')
        expect(result).toEqual('a b')
    })
    it('接受 undefined 结果不会出现 undefined', () => {
        const result = classes('a', 'b', undefined)
        expect(result).toEqual('a b')
    })
    it('接受 0 个参数', () => {
        const result = classes()
        expect(result).toEqual('')
    })
})