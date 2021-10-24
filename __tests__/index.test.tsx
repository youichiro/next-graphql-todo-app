/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import Home from '../src/pages'

describe('HOME', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'HOGE'
    })

    expect(heading).toBeInTheDocument()
  })
})
