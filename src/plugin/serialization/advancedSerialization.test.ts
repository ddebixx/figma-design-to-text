/// <reference types="@figma/plugin-typings" />

import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  installMockFigmaGlobal,
  readSynchronousGetNodeByIdCallCount,
} from '../../test/mockFigmaGlobal'
import { resolveDestinationNodeName } from './resolveDestinationNodeName'
import { serializePrototypeInteractions } from './serializePrototypeInteractions'
import { serializeRelativeTransform } from './serializeRelativeTransform'
import { summarizeAction } from './summarizeAction'
import { summarizeEffects } from './summarizeEffect'
import { summarizeReaction } from './summarizeReaction'
import { summarizeTransition } from './summarizeTransition'
import { summarizeTrigger } from './summarizeTrigger'

beforeEach(() => {
  installMockFigmaGlobal({
    'frame-2': { id: 'frame-2', name: 'Checkout Screen' },
  })
})

describe('summarizeTrigger', () => {
  it('summarizes click trigger', () => {
    const trigger = { type: 'ON_CLICK' } as Trigger

    expect(summarizeTrigger(trigger)).toEqual({ type: 'ON_CLICK' })
  })

  it('summarizes keyboard trigger with device and key codes', () => {
    const trigger = {
      type: 'ON_KEY_DOWN',
      device: 'KEYBOARD',
      keyCodes: [13],
    } as Trigger

    expect(summarizeTrigger(trigger)).toEqual({
      type: 'ON_KEY_DOWN',
      device: 'KEYBOARD',
      keyCodes: [13],
    })
  })
})

describe('summarizeTransition', () => {
  it('summarizes smart animate transition', () => {
    const transition = {
      type: 'SMART_ANIMATE',
      duration: 0.3,
      easing: { type: 'EASE_OUT' },
    } as Transition

    expect(summarizeTransition(transition)).toEqual({
      type: 'SMART_ANIMATE',
      duration: 0.3,
      easing: { type: 'EASE_OUT' },
    })
  })

  it('summarizes directional transition', () => {
    const transition = {
      type: 'MOVE_IN',
      direction: 'LEFT',
      matchLayers: true,
      duration: 0.5,
      easing: { type: 'LINEAR' },
    } as Transition

    expect(summarizeTransition(transition)).toEqual({
      type: 'MOVE_IN',
      direction: 'LEFT',
      matchLayers: true,
      duration: 0.5,
      easing: { type: 'LINEAR' },
    })
  })
})

describe('summarizeAction', () => {
  it('summarizes URL action', async () => {
    const action = {
      type: 'URL',
      url: 'https://example.com',
      openInNewTab: true,
    } as Action

    await expect(summarizeAction(action)).resolves.toEqual({
      type: 'URL',
      url: 'https://example.com',
      openInNewTab: true,
    })
  })

  it('summarizes node navigation with transition and destination name', async () => {
    const action = {
      type: 'NODE',
      destinationId: 'frame-2',
      navigation: 'NAVIGATE',
      transition: {
        type: 'DISSOLVE',
        duration: 0.2,
        easing: { type: 'EASE_IN' },
      },
      resetScrollPosition: true,
    } as Action

    await expect(summarizeAction(action)).resolves.toEqual({
      type: 'NODE',
      navigation: 'NAVIGATE',
      destinationId: 'frame-2',
      destinationName: 'Checkout Screen',
      transition: {
        type: 'DISSOLVE',
        duration: 0.2,
        easing: { type: 'EASE_IN' },
      },
      resetScrollPosition: true,
    })
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('uses the destination id when the lookup resolves to null', async () => {
    const action = {
      type: 'NODE',
      destinationId: 'missing-frame',
      navigation: 'NAVIGATE',
      transition: null,
    } as Action

    await expect(summarizeAction(action)).resolves.toEqual({
      type: 'NODE',
      navigation: 'NAVIGATE',
      destinationId: 'missing-frame',
      destinationName: 'missing-frame',
    })
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('omits destination fields when the destination id is missing or null', async () => {
    const lookup = vi.spyOn(figma, 'getNodeByIdAsync')
    const missingDestination = {
      type: 'NODE',
      navigation: 'NAVIGATE',
      transition: null,
    } as Action
    const nullDestination = {
      type: 'NODE',
      destinationId: null,
      navigation: 'NAVIGATE',
      transition: null,
    } as Action

    await expect(summarizeAction(missingDestination)).resolves.toEqual({
      type: 'NODE',
      navigation: 'NAVIGATE',
    })
    await expect(summarizeAction(nullDestination)).resolves.toEqual({
      type: 'NODE',
      navigation: 'NAVIGATE',
    })
    expect(lookup).not.toHaveBeenCalled()
  })

  it('omits destination fields when the destination id is blank', async () => {
    const lookup = vi.spyOn(figma, 'getNodeByIdAsync')
    const action = {
      type: 'NODE',
      destinationId: '',
      navigation: 'NAVIGATE',
      transition: null,
    } as Action

    await expect(summarizeAction(action)).resolves.toEqual({
      type: 'NODE',
      navigation: 'NAVIGATE',
    })
    expect(lookup).not.toHaveBeenCalled()
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('does not look up destinations for non-node actions', async () => {
    const lookup = vi.spyOn(figma, 'getNodeByIdAsync')

    await expect(
      summarizeAction({
        type: 'URL',
        url: 'https://example.com',
        openInNewTab: true,
      } as Action),
    ).resolves.toEqual({
      type: 'URL',
      url: 'https://example.com',
      openInNewTab: true,
    })
    await expect(summarizeAction({ type: 'BACK' } as Action)).resolves.toEqual({ type: 'BACK' })
    await expect(summarizeAction({ type: 'CLOSE' } as Action)).resolves.toEqual({ type: 'CLOSE' })
    await summarizeAction({ type: 'UPDATE_MEDIA_RUNTIME' } as Action)

    expect(lookup).not.toHaveBeenCalled()
  })
})

describe('summarizeReaction', () => {
  it('summarizes legacy single action reactions', async () => {
    const reaction = {
      trigger: { type: 'ON_CLICK' },
      action: {
        type: 'NODE',
        destinationId: 'frame-2',
        navigation: 'NAVIGATE',
        transition: null,
      },
    } as Reaction

    await expect(summarizeReaction(reaction)).resolves.toEqual({
      trigger: { type: 'ON_CLICK' },
      actions: [
        {
          type: 'NODE',
          navigation: 'NAVIGATE',
          destinationId: 'frame-2',
          destinationName: 'Checkout Screen',
        },
      ],
    })
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('summarizes multi-action reactions in input order and ignores the legacy action', async () => {
    const reaction = {
      trigger: { type: 'ON_HOVER' },
      actions: [
        { type: 'BACK' },
        {
          type: 'NODE',
          destinationId: 'frame-2',
          navigation: 'NAVIGATE',
          transition: null,
        },
      ],
      action: {
        type: 'NODE',
        destinationId: 'other-frame',
        navigation: 'NAVIGATE',
        transition: null,
      },
    } as Reaction

    await expect(summarizeReaction(reaction)).resolves.toEqual({
      trigger: { type: 'ON_HOVER' },
      actions: [
        { type: 'BACK' },
        {
          type: 'NODE',
          navigation: 'NAVIGATE',
          destinationId: 'frame-2',
          destinationName: 'Checkout Screen',
        },
      ],
    })
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })
})

describe('serializePrototypeInteractions', () => {
  it('returns empty record when node has no reactions', async () => {
    const node = { type: 'RECTANGLE', name: 'Box' } as SceneNode

    await expect(serializePrototypeInteractions(node)).resolves.toEqual({})
  })

  it('returns empty record when the reactions list is empty', async () => {
    const node = { type: 'RECTANGLE', name: 'Box', reactions: [] } as unknown as SceneNode

    await expect(serializePrototypeInteractions(node)).resolves.toEqual({})
  })

  it('serializes reactions on interactive nodes', async () => {
    const node = {
      type: 'FRAME',
      name: 'Button',
      reactions: [
        {
          trigger: { type: 'ON_CLICK' },
          actions: [
            {
              type: 'NODE',
              destinationId: 'frame-2',
              navigation: 'NAVIGATE',
              transition: {
                type: 'SMART_ANIMATE',
                duration: 0.4,
                easing: { type: 'GENTLE' },
              },
            },
          ],
        },
      ],
    } as unknown as SceneNode

    await expect(serializePrototypeInteractions(node)).resolves.toEqual({
      reactions: [
        {
          trigger: { type: 'ON_CLICK' },
          actions: [
            {
              type: 'NODE',
              navigation: 'NAVIGATE',
              destinationId: 'frame-2',
              destinationName: 'Checkout Screen',
              transition: {
                type: 'SMART_ANIMATE',
                duration: 0.4,
                easing: { type: 'GENTLE' },
              },
            },
          ],
        },
      ],
    })
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })
})

describe('serializeRelativeTransform', () => {
  it('serializes transform matrix when present', () => {
    const node = {
      type: 'FRAME',
      relativeTransform: [
        [1, 0, 10],
        [0, 1, 20],
      ],
    } as SceneNode

    expect(serializeRelativeTransform(node)).toEqual({
      relativeTransform: [
        [1, 0, 10],
        [0, 1, 20],
      ],
    })
  })
})

describe('resolveDestinationNodeName', () => {
  it('falls back to destination id when node is missing', async () => {
    await expect(resolveDestinationNodeName('missing-frame')).resolves.toBe('missing-frame')
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('falls back to destination id when the node has no name property', async () => {
    installMockFigmaGlobal({
      'nameless-frame': { id: 'nameless-frame' },
    })

    await expect(resolveDestinationNodeName('nameless-frame')).resolves.toBe('nameless-frame')
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })

  it('keeps an empty name', async () => {
    installMockFigmaGlobal({
      'empty-name': { id: 'empty-name', name: '' },
    })

    await expect(resolveDestinationNodeName('empty-name')).resolves.toBe('')
    expect(readSynchronousGetNodeByIdCallCount()).toBe(0)
  })
})

describe('summarizeEffects', () => {
  it('includes blend mode and optional spread on shadows', () => {
    const effects = [
      {
        type: 'DROP_SHADOW',
        visible: true,
        radius: 8,
        color: { r: 0, g: 0, b: 0, a: 0.25 },
        offset: { x: 0, y: 4 },
        blendMode: 'MULTIPLY',
      },
    ] as Effect[]

    expect(summarizeEffects(effects)).toEqual([
      {
        type: 'DROP_SHADOW',
        radius: 8,
        color: 'rgba(0, 0, 0, 0.25)',
        offset: { x: 0, y: 4 },
        blendMode: 'MULTIPLY',
      },
    ])
  })
})
