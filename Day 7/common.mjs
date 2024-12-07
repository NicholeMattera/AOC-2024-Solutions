import fs from 'node:fs/promises'

export async function readInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n')

  const equations = []
  for (const line of lines) {
    if (!line.includes(': ')) {
      continue
    }

    const [testValue, numbersString] = line.split(': ')
    const numbers = numbersString.split(' ').map(Number)

    equations.push({ testValue: Number(testValue), numbers })
  }

  return equations
}
