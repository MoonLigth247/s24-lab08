import { CardStatus } from '../../cards/cardstatus.js'
import { CardOrganizer } from '../cardorganizer.js'

function newRecentMistakesFirstSorter (): CardOrganizer {

  function recentMistakeIndices (cardStatus: CardStatus): number[] {
    const results = cardStatus.getResults()
    const indices: number[] = []
    for (let i = results.length - 1; i >= 0; i--) {
      if (!results[i]) {
        indices.push(i)
      }
    }
    return indices
  }

  function compareByRecentMistakes (a: CardStatus, b: CardStatus): number {
    const indicesA = recentMistakeIndices(a)
    const indicesB = recentMistakeIndices(b)
    const len = Math.min(indicesA.length, indicesB.length)
    for (let i = 0; i < len; i++) {
      if (indicesA[i] !== indicesB[i]) {
        return indicesB[i] - indicesA[i] 
      }
    }
    return indicesA.length - indicesB.length
  }

  return {
    reorganize: function (cards: CardStatus[]): CardStatus[] {
      const c = cards.slice()
      c.sort(compareByRecentMistakes)
      return c
    }
  }
}

export { newRecentMistakesFirstSorter }}
