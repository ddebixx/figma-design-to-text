import { Label } from '@/components/ui/label'
import type { StatusMessageState } from '@/features/Converter/workflow/types/statusMessage'

type ConverterStatusLabelProps = {
  statusMessage: StatusMessageState
}

export const ConverterStatusLabel = ({ statusMessage }: ConverterStatusLabelProps) => {
  if (statusMessage.variant === 'idle') {
    return null
  }

  return (
    <Label
      variant={statusMessage.variant}
      role="status"
      aria-live="polite"
      className="mt-3 block text-xs leading-relaxed"
    >
      {statusMessage.text}
    </Label>
  )
}
