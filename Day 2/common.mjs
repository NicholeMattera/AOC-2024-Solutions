import fs from 'node:fs/promises'

const DIRECTION = {
  INCREASING: 1,
  DECREASING: -1,
}

export function getUnsafeLevelIndex(report) {
  let direction
  for (let i = 0; i < report.length - 1; i++) {
    const diff = report[i] - report[i + 1]

    // Check if any two adjacent levels differ by more than 3
    if (Math.abs(diff) > 3) {
      return i
    }

    // Check in any two adjacent levels are not in increasing or decreasing order
    if (diff === 0) {
      return i
    } else if (diff > 0) {
      // Check if the direction is changing
      if (direction === DIRECTION.DECREASING) {
        return i
      }

      direction = DIRECTION.INCREASING
    } else {
      // Check if the direction is changing
      if (direction === DIRECTION.INCREASING) {
        return i
      }

      direction = DIRECTION.DECREASING
    }
  }

  return undefined
}

export function getNumberOfSafeReports(reports) {
  let safeReports = 0
  let unsafeReports = []
  for (const report of reports) {
    if (getUnsafeLevelIndex(report) === undefined) {
      safeReports++
    } else {
      unsafeReports.push(report)
    }
  }

  return { safeReports, unsafeReports }
}

export async function readAndParseInput() {
  const input = await fs.readFile('./input', 'utf8')
  const lines = input.split('\n')

  const reports = []
  for (const report of lines) {
    const levels = report.split(' ')

    if (levels.length !== 1) {
      reports.push(levels.map((level) => parseInt(level, 10)))
    }
  }

  return reports
}
