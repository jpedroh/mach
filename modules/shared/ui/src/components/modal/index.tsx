import { ComponentPropsWithoutRef, HTMLProps, ReactNode } from 'react'
import {
  Dialog,
  Heading,
  ModalOverlay,
  Modal as ReactAriaComponentsModal,
} from 'react-aria-components'

type Props = {
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<typeof ModalOverlay>, 'classname'>

export function Modal({ children, ...rest }: Props) {
  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) => `
    fixed inset-0 z-10 overflow-y-auto bg-black/25 min-h-full md:flex items-center justify-center p-4 md:p-16 text-center backdrop-blur
    ${isEntering ? 'animate-in fade-in duration-300 ease-out' : ''}
    ${isExiting ? 'animate-out fade-out duration-200 ease-in' : ''}
    `}
      {...rest}
    >
      <ReactAriaComponentsModal
        className={({ isEntering, isExiting }) => `
            rounded-lg shadow-lg w-full bg-white dark:bg-gray-700 dark:text-white flex flex-col max-w-4xl
            overflow-hidden text-left align-middle
            ${isEntering ? 'animate-in zoom-in-95 ease-out duration-300' : ''}
            ${isExiting ? 'animate-out zoom-out-95 ease-in duration-200' : ''}
          `}
      >
        <Dialog role="alertdialog" className="outline-none relative">
          {children}
        </Dialog>
      </ReactAriaComponentsModal>
    </ModalOverlay>
  )
}

export function ModalHeading({ children }: { children: ReactNode }) {
  return (
    <Heading
      slot="title"
      className="flex items-start justify-between p-4 border-b border-solid border-gray-300 dark:border-gray-500 text-2xl font-semibold"
    >
      {children}
    </Heading>
  )
}

export function ModalContent({ children, className = '', ...rest }: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div className={`p-4 dark:text-white gap-2 flex flex-col ${className}`} {...rest}>{children}</div>
  )
}

export function ModalFooter({ children, className = '', ...rest }: { children: ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div className={`p-4 ${className}`} {...rest}>{children}</div>
  )
}
