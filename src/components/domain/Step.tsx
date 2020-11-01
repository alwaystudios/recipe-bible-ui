import React, { FunctionComponent } from 'react'

type ComponentProps = {
  index: number
  step: any // StepType
  onDelete?: (step: string) => void
}

export const Step: FunctionComponent<ComponentProps> = () => <>todo</>
// import styled, { css } from 'styled-components'
// import { Step as StepType } from '../../model/types'
// import { Button } from '../core/Button'
// import { TrashCan16 } from '@carbon/icons-react'
// import { CopyToClipboard } from '../core/CopyToClipboard'

// const Container = styled.div`
//   display: flex;
//   flex: 0 100%;
//   align-items: top;
//   justify-content: left;
//   padding: 1rem;
//   font-size: large;

//   & > img {
//     object-fit: cover;
//     width: 7rem;
//     height: 7rem;
//     padding-bottom: 0.5rem;
//     border-radius: 15%;
//     margin-right: 1rem;
//   }

//   & > div {
//     max-width: 20rem;
//   }
// `

// const ImageIndexSpan = styled.span`
//   position: relative;
//   top: -0.2rem;
//   left: 0.5rem;
//   background-color: #4cc912;
//   color: white;
//   height: fit-content;
//   padding: 0.25rem;
//   border-radius: 15%;
// `

// const IndexSpan = styled.span`
//   position: relative;
//   background-color: #4cc912;
//   color: white;
//   height: fit-content;
//   padding: 0.25rem;
//   top: -0.25rem;
//   border-radius: 15%;
//   margin-right: 0.5rem;
//   margin-left: 0.49rem;
// `

// const DeleteSpan = styled.span`
//   ${({ indexOnly }: { indexOnly: boolean }) =>
//     indexOnly
//       ? css`
//           top: -0.5rem;
//           left: -0.25rem;
//         `
//       : css`
//           top: -0.25rem;
//           left: -2.5rem;
//         `}
//   position: relative;

//   & > button {
//     border-radius: 50%;
//   }
// `

// type ComponentProps = {
//   index: number
//   step: StepType
//   onDelete?: (step: string) => void
// }

// export const Step = ({ index, step, onDelete }: ComponentProps) => {
//   const handleDelete = (event: React.MouseEvent) => {
//     event.preventDefault()
//     onDelete(step.step)
//   }

//   return (
//     <Container>
//       {step.imgSrc ? (
//         <>
//           <ImageIndexSpan>{index}</ImageIndexSpan>
//           <img src={step.imgSrc} />
//         </>
//       ) : (
//         <IndexSpan>{index}</IndexSpan>
//       )}
//       {onDelete && (
//         <DeleteSpan indexOnly={!step.imgSrc}>
//           <Button kind="danger" iconOnly={true} icon={TrashCan16} onClick={handleDelete} />
//         </DeleteSpan>
//       )}
//       <div>
//         {step.step}
//         {onDelete && <CopyToClipboard text={step.step} />}
//       </div>
//     </Container>
//   )
// }
