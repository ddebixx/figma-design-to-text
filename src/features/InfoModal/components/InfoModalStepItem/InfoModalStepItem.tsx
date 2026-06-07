import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import type { InfoModalStepDefinition } from '@/features/InfoModal/types/infoModalStep'

type InfoModalStepItemProps = {
  stepDefinition: InfoModalStepDefinition
}

export const InfoModalStepItem = ({ stepDefinition }: InfoModalStepItemProps) => {
  const { t } = useTranslation()
  const StepIcon = stepDefinition.icon

  const itemClass = twMerge('border-zinc-800 bg-zinc-900/50', 'hover:bg-zinc-900/50')

  const iconClass = twMerge('text-zinc-400')

  return (
    <Item variant="outline" size="sm" className={itemClass}>
      <ItemMedia variant="icon" className={iconClass} aria-hidden>
        <StepIcon className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-zinc-100">
          {t(`infoModal.steps.${stepDefinition.stepId}.title`)}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-zinc-400">
          {t(`infoModal.steps.${stepDefinition.stepId}.description`)}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
