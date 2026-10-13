/// <reference types="@figma/plugin-typings" />

import { beforeEach, describe, expect, it } from 'vitest'
import {
  installMockFigmaGlobal,
  readSynchronousGetNodeByIdCallCount,
} from '../../test/mockFigmaGlobal'
import { serializeSceneNode } from './serializeSceneNode'

const componentProperties = {
  Label: {
    type: 'TEXT',
    value: 'Buy',
  },
}

type MainComponentIdentity = {
  id: string
  name: string
}

type InstanceFixture = {
  node: SceneNode
  synchronousMainComponentReadCount: () => number
}

type CreateInstanceFixtureInput = {
  id: string
  name: string
  children?: readonly SceneNode[]
  loadMainComponent: () => Promise<MainComponentIdentity | null>
}

beforeEach(() => {
  installMockFigmaGlobal()
})

describe('serializeSceneNode', () => {
  describe('when the main component resolves', () => {
    it('records the main component id and name without reading the synchronous getter', async () => {
      const fixture = createInstanceFixture({
        id: 'instance-1',
        name: 'Buy button',
        loadMainComponent: async () => ({ id: 'component-1', name: 'Button' }),
      })

      const record = await serializeSceneNode(fixture.node)

      expect(record.mainComponentId).toBe('component-1')
      expect(record.mainComponentName).toBe('Button')
      expect(fixture.synchronousMainComponentReadCount()).toBe(0)
    })
  })

  describe('when the main component is missing', () => {
    it('omits main component fields and keeps component properties', async () => {
      const fixture = createInstanceFixture({
        id: 'instance-2',
        name: 'Ghost button',
        loadMainComponent: async () => null,
      })

      const record = await serializeSceneNode(fixture.node)

      expect(record.componentProperties).toEqual(componentProperties)
      expect(record).not.toHaveProperty('mainComponentId')
      expect(record).not.toHaveProperty('mainComponentName')
      expect(fixture.synchronousMainComponentReadCount()).toBe(0)
    })
  })

  describe('when an instance is nested', () => {
    it('omits main component fields on an instance inside a frame', async () => {
      const child = createInstanceFixture({
        id: 'instance-child',
        name: 'Icon',
        loadMainComponent: async () => null,
      })
      const frame = createFrameNode('frame-1', 'Card', [child.node])

      const record = await serializeSceneNode(frame)
      const children = record.children as Array<Record<string, unknown>>

      expect(record.id).toBe('frame-1')
      expect(record.name).toBe('Card')
      expect(record.type).toBe('FRAME')
      expect(children[0]).not.toHaveProperty('mainComponentId')
      expect(children[0]).not.toHaveProperty('mainComponentName')
      expect(children[0]?.componentProperties).toEqual(componentProperties)
      expect(child.synchronousMainComponentReadCount()).toBe(0)
    })

    it('records the main component of an instance nested in an instance', async () => {
      const child = createInstanceFixture({
        id: 'nested-instance',
        name: 'Icon',
        loadMainComponent: async () => ({ id: 'component-icon', name: 'Icon component' }),
      })
      const parent = createInstanceFixture({
        id: 'parent-instance',
        name: 'Button',
        loadMainComponent: async () => ({ id: 'component-button', name: 'Button component' }),
        children: [child.node],
      })

      const record = await serializeSceneNode(parent.node)
      const children = record.children as Array<Record<string, unknown>>

      expect(record.id).toBe('parent-instance')
      expect(record.name).toBe('Button')
      expect(record.type).toBe('INSTANCE')
      expect(children[0]?.mainComponentId).toBe('component-icon')
      expect(children[0]?.mainComponentName).toBe('Icon component')
      expect(child.synchronousMainComponentReadCount()).toBe(0)
      expect(parent.synchronousMainComponentReadCount()).toBe(0)
    })
  })

  describe('when the node is not an instance', () => {
    it('does not add main component fields', async () => {
      const node = {
        id: 'rect-1',
        name: 'Box',
        type: 'RECTANGLE',
        visible: true,
        locked: false,
      } as SceneNode

      const record = await serializeSceneNode(node)

      expect(record).not.toHaveProperty('mainComponentId')
      expect(record).not.toHaveProperty('mainComponentName')
    })
  })

  describe('when the main component read rejects', () => {
    it('rejects serialization of that instance', async () => {
      const fixture = createInstanceFixture({
        id: 'instance-3',
        name: 'Broken button',
        loadMainComponent: () => Promise.reject(new Error('Main component unavailable')),
      })

      await expect(serializeSceneNode(fixture.node)).rejects.toThrow('Main component unavailable')
    })

    it('rejects serialization of a parent when a nested instance rejects', async () => {
      const child = createInstanceFixture({
        id: 'instance-nested-error',
        name: 'Broken icon',
        loadMainComponent: () => Promise.reject(new Error('Main component unavailable')),
      })
      const frame = createFrameNode('frame-2', 'Card', [child.node])

      await expect(serializeSceneNode(frame)).rejects.toThrow('Main component unavailable')
    })
  })

  describe('when a prototype destination resolves', () => {
    it('records the destination name without calling the synchronous lookup', async () => {
      installMockFigmaGlobal({
        'frame-2': { id: 'frame-2', name: 'Checkout Screen' },
      })
      const node = createFrameWithDestination('button-1', 'Buy')

      const record = await serializeSceneNode(node)
      const reactions = record.reactions as Array<{
        actions: Array<Record<string, unknown>>
      }>

      expect(reactions[0]?.actions[0]?.destinationName).toBe('Checkout Screen')
      expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
    })
  })

  describe('when a prototype destination lookup rejects', () => {
    it('rejects serialization of that node', async () => {
      rejectDestinationLookup()

      await expect(
        serializeSceneNode(createFrameWithDestination('button-2', 'Buy')),
      ).rejects.toThrow('Destination unavailable')
    })

    it('rejects serialization of a parent when a child destination lookup rejects', async () => {
      rejectDestinationLookup()
      const child = createFrameWithDestination('button-3', 'Buy')
      const frame = createFrameNode('frame-3', 'Card', [child])

      await expect(serializeSceneNode(frame)).rejects.toThrow('Destination unavailable')
    })
  })
})

function createInstanceFixture(input: CreateInstanceFixtureInput): InstanceFixture {
  let synchronousMainComponentReadCount = 0
  const nodeRecord: Record<string, unknown> = {
    id: input.id,
    name: input.name,
    type: 'INSTANCE',
    visible: true,
    locked: false,
    clipsContent: false,
    componentProperties,
    get mainComponent() {
      synchronousMainComponentReadCount += 1
      throw new Error('mainComponent was read')
    },
    getMainComponentAsync: input.loadMainComponent,
  }

  if (input.children) {
    nodeRecord.children = input.children
  }

  return {
    node: nodeRecord as unknown as SceneNode,
    synchronousMainComponentReadCount: () => synchronousMainComponentReadCount,
  }
}

function createFrameNode(id: string, name: string, children: readonly SceneNode[]): SceneNode {
  return {
    id,
    name,
    type: 'FRAME',
    visible: true,
    locked: false,
    clipsContent: false,
    children,
  } as unknown as SceneNode
}

function createFrameWithDestination(id: string, name: string): SceneNode {
  return {
    id,
    name,
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

function rejectDestinationLookup(): void {
  const host = globalThis as typeof globalThis & { figma: PluginAPI }
  host.figma.getNodeByIdAsync = () => Promise.reject(new Error('Destination unavailable'))
}
