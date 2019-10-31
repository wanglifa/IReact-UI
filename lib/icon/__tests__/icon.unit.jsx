import React from 'react'
import renderer from 'react-test-renderer'
import Icon from '../icon'
import { mount } from 'enzyme'

describe('Icon', () => {
  it('render successfully', () => {
    //渲染一个Button，因为Button是一个对象所以我们可以把它转成json
    const json = renderer.create(<Icon name="alipay"/>).toJSON()
    //期待它去匹配Snapshot
    expect(json).toMatchSnapshot()
  })
  it('onClick', () => {
    const fn = jest.fn()
    const component = mount(<Icon name="alipay" onClick={fn}/>)
    component.find('svg').simulate('click')
    expect(fn).toBeCalled
  })
})