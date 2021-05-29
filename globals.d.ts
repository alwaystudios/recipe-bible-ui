declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

declare type Tokens = {
  accessToken: string
  idToken: string
  expiresAt: number
}
