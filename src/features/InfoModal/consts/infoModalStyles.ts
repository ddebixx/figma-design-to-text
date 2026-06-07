import { twMerge } from 'tailwind-merge'
import { LANGUAGE_TRIGGER_CLASS } from '@/features/Converter/consts/styles'

export const INFO_MODAL_TRIGGER_CLASS = twMerge(LANGUAGE_TRIGGER_CLASS, 'text-zinc-300')

export const INFO_MODAL_CONTENT_CLASS =
  'max-h-[min(32rem,calc(100vh-2rem))] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100 ring-zinc-800 sm:max-w-lg'

export const INFO_MODAL_WARNING_CLASS =
  'rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-3 text-amber-100'
