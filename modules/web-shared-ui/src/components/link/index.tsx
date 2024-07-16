import {
  Link as RACLink,
  LinkProps as RACLinkProps,
} from 'react-aria-components'
import { twc } from 'react-twc'

export const Link = twc(RACLink)<RACLinkProps>`underline decoration-blue-600`
