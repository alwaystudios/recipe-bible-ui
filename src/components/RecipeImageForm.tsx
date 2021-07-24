import { FileUpload } from '@alwaystudios/as-ui-components'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { RecipeImage } from './RecipeImage'
import { assetUpload } from '../domain/assetUpload'
import { useAuthContext } from '../auth/AuthContext'
import { Spinner } from '../components/Spinner'
import { toSlug } from '@alwaystudios/recipe-bible-sdk'

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

type Props = {
  title: string
  imgSrc: string
  setImgSrc: (src: string) => void
}

export const RecipeImageForm: React.FunctionComponent<Props> = ({ title, setImgSrc, imgSrc }) => {
  const [uploading, setUploading] = useState(false)
  const [openFileDialog, setOpenFileDialog] = useState(false)
  const { tokens } = useAuthContext()

  // todo: handle errors
  const handleFileUpload = async (file: File) => {
    setUploading(true)
    const { filename } = await assetUpload({
      file,
      token: tokens.idToken,
      folder: `recipes/${toSlug(title)}`,
      assetType: 'recipe',
    })
    if (filename === 'error') {
      setUploading(false)
    } else {
      setImgSrc(filename)
      setTimeout(() => {
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
      <FileUpload
        openFileDialog={openFileDialog}
        accept={'.jpeg, .jpg'}
        multiple={false}
        onChange={(files) => handleFileUpload(files[0])}
      >
        <Spinner isLoading={uploading}>
          {imgSrc ? (
            <RecipeImage src={imgSrc} size="medium" />
          ) : (
            <PaddedText>click to upload / drag'n'drop jpg photo</PaddedText>
          )}
        </Spinner>
      </FileUpload>
    </Container>
  )
}
