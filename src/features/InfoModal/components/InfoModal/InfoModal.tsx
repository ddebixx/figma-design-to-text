import { Dialog } from '@/components/ui/dialog'
import { InfoModalContent } from '@/features/InfoModal/components/InfoModalContent'
import { InfoModalTrigger } from '@/features/InfoModal/components/InfoModalTrigger'

export const InfoModal = () => {
  return (
    <Dialog>
      <InfoModalTrigger />
      <InfoModalContent />
    </Dialog>
  )
}
