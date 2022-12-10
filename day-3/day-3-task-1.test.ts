import { readFile } from 'fs/promises'

describe('Task 1', () => {
  it('getPrioValue works', async () => {
    expect(getPrioValue('a')).toBe(1)
    expect(getPrioValue('z')).toBe(26)
    expect(getPrioValue('A')).toBe(27)
    expect(getPrioValue('Z')).toBe(52)
  })

  it('returns correct score for example input', async () => {
    const input = await readFile('day-3/example.txt', 'binary')
    const rucksacks = input.split('\n')

    const sumTotal = getRucksackSum(rucksacks)

    expect(sumTotal).toBe(157)
  })

  it('returns correct score for example input', async () => {
    const input = await readFile('day-3/input.txt', 'binary')
    const rucksacks = input.trim().split('\n')

    const sumTotal = getRucksackSum(rucksacks)

    expect(sumTotal).toBe(7737)
  })
})

describe('Task 2', () => {
  it('returns correct score for example input', async () => {
    const input = await readFile('day-3/example.txt', 'binary')
    const rucksacks = input.trim().split('\n')

    const totalBadgeSum = getBadgeTotal(rucksacks)

    expect(totalBadgeSum).toBe(70)
  })
  it('returns correct score for example input', async () => {
    const input = await readFile('day-3/input.txt', 'binary')
    const rucksacks = input.trim().split('\n')

    const totalBadgeSum = getBadgeTotal(rucksacks)

    expect(totalBadgeSum).toBe(2697)
  })
})

const getPrioValue = (sharedLetter: string): number => {
  const isLowerCase = sharedLetter.toLowerCase() === sharedLetter
  if (isLowerCase) return sharedLetter.charCodeAt(0) - 96
  return sharedLetter.charCodeAt(0) - 38
}

const getArrayIntersection = (array: Array<any>): Array<any> => {
  return array.reduce((a, b) => a.filter((c) => b.includes(c)))
}

const getRucksackSum = (rucksacks: string[]) => {
  return rucksacks.reduce((sum, rucksack) => {
    const lowerCompartment = rucksack.slice(0, rucksack.length / 2)
    const upperCompartment = rucksack.slice(rucksack.length / 2, rucksack.length)

    const intersection = getArrayIntersection([Array.from(lowerCompartment), Array.from(upperCompartment)])

    const sharedLetter = intersection[0]
    const value = getPrioValue(sharedLetter)

    return sum + value
  }, 0)
}

const getBadgeTotal = (rucksacks: string[]): number => {
  const groupSize = 3
  let totalBadgeSum = 0

  for (let i = 0; i < rucksacks.length; i += groupSize) {
    const elfGroup = rucksacks.slice(i, i + groupSize)
    const groupItems = elfGroup.map((rucksack) => Array.from(rucksack))

    const intersection = getArrayIntersection(groupItems)
    const value = getPrioValue(intersection[0])

    totalBadgeSum += value
  }
  return totalBadgeSum
}
