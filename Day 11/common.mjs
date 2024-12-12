import fs from 'node:fs/promises'

export function applyBlinkRules(stone) {
  if (stone === 0) {
    return [1]
  } else if (`${stone}`.length % 2 === 0) {
    const stoneAsString = `${stone}`
    return [
      Number(stoneAsString.slice(0, stoneAsString.length / 2)),
      Number(stoneAsString.slice(stoneAsString.length / 2)),
    ]
  }

  return [stone * 2024]
}

export async function readInput(path = './input') {
  const input = await fs.readFile(path, 'utf8')
  return input.split(' ').filter(Boolean).map(Number)
}
