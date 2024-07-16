import { ComponentProps, ReactNode } from 'react'
import {
  Dialog,
  Heading as RACHeading,
  HeadingProps as RACHeadingProps,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  ModalOverlayProps as RACModalOverlayProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

type Props = {
  children: ReactNode
} & RACModalOverlayProps

const ModalOverlay = twc(
  RACModalOverlay
)`fixed inset-0 z-10 overflow-y-auto bg-black/25 min-h-full md:flex items-center justify-center p-4 md:p-16 text-center backdrop-blur data-[entering]:animate-in data-[entering]:fade-in data-[entering]:duration-300 ease-out`

const Modal = twc(
  RACModal
)`rounded-lg shadow-lg w-full bg-white dark:bg-gray-700 dark:text-white flex flex-col max-w-4xl overflow-hidden text-left align-middle`

export function ModalRoot({ children, ...rest }: Props) {
  return (
    <ModalOverlay {...rest}>
      <Modal>
        <Dialog>{children}</Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export const ModalHeading = twc(RACHeading).attrs<RACHeadingProps>({
  slot: 'title',
})`flex items-start justify-between p-4 border-b border-solid border-gray-300 dark:border-gray-500 text-2xl font-semibold`

export const ModalContent = twc.div<
  ComponentProps<'div'>
>`p-4 dark:text-white gap-2 flex flex-col`

export const ModalFooter = twc.div<ComponentProps<'div'>>`p-4`
