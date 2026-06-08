/// <reference types="@figma/plugin-typings" />

const FIGMA_MIXED = Symbol('figma.mixed')

type MockFigmaNode = {
  id: string
  name: string
}

type MockFigmaGlobal = {
  mixed: typeof FIGMA_MIXED
  getNodeById: (nodeId: string) => MockFigmaNode | null
}

export const createMockFigmaGlobal = (
  nodesById: Record<string, MockFigmaNode> = {},
): MockFigmaGlobal => ({
  mixed: FIGMA_MIXED,
  getNodeById: (nodeId: string) => nodesById[nodeId] ?? null,
})

type GlobalWithFigma = typeof globalThis & {
  figma: PluginAPI
}

export const installMockFigmaGlobal = (nodesById: Record<string, MockFigmaNode> = {}): void => {
  const mockFigma = createMockFigmaGlobal(nodesById)
  const globalWithFigma = globalThis as GlobalWithFigma
  globalWithFigma.figma = mockFigma as unknown as PluginAPI
}
