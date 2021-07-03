import { TextInput } from '@alwaystudios/as-ui-components'
import { dekebabify } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { RB_TEXT, RB_WHITE } from '../colors'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Results = styled.div`
  position: relative;
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

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  margin: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: ${RB_TEXT};
    color: ${RB_WHITE};
  }
`

type ComponentProps = {
  value: string
  setValue: (value: string) => void
  disabled: boolean
  ingredients: string[]
}

export const IngredientFormSearch: React.FunctionComponent<ComponentProps> = ({
  value,
  setValue,
  disabled,
  ingredients,
}) => {
  const [items, setItems] = useState<string[]>([value])
  const [showResults, setShowResults] = useState(false)

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
      setItems(ingredients.filter((i) => i.includes(value)).map(dekebabify))
    }
  }, [value])

  const handleOnChange = async (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault()
    setValue(event.currentTarget.value.toLowerCase())
    setShowResults(true)
  }

  const handleClick = (event: React.FormEvent<HTMLLIElement>, item: string) => {
    event.preventDefault()
    setValue(item)
    setShowResults(false)
  }

  const handleClear = () => {
    setItems([])
    setValue('')
    setShowResults(false)
  }

  return (
    <Container>
      <TextInput
        autoFocus={true}
        placeholder="add an ingredient"
        role="ingredient-form-input"
        value={value}
        onChange={handleOnChange}
        onClear={handleClear}
        disabled={disabled}
      />
      {items.length > 0 && showResults && (
        <Results>
          <FloatingResults>
            <Ul>
              {items.map((item) => (
                <Li onClick={(e) => handleClick(e, item)} key={item}>
                  {item}
                </Li>
              ))}
            </Ul>
          </FloatingResults>
        </Results>
      )}
    </Container>
  )
}
