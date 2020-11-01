import { TextInput } from '@alwaystudios/as-ui-components'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useApi } from '../../hooks/useApi'

const Container = styled.div`
  display: flex;
  flex-direction: column;

  .dropdown-input {
    width: 10.75rem;
  }

  .results {
    position: relative;
  }
`

const FloatingResults = styled.div`
  z-index: 20;
  position: absolute;
  background-color: #f5f5f5;
  border: 1px solid grey;
  width: 100%;
  max-height: 15rem;
  overflow-y: auto;
`

const Li = styled.li`
  margin: 0.5rem;
  cursor: pointer;
`

type ComponentProps = {
  value: string
  setLabel: (label: string) => void
  disabled: boolean
}

export const IngredientFormSearch: React.FunctionComponent<ComponentProps> = ({
  value,
  setLabel,
  disabled,
}) => {
  const [items, setItems] = useState<string[]>([value])
  const [showResults, setShowResults] = useState(false)
  const { searchIngredients } = useApi()

  useEffect(() => {
    const clickEventListener = (event: any) => {
      if (!event.target.closest('floating-search-results')) {
        setShowResults(false)
      }
    }
    document.addEventListener('click', clickEventListener)

    return () => {
      document.removeEventListener('click', clickEventListener)
    }
  })

  useEffect(() => {
    if (value) {
      searchIngredients(value).then(setItems)
    }
  }, [value])

  const changeValue = (value: string) => {
    setLabel(value)
    setShowResults(false)
  }

  const handleOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    changeValue(event.currentTarget.value.toLowerCase())
    setShowResults(true)
  }

  const handleClick = (event: React.FormEvent<HTMLLIElement>, item: string) => {
    event.preventDefault()
    changeValue(item)
  }

  const handleClear = () => {
    setItems([])
    setLabel('')
  }

  return (
    <Container>
      <TextInput
        placeholder="add an ingredient"
        id="ingredient-form-input"
        value={value}
        onChange={handleOnChange}
        onClear={handleClear}
        disabled={disabled}
      />
      {items.length > 0 && showResults && (
        <div className="results">
          <FloatingResults className="floating-search-results">
            <ul>
              {items.map((item) => (
                <Li onClick={(e) => handleClick(e, item)} key={item}>
                  {item}
                </Li>
              ))}
            </ul>
          </FloatingResults>
        </div>
      )}
    </Container>
  )
}
