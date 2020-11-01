import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RecipeImage } from './RecipeImage'
import { useS3Upload } from '../../hooks/useS3Upload'
import { FileUpload } from '@alwaystudios/as-ui-components'
import { UserFeedbackType } from '../../types'
import { BeatLoader } from 'react-spinners'

const Container = styled.div`
  padding-top: 1rem;
  width: fit-content;

  & > :hover {
    cursor: pointer;
  }
`

const PaddedText = styled.p`
  padding: 1rem;
`

type ComponentProps = {
  recipeTitle: string
  imgSrc: string
  setImgSrc: (src: string) => void
  setFeedback: (feedback: UserFeedbackType) => void
  disabled?: boolean
}

export const RecipeImageForm: React.FunctionComponent<ComponentProps> = ({
  recipeTitle,
  setImgSrc,
  imgSrc,
  setFeedback,
  disabled = false,
}) => {
  const { singleFileUpload } = useS3Upload()
  const [uploading, setUploading] = useState(false)
  const [openFileDialog, setOpenFileDialog] = useState(false)

  const handleFileUpload = async (files: any) => {
    setImgSrc('')
    setUploading(true)
    const filename = await singleFileUpload(files, `recipes/${recipeTitle}`, 'recipe')
    if (filename === 'error') {
      setFeedback({ message: 'Failed to upload image', type: 'error' })
      setUploading(false)
    } else {
      setTimeout(() => {
        setImgSrc(filename)
        setUploading(false)
      }, 1000)
    }
  }

  useEffect(() => {
    if (openFileDialog) {
      setOpenFileDialog(false)
    }
  }, [openFileDialog])

  return (
    <Container>
      {disabled ? null : (
        <>
          <FileUpload
            openFileDialog={openFileDialog}
            accept={'.jpeg, .jpg, .png'}
            multiple={false}
            onChange={(files) => handleFileUpload(files[0])}
          >
            {imgSrc ? (
              <RecipeImage src={imgSrc} size="medium" />
            ) : uploading ? (
              <BeatLoader />
            ) : (
              <PaddedText>click to upload / drag'n'drop jpg photo</PaddedText>
            )}
          </FileUpload>
        </>
      )}
    </Container>
  )
}
