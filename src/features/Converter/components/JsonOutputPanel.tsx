import { ChevronDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { JsonCodeView } from '@/features/Converter/components/JsonCodeView'
import {
  CODE_PANEL_CLASS,
  OUTLINE_BUTTON_CLASS,
} from '@/features/Converter/consts/glassPanelStyles'
import type { ExportOutputFormat } from '@/features/Converter/export/types/exportSettings'

type JsonOutputPanelProps = {
  previewOutput: string
  hasPreviewOutput: boolean
  outputFormat: ExportOutputFormat
}

export const JsonOutputPanel = ({
  previewOutput,
  hasPreviewOutput,
  outputFormat,
}: JsonOutputPanelProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(hasPreviewOutput)

  useEffect(() => {
    function openPanelWhenOutputAvailable() {
      if (hasPreviewOutput) {
        setIsOpen(true)
      }
    }

    openPanelWhenOutputAvailable()
  }, [hasPreviewOutput])

  const chevronClass = twMerge('size-4 text-zinc-500 transition-transform', isOpen && 'rotate-180')

  const triggerClass = twMerge(
    OUTLINE_BUTTON_CLASS,
    'flex h-9 w-full items-center justify-between px-3 text-xs font-medium',
  )

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button type="button" variant="outline" className={triggerClass} aria-expanded={isOpen}>
          <span className="text-zinc-200">{t('output.title')}</span>
          <ChevronDownIcon className={chevronClass} aria-hidden />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 flex flex-col gap-2">
        <p className="text-[11px] text-zinc-500">
          {t(`export.outputFormat.options.${outputFormat}.hint`)}
        </p>
        <div className={CODE_PANEL_CLASS}>
          <JsonCodeView
            previewOutput={previewOutput}
            hasPreviewOutput={hasPreviewOutput}
            outputFormat={outputFormat}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
