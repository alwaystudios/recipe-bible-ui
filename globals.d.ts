declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

declare type Tokens = {
  accessToken: string
  idToken: string
  expiresAt: number
}

declare type RecipeList = Array<{
  title: string
  imgSrc: string
  onClick: () => void
}>

declare type AssetType = 'recipe' | 'ingredient' | 'step'
