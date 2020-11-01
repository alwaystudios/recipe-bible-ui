import React, { FunctionComponent } from 'react'

export const StepForm: FunctionComponent = () => <>todo</>

// import React, { useState } from 'react'
// import { Step } from '../../model/types'
// import { Button } from '../core/Button'
// import { Save16 } from '@carbon/icons-react'
// import styled from 'styled-components'
// import { FileUpload } from '../core/FileUpload'
// import { useS3Upload } from '../../hooks/useS3Upload'
// import { Textarea } from '../core/Textarea'
// import { MAX_STEPS, MAX_STEP_TEXT } from '../../model/recipeValidation'
// import { mediumScreen } from '../layout/breakpoints'

// type ComponentProps = {
//   saveStep: (step: Step) => void
//   recipeTitle: string
//   nextStepIndex: number
// }

// const Container = styled.div`
//   padding: 2rem 0.8rem;
//   display: flex;
//   flex-direction: row;
//   max-width: fit-content;
//   align-items: flex-end;

//   .text-area {
//     width: 30rem;
//   }

//   & button {
//     height: 2rem;
//     border-radius: 0;
//   }

//   & > button:last-of-type {
//     border-left: 1px solid black;
//     border-top-right-radius: 5%;
//     border-bottom-right-radius: 5%;
//   }

//   @media only screen and (max-width: ${mediumScreen}px) {
//     flex-direction: column;
//     .text-area {
//       width: 15rem;
//     }
//   }
// `

// export const StepForm: React.FunctionComponent<ComponentProps> = ({
//   saveStep,
//   recipeTitle,
//   nextStepIndex,
// }) => {
//   const [value, setValue] = useState<string>('')
//   const [imgSrc, setImgSrc] = useState<string>('')

//   const handleStepChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
//     setValue(event.currentTarget.value)
//   }

//   const handleSave = (event: React.MouseEvent) => {
//     event.preventDefault()
//     saveStep({
//       imgSrc,
//       step: value,
//     })
//     setValue('')
//     setImgSrc('')
//   }

//   const { singleFileUpload } = useS3Upload()

//   const handleFileUpload = async (file) => {
//     await singleFileUpload(file, `recipes/${recipeTitle}`, 'step').then((s3Filename) => {
//       setImgSrc(s3Filename)
//     })
//   }

//   const maxSteps = nextStepIndex === MAX_STEPS + 1
//   const disabledButtons = !value || maxSteps

//   const onClick = (event: React.MouseEvent) => {
//     event.preventDefault()
//   }

//   return (
//     <Container>
//       <Textarea
//         rows={3}
//         maxLength={MAX_STEP_TEXT}
//         id="step-form-input"
//         value={value}
//         onChange={handleStepChange}
//         disabled={maxSteps}
//       />
//       <div className="flex-row">
//         <FileUpload
//           accept={'.jpeg, .jpg, .png'}
//           multiple={false}
//           onChange={(files) => handleFileUpload(files[0])}
//         >
//           <Button text="Upload image" onClick={onClick} disabled={disabledButtons} />
//         </FileUpload>
//         <Button iconOnly={true} icon={Save16} onClick={handleSave} disabled={disabledButtons} />
//       </div>
//     </Container>
//   )
// }
