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

const whatBeats = (choice: Choice): Choice => {
  if (choice === Choice.PAPER) return Choice.SCISSORS
  if (choice === Choice.SCISSORS) return Choice.ROCK
  if (choice === Choice.ROCK) return Choice.PAPER

  throw 'lizards'
}

const getMyChoice = (oppChoice: Choice, result: string): Choice => {
  if (result === 'Y') return oppChoice // Draw
  if (result === 'Z') return whatBeats(oppChoice) // I win
  if (result === 'X') return whatBeats(whatBeats(oppChoice)) // I lose

  throw 'No lizard/spock allowed'
}
