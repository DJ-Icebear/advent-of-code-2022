import { readFile } from 'fs/promises'
import { choiceValue, getResult } from '.'

describe('Task 1', () => {
  it('returns correct score for example input', async () => {
    const input = await readFile('day-2/example.txt', 'binary')

    const rounds = input.split('\n')

    const totalScore = rounds.reduce((sum, round) => sum + getRoundScore(round), 0)

    expect(totalScore).toBe(15)
  })

  it('returns correct score for input file', async () => {
    const input = await readFile('day-2/input.txt', 'binary')

    const rounds = input.trim().split('\n')

    const totalScore = rounds.reduce((sum, round) => sum + getRoundScore(round), 0)

    expect(totalScore).toBe(13484)
  })
})

const getRoundScore = (round: string): number => {
  const choices = round.split(' ')
  const opponentChoice = choiceValue[choices[0]]
  const myChoice = choiceValue[choices[1]]

  const resultPoints = getResult(opponentChoice, myChoice)
  return myChoice + resultPoints
}
