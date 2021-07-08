import { datatype } from 'faker'
import { AuthContextType } from '../src/auth/AuthContext'

export const testTokens = (overrides: Partial<Tokens> = {}): Tokens => ({
  accessToken: datatype.uuid(),
  idToken: datatype.uuid(),
  expiresAt: datatype.number(),
  ...overrides,
})

export const testAuthContext = (overrides: Partial<AuthContextType> = {}): AuthContextType => ({
  sessionId: '',
  user: undefined,
  tokens: testTokens(),
  login: jest.fn(),
  logout: jest.fn(),
  handleAuthentication: jest.fn(),
  tokenExpired: false,
  ...overrides,
})
