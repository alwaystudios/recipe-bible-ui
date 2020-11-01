import { useState } from 'react'
import { UserFeedbackType, DefaultUserFeedback } from '../types'

export const userFeedback = (): {
  feedback: UserFeedbackType
  setFeedback: React.Dispatch<React.SetStateAction<UserFeedbackType>>
} => {
  const [feedback, setFeedback] = useState<UserFeedbackType>(DefaultUserFeedback)
  return { feedback, setFeedback }
}
