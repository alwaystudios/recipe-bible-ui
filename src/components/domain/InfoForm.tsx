import { TextInput, Checkbox } from '@alwaystudios/as-ui-components'
import { CATEGORIES } from '@alwaystudios/recipe-bible-sdk'
import React from 'react'
import styled from 'styled-components'
import { mediumScreen } from '../../config'

const Container = styled.div`
  display: flex;
  flex-direction: row;

  & .text-input {
    padding-bottom: 1rem;
  }

  & .text-area {
    width: 20rem;
  }

  > div {
    padding: 1rem;
  }

  @media only screen and (max-width: ${mediumScreen}px) {
    flex-direction: column;
    margin-bottom: 2rem;
  }
`

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  background-color: WhiteSmoke;
  margin-left: 1rem;
  margin-top: 1.5rem;
  border: 1px black solid;
  width: fit-content;
`

type ComponentProps = {
  categories: string[]
  setCategories: (values: string[]) => void
  story: string
  setStory: (story: string) => void
  servings: string
  setServings: (story: string) => void
  cookingTime: string
  setCookingTime: (story: string) => void
}

export const InfoForm: React.FunctionComponent<ComponentProps> = ({
  categories,
  setCategories,
  story,
  setStory,
  servings,
  setServings,
  cookingTime,
  setCookingTime,
}) => {
  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    setter: (value: string) => void,
  ) => setter(event.currentTarget.value)

  const handleCategories = (checked: boolean, category: string) => {
    if (checked) {
      setCategories([category, ...categories])
    } else {
      setCategories(categories.filter((c) => c !== category))
    }
  }

  return (
    <Container>
      <div>
        <TextInput
          label="Servings"
          value={servings}
          onChange={(e) => handleChange(e, setServings)}
        />
        <TextInput
          label="Cooking time"
          value={cookingTime}
          onChange={(e) => handleChange(e, setCookingTime)}
        />
      </div>
      <div>
        <TextInput
          rows={8}
          label="Story"
          value={story}
          onChange={(e) => handleChange(e, setStory)}
        />
      </div>
      <Categories>
        {CATEGORIES.map((category, index) => (
          <Checkbox
            key={index}
            label={category}
            checked={categories.includes(category)}
            onChange={(checked: boolean) => handleCategories(checked, category)}
          />
        ))}
      </Categories>
    </Container>
  )
}
