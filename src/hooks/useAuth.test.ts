import { act, renderHook } from '@testing-library/react-hooks'
import auth0 from 'auth0-js'
import { mocked } from 'ts-jest/utils'
import { useAuth } from './useAuth'

const mockAuth = mocked(auth0)

const authorize = jest.fn()
const logout = jest.fn()
const parseHash = jest.fn()

mockAuth.WebAuth = jest.fn().mockImplementation(() => ({
	authorize,
	logout,
	parseHash,
}))

describe('useAuth', () => {
	beforeEach(jest.clearAllMocks)

	it('should default to not authenticated', () => {
		const { result } = renderHook(() => useAuth())

		expect(result.current.user).toBe(undefined)
		expect(result.current.tokens).toBe(undefined)

		expect(mockAuth.WebAuth).toHaveBeenCalledTimes(1)
		expect(mockAuth.WebAuth).toHaveBeenCalledWith({
			domain: process.env.AUTH0_DOMAIN,
			clientID: process.env.AUTH0_CLIENTID,
			redirectUri: process.env.AUTH0_CALLBACK,
			responseType: 'token id_token',
			scope: 'openid profile email',
		})
	})

	it('should handle login', () => {
		authorize.mockReturnValueOnce(undefined)
		const { result } = renderHook(() => useAuth())

		act(() => result.current.login())

		expect(authorize).toHaveBeenCalledTimes(1)
	})

	it('should handle logout', () => {
		logout.mockReturnValueOnce(undefined)
		const { result } = renderHook(() => useAuth())

		act(() => result.current.logout())

		expect(logout).toHaveBeenCalledTimes(1)
		expect(logout).toHaveBeenCalledWith({
			returnTo: process.env.BASE_URL,
		})
		expect(result.current.user).toBe(undefined)
		expect(result.current.tokens).toBe(undefined)
	})

	it('should handle authentication', () => {
		parseHash.mockReturnValueOnce(undefined)
		const { result } = renderHook(() => useAuth())

		act(() => result.current.handleAuthentication())

		expect(parseHash).toHaveBeenCalledTimes(1)
	})
})
