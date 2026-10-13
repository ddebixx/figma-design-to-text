export const resolveDestinationNodeName = async (destinationId: string): Promise<string> => {
  const destinationNode = await figma.getNodeByIdAsync(destinationId)

  if (!destinationNode || !('name' in destinationNode)) {
    return destinationId
  }

  return destinationNode.name
}
