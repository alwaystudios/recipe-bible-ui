import React, { FunctionComponent } from 'react'

export const IngredientForm: FunctionComponent = () => <>todo</>

// import React, { useState, useEffect } from 'react'
// import { TextInput } from '../core/TextInput'
// import { Button } from '../core/Button'
// import styled from 'styled-components'
// import { Save16 } from '@carbon/icons-react'
// import { Dropdown } from '../core/dropdown/Dropdown'
// import { Measure, Ingredient, UserFeedbackType } from '../../model/types'
// import { IngredientS3Uploader } from './IngredientS3Uploader'
// import { ingredientLabel, ingredientNameToIngredientRecordName } from '../../model/transformers'
// import getConfig from 'next/config'
// import { useApi } from '../../hooks/useApi'
// import { MAX_INGREDIENTS } from '../../model/recipeValidation'
// import { IngredientFormSearch } from './IngredientFormSearch'

// const {
//   publicRuntimeConfig: { content },
// } = getConfig()

// const FormContainer = styled.form`
//   padding: 4rem 0.8rem;
//   display: flex;
//   flex-direction: column;
//   max-width: fit-content;
// `

// const TextInputContainer = styled.div`
//   display: flex;
//   flex-direction: row;
// `

// const MeasureInputContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;

//   .text-input {
//     width: 6.4rem;
//   }

//   .dropdown-input {
//     width: 6.5rem;
//   }
// `

// type ComponentProps = {
//   saveIngredient: (ingredient: Ingredient) => void
//   setFeedback: (feedback: UserFeedbackType) => void
//   totalIngredients: number
// }

// export const IngredientForm: React.FunctionComponent<ComponentProps> = ({
//   saveIngredient,
//   setFeedback,
//   totalIngredients,
// }) => {
//   const { getIngredient, searchIngredients } = useApi()
//   const [label, setLabel] = useState<string>('')
//   const [quantity, setQuantity] = useState<string>('')
//   const [measure, setMeasure] = useState<Measure>(Measure.quantity)
//   const [ingredientExists, setIngredientExists] = useState(false)

//   useEffect(() => {
//     if (label) {
//       searchIngredients(label).then((result) => {
//         const results = result.map(ingredientNameToIngredientRecordName)
//         setIngredientExists(results.includes(ingredientNameToIngredientRecordName(label)))
//       })
//     }
//   }, [label, ingredientExists])

//   const handleSave = async (event: React.MouseEvent) => {
//     event.preventDefault()
//     const name = ingredientNameToIngredientRecordName(label)
//     await getIngredient(name).then((found) => {
//       if (found) {
//         const imgSrc = `${content}/ingredients/${name}.jpg`
//         saveIngredient({
//           label: ingredientLabel(name, quantity, measure),
//           name,
//           quantity,
//           measure,
//           imgSrc,
//         })
//         setLabel('')
//         setQuantity('')
//       } else {
//         setFeedback({ message: 'Unexpected error', type: 'error' })
//       }
//     })
//   }

//   const handleQuantityChange = (event: React.FormEvent<HTMLInputElement>) => {
//     setQuantity(event.currentTarget.value)
//   }

//   const maxIngredients = totalIngredients === MAX_INGREDIENTS
//   const saveButtonDisabled = !label || !quantity || maxIngredients

//   return (
//     <FormContainer autoComplete="off">
//       <TextInputContainer>
//         <IngredientFormSearch value={label} setLabel={setLabel} disabled={maxIngredients} />
//         {ingredientExists ? (
//           <Button
//             isSubmit={true}
//             iconOnly={true}
//             icon={Save16}
//             disabled={saveButtonDisabled}
//             onClick={handleSave}
//           />
//         ) : (
//           <IngredientS3Uploader
//             setIngredientExists={setIngredientExists}
//             setFeedback={setFeedback}
//             ingredient={label}
//             disabled={ingredientExists}
//           />
//         )}
//       </TextInputContainer>
//       <MeasureInputContainer>
//         <TextInput
//           placeholder="quantity"
//           id="quantity-form-input"
//           required={true}
//           value={quantity}
//           onChange={handleQuantityChange}
//           disabled={maxIngredients}
//         />
//         <Dropdown
//           id="measure-form-dropdown"
//           items={Object.values(Measure)}
//           onChange={(data) => setMeasure(data.selectedItem)}
//           selectedItem={measure}
//           disabled={maxIngredients}
//         />
//       </MeasureInputContainer>
//     </FormContainer>
//   )
// }
