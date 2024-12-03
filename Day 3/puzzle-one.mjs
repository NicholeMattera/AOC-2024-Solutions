import fs from 'node:fs/promises'
;(async () => {
  const lines = await fs.readFile('./input', 'utf8')

  const multiplierInstructionRegExp = /mul\((\d{1,3}),(\d{1,3})\)/g
  const instructions = [...lines.matchAll(multiplierInstructionRegExp)]

  let result = 0
  for (const instruction of instructions) {
    const [_, arg1, arg2] = instruction
    result += parseInt(arg1, 10) * parseInt(arg2, 10)
  }

  console.log(result)
})()
