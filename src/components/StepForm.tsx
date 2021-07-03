import { Button, FileUpload, TextArea } from '@alwaystudios/as-ui-components'
import { MAX_STEPS, MAX_STEP_TEXT, Step, toSlug } from '@alwaystudios/recipe-bible-sdk'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { assetUpload } from '../domain/assetUpload'

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;

  & > button {
    margin: 0;
  }
`

const Container = styled.div`
  margin: 1rem 0 0 1rem;

  & > div {
    width: 40%;
  }
`

type Props = {
  saveStep: (step: Step) => void
  recipeTitle: string
  nextStepIndex: number
}

export const StepForm: React.FC<Props> = ({ saveStep, recipeTitle, nextStepIndex }) => {
  const [value, setValue] = useState<string>('')
  const [imgSrc, setImgSrc] = useState<string>('')
  const { tokens } = useAuthContext()

  const handleFileUpload = async (file: File) =>
    assetUpload({
      file,
      token: tokens.idToken,
      folder: `recipes/${toSlug(recipeTitle)}`,
      assetType: 'step',
    }).then(setImgSrc)

  const handleSave = (event: React.MouseEvent) => {
    event.preventDefault()
    saveStep({
      imgSrc,
      step: value,
    })
    setValue('')
    setImgSrc('')
  }

  const maxSteps = nextStepIndex === MAX_STEPS + 1
  const disabledButtons = !value || maxSteps

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  return (
    <Container>
      <TextArea
        role="step-input"
        rows={5}
        maxLength={MAX_STEP_TEXT}
        id="step-form-input"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        disabled={maxSteps}
      />
      <ButtonsContainer>
        <FileUpload
          accept={'.jpeg, .jpg'}
          multiple={false}
          onChange={(files) => handleFileUpload(files[0])}
        >
          <Button text="Upload image" onClick={onClick} disabled={disabledButtons} />
        </FileUpload>
        <Button text="Save" onClick={handleSave} disabled={disabledButtons} />
      </ButtonsContainer>
    </Container>
  )
}
