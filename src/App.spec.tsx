import { shallow } from 'enzyme'
import React from 'react'
import { App } from './App'

describe('App', () => {
  it('renders the app', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.text()).toContain('Recipe Bible')
  })
})
