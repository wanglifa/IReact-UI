import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../button'
import { mount } from 'enzyme'
import Icon from "../../icon/icon";

describe('Button', () => {
  it('render successfully', () => {
    //渲染一个Button，因为Button是一个对象所以我们可以把它转成json
    const json = renderer.create(<Button type="info" size="mini">小改改</Button>).toJSON()
    //期待它去匹配Snapshot
    expect(json).toMatchSnapshot()
  })
  it('onClick', () => {
    const fn = jest.fn()
    const component = mount(<Button onClick={fn}>小改改</Button>)
    component.find('button').simulate('click')
    expect(fn).toBeCalled
  })
})