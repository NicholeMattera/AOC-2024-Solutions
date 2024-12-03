import fs from 'node:fs/promises'

export async function readParseAndSortInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n')

  // Populate the left and right numbers
  const leftNumbers = []
  const rightNumbers = []
  for (const line of lines) {
    const [leftNumber, rightNumber] = line.split('   ')
    if (leftNumber && rightNumber) {
      leftNumbers.push(parseInt(leftNumber, 10))
      rightNumbers.push(parseInt(rightNumber, 10))
    }
  }

  // Sort the numbers
  leftNumbers.sort()
  rightNumbers.sort()

  return { leftNumbers, rightNumbers }
}
