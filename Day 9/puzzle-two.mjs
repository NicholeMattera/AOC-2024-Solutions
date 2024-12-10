import { calculateChecksum, readInput } from './common.mjs'
;(async () => {
  const tableOfContents = await readInput()

  // Convert the table of contents to a map for easier access
  const tableOfContentsMap = {}
  let lastFileIndex = 0
  for (let i = 0; i < tableOfContents.length; i++) {
    tableOfContentsMap[tableOfContents[i].fileIndex] = tableOfContents[i]

    if (tableOfContents[i].fileIndex > lastFileIndex) {
      lastFileIndex = tableOfContents[i].fileIndex
    }
  }

  // Go through the table of contents in reverse order by file index
  for (let fileIndex = lastFileIndex; fileIndex > 0; fileIndex--) {
    const currentFile = tableOfContentsMap[fileIndex]

    // Sorth the table of contents by position
    const sortedToC = Object.values(tableOfContentsMap).sort((a, b) => a.position - b.position)

    // Find a possible position for the current file
    for (let i = 0; i < sortedToC.length - 1; i++) {
      const fileOne = sortedToC[i]
      const fileTwo = sortedToC[i + 1]

      const newPossiblePosition = fileOne.position + fileOne.size
      if (fileTwo.position - newPossiblePosition >= currentFile.size && newPossiblePosition < currentFile.position) {
        currentFile.position = newPossiblePosition
        break
      }
    }
  }

  console.log(calculateChecksum(Object.values(tableOfContentsMap)))
})()
