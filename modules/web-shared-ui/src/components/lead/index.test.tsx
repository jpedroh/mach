import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Lead } from '.'

describe('Lead', () => {
  test('applies all classes', () => {
    render(<Lead>Lead text</Lead>)
    expect(screen.getByText('Lead text')).toHaveClass(
      'font-light',
      'text-xl',
      'dark:text-white',
      'text-center'
    )
  })
})
