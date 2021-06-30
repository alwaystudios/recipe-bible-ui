import { Button, FileUpload } from '@alwaystudios/as-ui-components'
import { toIngredientRecord } from '@alwaystudios/recipe-bible-sdk'
import React, { useEffect, useRef } from 'react'
import { useAuthContext } from '../auth/AuthContext'
import { assetUpload } from '../domain/assetUpload'

type ComponentProps = {
  ingredient: string
  disabled: boolean
  setIngredientExists: (exists: boolean) => void
}

export const IngredientAssetUploader: React.FunctionComponent<ComponentProps> = ({
  ingredient,
  disabled,
  setIngredientExists,
}) => {
  const { tokens } = useAuthContext()
  const labelRef = useRef(null)

  const handleFileUpload = async (file: File) => {
    const filenameOverride = `${toIngredientRecord(labelRef.current.value.trim())}.jpg`
    await assetUpload({
      file,
      token: tokens.idToken,
      folder: 'ingredients',
      assetType: 'ingredient',
      filenameOverride,
    })
    setIngredientExists(true)
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
        disabled={disabled}
        onChange={(files) => handleFileUpload(files[0])}
      >
        <Button text="upload" onClick={onClick} disabled={!ingredient} isSubmit={true} />
      </FileUpload>
      <input hidden={true} ref={labelRef} defaultValue={ingredient} />
    </>
  )
}
