import { shallow } from 'enzyme'
import React from 'react'
import { App } from './App'

describe('App', () => {
  it('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.text()).toEqual('todo')
  })
})
