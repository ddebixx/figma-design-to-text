import { ItemGroup } from '@/components/ui/item'
import { InfoModalStepItem } from '@/features/InfoModal/components/InfoModalStepItem'
import { INFO_MODAL_STEPS } from '@/features/InfoModal/consts/infoModalSteps'

export const InfoModalSteps = () => {
  return (
    <ItemGroup aria-label="Usage steps">
      {INFO_MODAL_STEPS.map((stepDefinition) => (
        <InfoModalStepItem key={stepDefinition.stepId} stepDefinition={stepDefinition} />
      ))}
    </ItemGroup>
  )
}
