import { getNumberOfSafeReports, getUnsafeLevelIndex, readAndParseInput } from './common.mjs'
;(async () => {
  const reports = await readAndParseInput()
  const { safeReports, unsafeReports } = getNumberOfSafeReports(reports)

  let additionalSafeReports = 0
  for (const report of unsafeReports) {
    const unsafeIndex = getUnsafeLevelIndex(report)
    const { safeReports: newSafeReports } = getNumberOfSafeReports([
      report.toSpliced(unsafeIndex, 1),
      report.toSpliced(unsafeIndex + 1, 1),
    ])
    if (newSafeReports !== 0) {
      additionalSafeReports += 1
    }
  }

  console.log(safeReports + additionalSafeReports)
})()
