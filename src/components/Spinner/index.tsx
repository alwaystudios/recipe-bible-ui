import React, { FunctionComponent } from 'react'
import { Wrapper } from './styles'

type Props = {
	isLoading?: boolean
}

export const Spinner: FunctionComponent<Props> = ({ isLoading = true, children }) =>
	isLoading ? <Wrapper className="spinner" /> : <>{children}</>
