import { readFile } from 'fs/promises'
import { Choice, choiceValue, getResult } from '.'

describe('Task 2', () => {
  it('returns correct score for example input', async () => {
    const input = await readFile('day-2/example.txt', 'binary')

    const rounds = input.split('\n')

    const totalScore = rounds.reduce((sum, round) => sum + getRoundScore2(round), 0)

    expect(totalScore).toBe(12)
  })

  it('returns correct score for file input', async () => {
    const input = await readFile('day-2/input.txt', 'binary')

    const rounds = input.trim().split('\n')

    const totalScore = rounds.reduce((sum, round) => sum + getRoundScore2(round), 0)

    expect(totalScore).toBe(13433)
  })
})

const getRoundScore2 = (round: string): number => {
  const choices = round.split(' ')
  const opponentChoice = choiceValue[choices[0]]
  const myChoice = getMyChoice(opponentChoice, choices[1])

  const resultPoints = getResult(opponentChoice, myChoice)
  return myChoice + resultPoints
}

const getMyChoice = (oppChoice: Choice, result: string): Choice => {
  if (result === 'Y') return oppChoice // Draw

  // I win
  if (result === 'Z') {
    if (oppChoice === Choice.PAPER) return Choice.SCISSORS
    if (oppChoice === Choice.SCISSORS) return Choice.ROCK
    if (oppChoice === Choice.ROCK) return Choice.PAPER
  } else if (result === 'X') {
    // I lose
    if (oppChoice === Choice.PAPER) return Choice.ROCK
    if (oppChoice === Choice.SCISSORS) return Choice.PAPER
    if (oppChoice === Choice.ROCK) return Choice.SCISSORS
  }

  throw 'No lizard/spock allowed'
}
