import fs from 'node:fs/promises'

export function calculateChecksum(tableOfContents) {
  let checksum = 0

  for (let i = 0; i < tableOfContents.length; i++) {
    const file = tableOfContents[i]
    for (let j = 0; j < file.size; j++) {
      checksum += file.fileIndex * (file.position + j)
    }
  }

  return checksum
}

export async function readInput() {
  const diskMap = await fs.readFile('./input', 'utf8')

  const tableOfContents = []
  let fileIndex = 0
  let position = 0
  for (let i = 0; i < diskMap.length; i++) {
    const size = parseInt(diskMap.charAt(i), 10)

    if (i % 2 === 0) {
      tableOfContents.push({ fileIndex, position, size })
      fileIndex++
    }

    position += size
  }

  return tableOfContents
}
