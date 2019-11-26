import classes, {scopedClassMaker} from '../classes';
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

describe('scopedClassMaker', () => {
  it('接受字符串或对象', () => {
    const sc = scopedClassMaker('ireact-layout')
    expect(sc('')).toEqual('ireact-layout')
    expect(sc('x')).toEqual('ireact-layout-x')
    expect(sc({y: true, z: false})).toEqual('ireact-layout-y')
    expect(sc({y: true, z: true})).toEqual('ireact-layout-y ireact-layout-z')
    expect(sc({y: true, z: true}, {extra: 'red'})).toEqual('ireact-layout-y ireact-layout-z red')
  })
})