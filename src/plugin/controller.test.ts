/// <reference types="@figma/plugin-typings" />

import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { PluginMessageType } from '../types/shared'

const postMessage = vi.fn()

let convertSelection: () => Promise<void>

beforeAll(async () => {
  installControllerHost([])
  const controllerModule = await import('./controller')
  convertSelection = controllerModule.convertSelection
})

beforeEach(() => {
  postMessage.mockClear()
})

describe('convertSelection', () => {
  describe('when payload construction fulfills', () => {
    it('posts only the conversion result', async () => {
      installControllerHost([createRectangle('rect-1', 'Box')])

      await convertSelection()

      expect(postMessage).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledWith({
        type: PluginMessageType.CONVERSION_RESULT,
        payload: expect.objectContaining({
          meta: expect.objectContaining({
            fileName: 'Design file',
            pageName: 'Cover',
            selectionCount: 1,
          }),
        }),
      })
    })
  })

  describe('when the main component read rejects', () => {
    it('posts only the plugin error message', async () => {
      installControllerHost([createRejectingInstance()])

      await convertSelection()

      expect(postMessage).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledWith({
        type: PluginMessageType.PLUGIN_ERROR,
        payload: 'Main component unavailable',
      })
    })
  })

  describe('when the destination lookup rejects', () => {
    it('posts only the plugin error message', async () => {
      installControllerHost([createFrameWithDestination()])
      const host = globalThis as typeof globalThis & { figma: PluginAPI }
      host.figma.getNodeByIdAsync = () => Promise.reject(new Error('Destination unavailable'))

      await convertSelection()

      expect(postMessage).toHaveBeenCalledTimes(1)
      expect(postMessage).toHaveBeenCalledWith({
        type: PluginMessageType.PLUGIN_ERROR,
        payload: 'Destination unavailable',
      })
    })
  })
})

function installControllerHost(selection: readonly SceneNode[]): void {
  const host = globalThis as typeof globalThis & {
    __html__: string
    figma: PluginAPI
  }

  host.__html__ = '<div id="root"></div>'
  host.figma = {
    showUI: vi.fn(),
    ui: { postMessage },
    mixed: Symbol('figma.mixed'),
    root: { name: 'Design file' },
    currentPage: {
      name: 'Cover',
      selection,
    },
  } as unknown as PluginAPI
}

function createRectangle(id: string, name: string): SceneNode {
  return {
    id,
    name,
    type: 'RECTANGLE',
    visible: true,
    locked: false,
  } as SceneNode
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

function createFrameWithDestination(): SceneNode {
  return {
    id: 'button-1',
    name: 'Buy',
    type: 'FRAME',
    visible: true,
    locked: false,
    clipsContent: false,
    reactions: [
      {
        actions: [
          {
            type: 'NODE',
            destinationId: 'frame-2',
            navigation: 'NAVIGATE',
            transition: null,
          },
        ],
      },
    ],
  } as unknown as SceneNode
}
