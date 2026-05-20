export const downloadJson = (data: unknown, fileName: string): void => {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const downloadUrl = URL.createObjectURL(blob)

  const anchorElement = document.createElement('a')
  anchorElement.href = downloadUrl
  anchorElement.download = `${fileName}.json`
  anchorElement.click()

  URL.revokeObjectURL(downloadUrl)
}
