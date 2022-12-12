export type CrateArray = Array<Array<string>>

export const getTopCrates = (crateArray: CrateArray): string => crateArray.reduce((acc, stack) => acc + stack.pop(), '')

export const getCrateArray = (crateString: string): CrateArray => {
  const rows = crateString.split('\n').reverse()
  const numbersRow = rows.shift() as string

  const numberOfStacks = parseInt(numbersRow[numbersRow.length - 2] as string)
  const stacks: CrateArray = new Array(numberOfStacks).fill(0).map((_) => [])

  const rowLength = rows[0].length

  rows.forEach((row) => {
    for (
      let letterPosition = 1, currentStack = 0;
      letterPosition < rowLength;
      letterPosition = letterPosition + 4, currentStack++
    ) {
      const letter = row[letterPosition]
      if (letter !== ' ') stacks[currentStack].push(letter)
    }
  })
  return stacks
}
