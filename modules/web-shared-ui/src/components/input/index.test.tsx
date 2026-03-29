import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Input } from '.'

describe('Input', () => {
  test('applies all classes', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass(
      'py-2',
      'px-3',
      'pr-[2rem]',
      'rounded-lg',
      'border',
      'grow',
      'dark:bg-gray-600',
      'dark:border-gray-400',
      'dark:text-gray-200',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-blue-400/50'
    )
  })
})
