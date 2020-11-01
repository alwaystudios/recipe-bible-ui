import React, { FunctionComponent } from 'react'

export const NutritionForm: FunctionComponent = () => <>todo</>
// import { set, lensProp } from 'ramda'
// import styled from 'styled-components'

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 1rem;

//   & .text-input {
//     padding-left: 1rem;
//     padding-bottom: 1rem;
//   }
// `

// type ComponentProps = {
//   nutrition: Nutrition
//   setNutrition: (nutrition: Nutrition) => void
// }

// export const NutritionForm: React.FunctionComponent<ComponentProps> = ({
//   nutrition,
//   setNutrition,
// }) => {
//   const { salt, carbs, fibre, sugar, protein, satFat, calories, fat } = nutrition

//   const handleChange = (
//     event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//     field: string
//   ) => setNutrition(set(lensProp(field), event.currentTarget.value, nutrition))

//   return (
//     <Container>
//       <div>
//         <TextInput onChange={(e) => handleChange(e, 'fat')} label="Fat:" value={fat} />
//         <TextInput onChange={(e) => handleChange(e, 'salt')} label="Salt:" value={salt} />
//         <TextInput onChange={(e) => handleChange(e, 'carbs')} label="Carbs:" value={carbs} />
//         <TextInput onChange={(e) => handleChange(e, 'fibre')} label="Fibre:" value={fibre} />
//       </div>
//       <div>
//         <TextInput onChange={(e) => handleChange(e, 'sugar')} label="Sugar:" value={sugar} />
//         <TextInput onChange={(e) => handleChange(e, 'protein')} label="Protein:" value={protein} />
//         <TextInput
//           onChange={(e) => handleChange(e, 'satFat')}
//           label="Saturated fat:"
//           value={satFat}
//         />
//         <TextInput
//           onChange={(e) => handleChange(e, 'calories')}
//           label="Calories:"
//           value={calories}
//         />
//       </div>
//     </Container>
//   )
// }
