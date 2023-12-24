import { createContext, useContext } from 'react'

const FormGroupContext = createContext<{ controlId: string } | undefined>(
  undefined
)

export function useFormGroupContext() {
  const formGroupContext = useContext(FormGroupContext)
  if (!formGroupContext) {
    throw new Error('FormGroupContext was not found')
  }
  return formGroupContext
}

type FormGroupProviderProps = {
  children: React.ReactNode
  controlId: string
}

export function FormGroupProvider({
  children,
  controlId,
}: FormGroupProviderProps) {
  return (
    <FormGroupContext.Provider value={{ controlId }}>
      {children}
    </FormGroupContext.Provider>
  )
}
