import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from '@/components/ui/item'
import type { InfoModalDetailLevelDefinition } from '@/features/InfoModal/types/infoModalDetailLevel'

type InfoModalDetailLevelItemProps = {
  detailLevelDefinition: InfoModalDetailLevelDefinition
}

export const InfoModalDetailLevelItem = ({
  detailLevelDefinition,
}: InfoModalDetailLevelItemProps) => {
  const { t } = useTranslation()
  const DetailLevelIcon = detailLevelDefinition.icon
  const translationKey = detailLevelDefinition.detailLevel

  const itemClass = twMerge('border-zinc-800 bg-zinc-900/50', 'hover:bg-zinc-900/50')

  const iconClass = twMerge('text-zinc-400')

  return (
    <Item variant="outline" size="sm" className={itemClass}>
      <ItemMedia variant="icon" className={iconClass} aria-hidden>
        <DetailLevelIcon className="size-4" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className="text-zinc-100">
          {t(`infoModal.detailLevels.${translationKey}.title`)}
        </ItemTitle>
        <ItemDescription className="line-clamp-none text-zinc-400">
          {t(`infoModal.detailLevels.${translationKey}.description`)}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
