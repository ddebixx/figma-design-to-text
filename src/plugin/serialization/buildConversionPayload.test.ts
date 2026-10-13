/// <reference types="@figma/plugin-typings" />

import { describe, expect, it } from 'vitest'
import { buildConversionPayload } from './buildConversionPayload'

const EMPTY_SELECTION_MESSAGE = 'No layers selected. Please select at least one frame or layer.'

describe('buildConversionPayload', () => {
  describe('when one instance is selected', () => {
    it('returns that instance and a selection count of 1', async () => {
      installSelection([createResolvingInstance('instance-1', 'Buy button')])

      const payload = await buildConversionPayload()

      expect(payload.meta).toMatchObject({
        fileName: 'Design file',
        pageName: 'Cover',
        selectionCount: 1,
        exportMode: 'compact',
      })
      expect(payload.nodes).toHaveLength(1)
      expect(payload.nodes[0]).toMatchObject({
        id: 'instance-1',
        mainComponentId: 'component-1',
        mainComponentName: 'Button',
      })
    })
  })

  describe('when nothing is selected', () => {
    it('rejects with the no-selection message', async () => {
      installSelection(createUnserializedSelection())

      await expect(buildConversionPayload()).rejects.toThrow(EMPTY_SELECTION_MESSAGE)
    })
  })

  describe('when the selected instance rejects its main component read', () => {
    it('rejects payload construction with that error', async () => {
      installSelection([createRejectingInstance()])

      await expect(buildConversionPayload()).rejects.toThrow('Main component unavailable')
    })
  })
})

function createUnserializedSelection(): readonly SceneNode[] {
  return Object.assign([] as SceneNode[], {
    map() {
      throw new Error('selection was serialized')
    },
  })
}

function installSelection(selection: readonly SceneNode[]): void {
  const host = globalThis as typeof globalThis & { figma: PluginAPI }
  host.figma = {
    mixed: Symbol('figma.mixed'),
    root: { name: 'Design file' },
    currentPage: {
      name: 'Cover',
      selection,
    },
  } as unknown as PluginAPI
}

function createResolvingInstance(id: string, name: string): SceneNode {
  return {
    id,
    name,
    type: 'INSTANCE',
    visible: true,
    locked: false,
    clipsContent: false,
    componentProperties: {},
    get mainComponent() {
      throw new Error('mainComponent was read')
    },
    getMainComponentAsync: async () => ({ id: 'component-1', name: 'Button' }),
  } as unknown as SceneNode
}

function createRejectingInstance(): SceneNode {
  return {
    id: 'instance-error',
    name: 'Broken button',
    type: 'INSTANCE',
    visible: true,
    locked: false,
    clipsContent: false,
    componentProperties: {},
    getMainComponentAsync: () => Promise.reject(new Error('Main component unavailable')),
  } as unknown as SceneNode
}
