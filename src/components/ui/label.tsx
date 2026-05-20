import { cva, type VariantProps } from 'class-variance-authority'
import { Label as LabelPrimitive } from 'radix-ui'
import type * as React from 'react'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-foreground',
        info: 'font-normal text-zinc-400',
        success: 'text-emerald-400',
        error: 'text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type LabelProps = React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

const Label = ({ className, variant, ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Label, labelVariants }
