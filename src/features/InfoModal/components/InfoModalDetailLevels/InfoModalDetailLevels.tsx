import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { ItemGroup } from '@/components/ui/item'
import { InfoModalDetailLevelItem } from '@/features/InfoModal/components/InfoModalDetailLevelItem'
import { INFO_MODAL_DETAIL_LEVELS } from '@/features/InfoModal/consts/infoModalDetailLevels'

export const InfoModalDetailLevels = () => {
  const { t } = useTranslation()

  const sectionClass = twMerge('flex flex-col gap-2')

  const headingClass = twMerge('text-sm font-medium text-zinc-200')

  const descriptionClass = twMerge('text-xs leading-relaxed text-zinc-500')

  return (
    <section aria-labelledby="info-modal-detail-levels-title" className={sectionClass}>
      <h3 id="info-modal-detail-levels-title" className={headingClass}>
        {t('infoModal.detailLevels.heading')}
      </h3>
      <p className={descriptionClass}>{t('infoModal.detailLevels.description')}</p>
      <ItemGroup aria-label={t('infoModal.detailLevels.listLabel')}>
        {INFO_MODAL_DETAIL_LEVELS.map((detailLevelDefinition) => (
          <InfoModalDetailLevelItem
            key={detailLevelDefinition.detailLevel}
            detailLevelDefinition={detailLevelDefinition}
          />
        ))}
      </ItemGroup>
    </section>
  )
}
