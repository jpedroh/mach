import type { ReactNode } from 'react'
import {
  ListBox,
  ComboBox as RACComboBox,
  type ComboBoxProps as RACComboBoxProps,
  Popover as RACPopover,
} from 'react-aria-components'
import { twc } from 'react-twc'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { SelectOption } from './option'
import type { Option } from './types'

type Props = { label: string } & Omit<
  RACComboBoxProps<Option>,
  'children' | 'className'
>

const Popover = twc(
  RACPopover
)`max-h-[20rem] overflow-auto rounded-lg border dark:border-gray-400`

const OpenPopoverButton = twc(Button)(
  ({ isOpen }: { isOpen: boolean; children: ReactNode }) => `
  !w-fit ml-[-1.714rem] border dark:border-gray-400
  *:transition-all *:inline-block ${isOpen ? '*:rotate-180' : ''}
`
)

const ComboBox = twc(RACComboBox)`grid gap-2`

export function Select({ label, ...props }: Props) {
  return (
    <ComboBox {...props}>
      {({ isOpen }) => {
        return (
          <>
            <Label>{label}</Label>
            <div className="flex">
              <Input className={'grow'} placeholder="Select" />
              <OpenPopoverButton isOpen={isOpen}>
                <span>▼</span>
              </OpenPopoverButton>
            </div>
            <Popover>
              <ListBox<Option>>
                {(item) => <SelectOption>{item.name}</SelectOption>}
              </ListBox>
            </Popover>
          </>
        )
      }}
    </ComboBox>
  )
}
