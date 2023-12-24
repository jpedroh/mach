'use client'

import {
  ComboBox,
  ComboBoxProps,
  ListBox,
  Popover,
} from 'react-aria-components'
import { Button } from '../button'
import { Input } from '../input'
import { Label } from '../label'
import { SelectOption } from './option'
import { Option } from './types'

type Props = { label: string } & Omit<ComboBoxProps<Option>, 'children'>

export function Select({ label, ...props }: Props) {
  return (
    <ComboBox className={'grid gap-2'} {...props}>
      <Label>{label}</Label>
      <div className="flex">
        <Input className={'flex-grow'} />
        <Button className={'!w-fit ml-[-1.714rem] border dark:border-gray-400'}>
          ▼
        </Button>
      </div>
      <Popover
        className={
          'max-h-[20rem] overflow-auto rounded-lg border dark:border-gray-400'
        }
      >
        <ListBox<Option>>
          {(item) => <SelectOption>{item.name}</SelectOption>}
        </ListBox>
      </Popover>
    </ComboBox>
  )
}
