import React from 'react'
import { render } from '@testing-library/react'
import { Spinner } from './index'

describe('Spinner', () => {
	it('hides children when loading', () => {
		const { container, queryByText } = render(
			<Spinner isLoading={true}>
				<div className="content">content</div>
			</Spinner>,
		)
		expect(queryByText('content')).not.toBeInTheDocument()
		expect(container.firstChild).toHaveClass('spinner')
	})

	it('renders children when not loading', () => {
		const { container, getByText } = render(
			<Spinner isLoading={false}>
				<div className="content">content</div>
			</Spinner>,
		)
		expect(getByText('content')).toBeInTheDocument()
		expect(container.firstChild).toHaveClass('content')
	})
})
