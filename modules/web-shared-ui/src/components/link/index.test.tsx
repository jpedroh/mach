import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Link } from '.'

describe('Link', () => {
  test('applies all classes', () => {
    render(<Link>Link</Link>)
    const link = screen.getByRole('link')
    expect(link).toHaveClass('underline', 'decoration-blue-600')
  })
})
