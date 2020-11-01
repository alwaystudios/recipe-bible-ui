export type NotificationType = 'info' | 'success' | 'error' | 'warning'

export type UserFeedbackType = {
  message: string
  type: NotificationType
}

export const DefaultUserFeedback: UserFeedbackType = {
  message: '',
  type: 'info',
}

export type AssetType = 'recipe' | 'ingredient' | 'step'
