import fs from 'node:fs/promises'
;(async () => {
  const lines = await fs.readFile('./input', 'utf8')

  const multiplierInstructionRegExp = /(do)\(\)|(don't)\(\)|(mul)\((\d{1,3}),(\d{1,3})\)/g
  const instrcutions = [...lines.matchAll(multiplierInstructionRegExp)]

  let result = 0
  let enabled = true
  for (const instruction of instrcutions) {
    const [_, opcode, arg1, arg2] = instruction.filter((a) => a !== undefined)
    if (opcode === 'do') {
      enabled = true
    } else if (opcode === "don't") {
      enabled = false
    } else if (enabled && opcode === 'mul') {
      result += parseInt(arg1, 10) * parseInt(arg2, 10)
    }
  }

  console.log(result)
})()
