import { Button, FileUpload } from '@alwaystudios/as-ui-components'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from '../auth/AuthContext'
import { assetUpload } from '../domain/assetUpload'

type ComponentProps = {
  ingredient: string
  disabled: boolean
  setIngredientExists: (exists: boolean) => void
  setError: (error: boolean) => void
}

export const IngredientAssetUploader: React.FunctionComponent<ComponentProps> = ({
  ingredient,
  disabled,
  setIngredientExists,
  setError,
}) => {
  const history = useHistory()
  const { tokens } = useAuthContext()
  const labelRef = useRef(null)
  const [authError, setAuthError] = useState<boolean>(false)

  useEffect(() => {
    if (authError) {
      history.push('/account')
    }
  }, [authError])

  const handleFileUpload = async (file: File) => {
    setError(false)
    const filenameOverride = `${toIngredientRecord(labelRef.current.value.trim())}.jpg`
    const result = await assetUpload({
      file,
      token: tokens.idToken,
      folder: 'ingredients',
      assetType: 'ingredient',
      filenameOverride,
    })

    setError(Boolean(result.error))
    setAuthError(Boolean(result.authError))
    setIngredientExists(Boolean(result.filename))
  }

  const onClick = (event: React.MouseEvent) => {
    event.preventDefault()
  }

  useEffect(() => {
    labelRef.current.value = ingredient
  }, [ingredient])

  return (
    <>
      <FileUpload
        accept={'.jpeg, .jpg'}
        multiple={false}
        disabled={disabled || !ingredient}
        onChange={(files) => handleFileUpload(files[0])}
      >
        <Button text="upload" onClick={onClick} disabled={!ingredient} isSubmit={true} />
      </FileUpload>
      <input hidden={true} ref={labelRef} defaultValue={ingredient} />
    </>
  )
}
