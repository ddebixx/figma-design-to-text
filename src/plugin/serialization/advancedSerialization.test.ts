/// <reference types="@figma/plugin-typings" />

import { beforeEach, describe, expect, it } from 'vitest'
import { installMockFigmaGlobal } from '../../test/mockFigmaGlobal'
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
  it('summarizes URL action', () => {
    const action = {
      type: 'URL',
      url: 'https://example.com',
      openInNewTab: true,
    } as Action

    expect(summarizeAction(action)).toEqual({
      type: 'URL',
      url: 'https://example.com',
      openInNewTab: true,
    })
  })

  it('summarizes node navigation with transition and destination name', () => {
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

    expect(summarizeAction(action)).toEqual({
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
  })
})

describe('summarizeReaction', () => {
  it('summarizes legacy single action reactions', () => {
    const reaction = {
      trigger: { type: 'ON_CLICK' },
      action: {
        type: 'NODE',
        destinationId: 'frame-2',
        navigation: 'NAVIGATE',
        transition: null,
      },
    } as Reaction

    expect(summarizeReaction(reaction)).toEqual({
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
  })

  it('summarizes multi-action reactions', () => {
    const reaction = {
      trigger: { type: 'ON_HOVER' },
      actions: [{ type: 'BACK' }, { type: 'CLOSE' }],
    } as Reaction

    expect(summarizeReaction(reaction)).toEqual({
      trigger: { type: 'ON_HOVER' },
      actions: [{ type: 'BACK' }, { type: 'CLOSE' }],
    })
  })
})

describe('serializePrototypeInteractions', () => {
  it('returns empty record when node has no reactions', () => {
    const node = { type: 'RECTANGLE', name: 'Box' } as SceneNode

    expect(serializePrototypeInteractions(node)).toEqual({})
  })

  it('serializes reactions on interactive nodes', () => {
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

    expect(serializePrototypeInteractions(node)).toEqual({
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
  it('falls back to destination id when node is missing', () => {
    expect(resolveDestinationNodeName('missing-frame')).toBe('missing-frame')
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
