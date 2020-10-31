import { shallow } from 'enzyme'
import React from 'react'
import { NavMenuItem } from './NavMenuItem'

describe('NavMenuItem', () => {
  it('renders a NavMenuItem', () => {
    const wrapper = shallow(<NavMenuItem title="home page" location="/home" />)
    expect(wrapper.text()).toContain('home page')
  })

  it.todo('navigates on click')
})
