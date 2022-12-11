import { readFile } from 'fs/promises'

describe('Task 2', () => {
  it('checkOverlap works', async () => {
    expect(checkAnyOverlap(['2-4', '6-8'])).toBe(false)
    expect(checkAnyOverlap(['2-3', '4-5'])).toBe(false)
    expect(checkAnyOverlap(['5-7', '7-9'])).toBe(true)
    expect(checkAnyOverlap(['2-8', '3-7'])).toBe(true)
    expect(checkAnyOverlap(['6-6', '4-6'])).toBe(true)
    expect(checkAnyOverlap(['2-6', '4-8'])).toBe(true)
    expect(checkAnyOverlap(['1-1', '1-2'])).toBe(true)
    expect(checkAnyOverlap(['1-1', '1-1'])).toBe(true)
    expect(checkAnyOverlap(['2-2', '1-2'])).toBe(true)
    expect(checkAnyOverlap(['3-4', '1-2'])).toBe(false)
    expect(checkAnyOverlap(['1-2', '3-4'])).toBe(false)
    expect(checkAnyOverlap(['3-7', '2-8'])).toBe(true)
  })

  it('returns correct score for example input', async () => {
    const input = await readFile('day-4/example.txt', 'binary')
    const elfPairs = input.split('\n')

    const totalOverlappingPairs = elfPairs.reduce((overlappingCount, pairString) => {
      const pairs = pairString.split(',')

      const isOverlapping = checkAnyOverlap(pairs)
      return isOverlapping ? overlappingCount + 1 : overlappingCount
    }, 0)

    expect(totalOverlappingPairs).toBe(4)
  })

  it('returns correct score for example input', async () => {
    const input = await readFile('day-4/input.txt', 'binary')
    const elfPairs = input.trim().split('\n')

    const totalOverlappingPairs = elfPairs.reduce((overlappingCount, pairString) => {
      const pairs = pairString.split(',')

      const isOverlapping = checkAnyOverlap(pairs)
      return isOverlapping ? overlappingCount + 1 : overlappingCount
    }, 0)

    expect(totalOverlappingPairs).toBe(794) // too high
  })
})

const checkAnyOverlap = (pairs: string[]): boolean => {
  const firstPair = pairs[0].split('-')
  const secondPair = pairs[1].split('-')
  const firstPairLow = parseInt(firstPair[0])
  const firstPairHigh = parseInt(firstPair[1])
  const secondPairLow = parseInt(secondPair[0])
  const secondPairHigh = parseInt(secondPair[1])

  if (firstPairHigh < secondPairLow) return false
  if (secondPairHigh < firstPairLow) return false

  return true
}
