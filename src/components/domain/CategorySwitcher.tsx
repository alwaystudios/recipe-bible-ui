import { ContentSwitcher, TextInput } from '@alwaystudios/as-ui-components'
import React from 'react'
import styled from 'styled-components'
import { mediumScreen } from '../../config'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

const Container = styled.div`
  flex-wrap: nowrap;
  justify-content: center;

  > .rb-switcher {
    margin-right: 1rem;
  }

  > .rb-category-switch-dropdown {
    display: none;
    border-right: 1px solid black;

    .Dropdown-control {
      padding-top: 6px;
    }
  }

  @media only screen and (max-width: ${mediumScreen}px) {
    > .rb-category-switch-dropdown {
      display: flex;
    }

    > .rb-switcher {
      display: none;
    }
  }
`

type ComponentProps = {
  currentOption: string
  options: string[]
  setCurrentOption: (option: string) => void
  searchTerm: string
  onSearch: (event: React.FormEvent<HTMLInputElement>) => void
}

export const CategorySwitcher: React.FunctionComponent<ComponentProps> = ({
  currentOption,
  options,
  setCurrentOption,
  searchTerm,
  onSearch,
}) => (
  <Container className="flex-row">
    <ContentSwitcher
      className="rb-switcher"
      selectedOption={currentOption}
      options={options}
      onChange={setCurrentOption}
    />
    <Dropdown
      className="rb-category-switch-dropdown"
      options={options}
      value={currentOption}
      onChange={(option) => setCurrentOption(option.value)}
    />
    <TextInput isSearch={true} value={searchTerm} onChange={onSearch} />
  </Container>
)
