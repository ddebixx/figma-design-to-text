import { type JsonRecord, serializeFigmaValue } from './jsonValue'

export const summarizeTrigger = (trigger: Trigger): JsonRecord => {
  const summary: JsonRecord = {
    type: trigger.type,
  }

  if ('device' in trigger) {
    summary.device = trigger.device
  }

  if ('keyCodes' in trigger) {
    summary.keyCodes = serializeFigmaValue(trigger.keyCodes)
  }

  if ('timeout' in trigger) {
    summary.timeout = trigger.timeout
  }

  if ('delay' in trigger) {
    summary.delay = trigger.delay
  }

  if ('mediaHitTime' in trigger) {
    summary.mediaHitTime = trigger.mediaHitTime
  }

  return summary
}
