import { getNumberOfSafeReports, readAndParseInput } from './common.mjs'
;(async () => {
  const reports = await readAndParseInput()
  const { safeReports } = getNumberOfSafeReports(reports)

  console.log(safeReports)
})()
