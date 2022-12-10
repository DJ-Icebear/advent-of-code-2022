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

    const sumTotal = rucksacks.reduce((sum, rucksack) => {
      const lowerCompartment = rucksack.slice(0, rucksack.length / 2)
      const upperCompartment = rucksack.slice(rucksack.length / 2, rucksack.length)

      const intersection = Array.from(lowerCompartment).filter((letter) =>
        Array.from(upperCompartment).includes(letter)
      )

      const sharedLetter = intersection[0]
      const value = getPrioValue(sharedLetter)

      return sum + value
    }, 0)

    expect(sumTotal).toBe(157)
  })
})

const getPrioValue = (sharedLetter: string): number => {
  const isLowerCase = sharedLetter.toLowerCase() === sharedLetter
  if (isLowerCase) return sharedLetter.charCodeAt(0) - 96
  return sharedLetter.charCodeAt(0) - 38
}
