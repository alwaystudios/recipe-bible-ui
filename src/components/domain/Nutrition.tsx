import React, { FunctionComponent } from 'react'

export const Nutrition: FunctionComponent = () => <>todo</>

// import styled from 'styled-components'

// const NutritionItem = styled.div`
//   display: flex;
//   margin-bottom: 0.5rem;

//   > p {
//     border: 1px solid #00f;
//     padding: 0.25rem;
//     border-radius: 5%;
//     width: 7rem;
//     margin-right: 0.25rem;
//     text-align: center;
//   }

//   > p:first-of-type {
//     background-color: #3db505;
//     color: white;
//   }
// `

// type ComponentProps = {
//   nutrition: NutritionType
//   className?: string
// }

// export const Nutrition: React.FunctionComponent<ComponentProps> = ({
//   nutrition,
//   className = '',
// }) => {
//   const { salt, carbs, fibre, sugar, protein, satFat, calories, fat } = nutrition
//   return (
//     <div className={className}>
//       <NutritionItem>
//         <p>fat</p>
//         <p>{fat || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>salt</p>
//         <p> {salt || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>carbs</p>
//         <p> {carbs || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>fibre</p>
//         <p> {fibre || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>sugar</p>
//         <p> {sugar || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>protein</p>
//         <p> {protein || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>saturated fat</p>
//         <p> {satFat || `-`}</p>
//       </NutritionItem>
//       <NutritionItem>
//         <p>calories</p>
//         <p> {calories || `-`}</p>
//       </NutritionItem>
//     </div>
//   )
// }
