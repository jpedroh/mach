import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { Label } from '.'

describe('Label', () => {
  test('applies all classes', () => {
    render(<Label>Label</Label>)
    expect(screen.getByText('Label')).toHaveClass('dark:text-white')
  })
})
