import { shallow } from 'enzyme'
import React from 'react'
import { App } from './App'

describe('App', () => {
  xit('renders', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.text()).toEqual('todo')
  })
})
