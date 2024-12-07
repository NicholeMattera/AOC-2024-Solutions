import { readInput } from './common.mjs'

function testEquation(testValue, numbers, value, index) {
  if (index === numbers.length) {
    return value === testValue
  }

  return (
    testEquation(testValue, numbers, value + numbers[index], index + 1) ||
    testEquation(testValue, numbers, value * numbers[index], index + 1) ||
    testEquation(testValue, numbers, Number(`${value}${numbers[index]}`), index + 1)
  )
}

;(async () => {
  const equations = await readInput()

  let totalCalibration = 0
  for (const equation of equations) {
    if (testEquation(equation.testValue, equation.numbers, equation.numbers[0], 1)) {
      totalCalibration += equation.testValue
    }
  }

  console.log(totalCalibration)
})()
