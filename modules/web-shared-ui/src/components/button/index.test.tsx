import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Button } from '.'

describe('Button', () => {
  test('applies primary variant by default', () => {
    render(<Button>I am a button</Button>)
    expect(screen.getByRole('button', { name: /i am a button/i })).toHaveClass(
      'bg-blue-600'
    )
  })

  test('applies danger variant', () => {
    render(<Button variant="danger">Danger</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })
})
