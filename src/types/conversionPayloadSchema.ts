import { z } from 'zod'
import type { JsonObject } from '../utils/isJsonObject'

export const ConversionMetaSchema = z
  .object({
    fileName: z.string(),
    pageName: z.string(),
    exportedAt: z.string(),
    selectionCount: z.number(),
    exportMode: z.string(),
  })
  .passthrough()

export const ConversionNodeSchema = z.record(z.string(), z.unknown())

export const ConversionPayloadSchema = z.object({
  meta: ConversionMetaSchema,
  nodes: z.array(ConversionNodeSchema),
})

export type ConversionMeta = z.infer<typeof ConversionMetaSchema>

export type ConversionNode = z.infer<typeof ConversionNodeSchema>

export type ConversionPayload = z.infer<typeof ConversionPayloadSchema>

export type ExportRenderablePayload = {
  meta: JsonObject
  nodes: JsonObject[]
}
