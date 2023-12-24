import { ComponentProps, ReactNode, useId } from 'react'
import { FormGroupProvider } from '../form-group/context'
import { Label } from '../label'

type Props = {
  label: ReactNode
} & Omit<ComponentProps<'input'>, 'type'>

export function Checkbox({ label, ...rest }: Props) {
  const generatedId = useId()

  return (
    <FormGroupProvider controlId={rest.id ?? generatedId}>
      <div className="flex gap-3 items-center">
        <input type="checkbox" id={rest.id ?? generatedId} {...rest} />
        <Label>{label}</Label>
      </div>
    </FormGroupProvider>
  )
}
