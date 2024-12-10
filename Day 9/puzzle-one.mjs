import { calculateChecksum, readInput } from './common.mjs'
;(async () => {
  const tableOfContents = await readInput()

  // Loop through the table of contents and fill the gaps between files
  for (let i = 0; i < tableOfContents.length - 1; i++) {
    const currentFile = tableOfContents[i]
    const nextFile = tableOfContents[i + 1]

    // Calculate the gap between the current file and the next file
    let gap = nextFile.position - (currentFile.position + currentFile.size)
    let gapFilled = 0
    let gapIndex = i + 1

    // Loop till the gap is filled
    while (gap > 0) {
      const lastFile = tableOfContents[tableOfContents.length - 1]

      if (lastFile.size <= gap) {
        tableOfContents.splice(gapIndex, 0, {
          fileIndex: lastFile.fileIndex,
          position: currentFile.position + currentFile.size + gapFilled,
          size: lastFile.size,
        })
        gap -= lastFile.size
        gapFilled += lastFile.size
        gapIndex++
        tableOfContents.pop()
      } else {
        tableOfContents.splice(gapIndex, 0, {
          fileIndex: lastFile.fileIndex,
          position: currentFile.position + currentFile.size + gapFilled,
          size: gap,
        })
        lastFile.size -= gap
        gap = 0
      }
    }
  }

  console.log(calculateChecksum(tableOfContents))
})()
