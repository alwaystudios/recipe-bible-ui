import React, { FunctionComponent } from 'react'

export const IngredientS3Uploader: FunctionComponent = () => <>todo</>

// import React, { useRef, useEffect } from 'react'
// import { useS3Upload } from '../../hooks/useS3Upload'
// import { FileUpload } from '../core/FileUpload'
// import { UserFeedbackType } from '../../model/types'
// import { ingredientNameToIngredientRecordName } from '../../model/transformers'
// import { useApi } from '../../hooks/useApi'
// import { Button } from '../core/Button'
// import { Upload16 } from '@carbon/icons-react'
// import styled from 'styled-components'

// const StyledButton = styled(Button)`
//   height: 100%;
// `

// type ComponentProps = {
//   ingredient: string
//   setFeedback: (feedback: UserFeedbackType) => void
//   setIngredientExists: (exists: boolean) => void
//   disabled: boolean
// }

// export const IngredientS3Uploader: React.FunctionComponent<ComponentProps> = ({
//   ingredient,
//   setFeedback,
//   setIngredientExists,
//   disabled,
// }) => {
//   const { saveIngredient } = useApi()
//   const labelRef = useRef(null)
//   const { fileUpload } = useS3Upload()

//   const handleFileUpload = async (files) => {
//     const label = labelRef.current.value.trim()
//     const filename = `${ingredientNameToIngredientRecordName(label)}.jpg`
//     await fileUpload(files, `ingredients`, 'ingredient', filename).then(async () => {
//       await saveIngredient(label).then((saved) => {
//         if (saved) {
//           setIngredientExists(true)
//         } else {
//           setFeedback({ message: 'Failed to upload image', type: 'error' })
//         }
//       })
//     })
//   }

//   useEffect(() => {
//     labelRef.current.value = ingredient
//   }, [ingredient])

//   const onClick = (event: React.MouseEvent) => {
//     event.preventDefault()
//   }

//   return (
//     <>
//       <FileUpload
//         accept={'.jpeg, .jpg, .png'}
//         multiple={false}
//         disabled={disabled}
//         onChange={(files) => handleFileUpload(files)}
//       >
//         <StyledButton
//           onClick={onClick}
//           disabled={!ingredient}
//           isSubmit={true}
//           iconOnly={true}
//           icon={Upload16}
//         />
//       </FileUpload>
//       <input hidden={true} ref={labelRef} defaultValue={ingredient} />
//     </>
//   )
// }
