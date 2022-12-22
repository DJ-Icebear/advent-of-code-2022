import { readFile } from 'fs/promises'

describe('Task 1', () => {
  it('hasDupes', async () => {
    expect(hasDuplicates('bvwb')).toBe(true)
    expect(hasDuplicates('bvwa')).toBe(false)
    expect(hasDuplicates('avbb')).toBe(true)
    expect(hasDuplicates('abcd')).toBe(false)
    expect(hasDuplicates('cbcd')).toBe(true)
  })

  it('returns correct string for example input', async () => {
    expect(getMyResponse('mjqjpqmgbljsphdztnvjfqwrcgsmlb')).toBe(7)
    expect(getMyResponse('bvwbjplbgvbhsrlpgdmjqwftvncz')).toBe(5)
    expect(getMyResponse('nppdvjthqldpwncqszvftbrmjlhg')).toBe(6)
    expect(getMyResponse('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg')).toBe(10)
    expect(getMyResponse('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw')).toBe(11)
    expect(getMyResponse('abcv')).toBe(4)
  })

  it('returns correct string for first task file input', async () => {
    const input = await readFile('day-6/input.txt', 'binary')
    expect(getMyResponse(input)).toBe(1850)
  })
})

const getMyResponse = (input: string): number | null => {
  const sectionLength = 4

  for (let index = 0; index < input.length; index++) {
    const section = input.slice(index, index + sectionLength)

    if (!hasDuplicates(section)) return index + sectionLength
  }
  return null
}

const hasDuplicates = (section: string): boolean => {
  return section.split('').some((letter) => {
    return section.indexOf(letter) !== section.lastIndexOf(letter) ? true : false
  })
}
