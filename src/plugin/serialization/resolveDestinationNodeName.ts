export const resolveDestinationNodeName = (destinationId: string): string => {
  const destinationNode = figma.getNodeById(destinationId)

  if (!destinationNode || !('name' in destinationNode)) {
    return destinationId
  }

  return destinationNode.name
}
