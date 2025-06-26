import { render, screen } from '@testing-library/react'
import { randomUUID } from 'crypto'
import { describe, expect, test } from 'vitest'
import { SimBriefButton } from '.'

describe('SimBriefButton', () => {
  test('It builds the correct URL for Simbrief', () => {
    const flight = {
      id: randomUUID(),
      company: 'GLO',
      flightNumber: 1827,
      aircraftIcaoCode: 'B38M',
      aircraftEquipment: 'SDGRWY',
      aircraftWakeTurbulence: 'M',
      departureIcao: 'SBRF',
      arrivalIcao: 'SBGR',
      route: 'DCT',
      estimatedEnrouteMinutes: 125,
      cruisingLevel: 380,
      remarks: 'MACH',
    } as const

    render(<SimBriefButton flight={flight} />)

    const button: HTMLAnchorElement = screen.getByRole('link')

    expect(button).toHaveAttribute(
      'href',
      `http://www.simbrief.com/system/dispatch.php?airline=GLO&fltnum=1827&type=B38M&orig=SBRF&dest=SBGR&route=DCT&steh=2&stem=5&fl=38000&manualrmk=MACH`
    )
  })
})
