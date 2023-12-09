const { Console } = require('console');
const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('07.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']

  const getCardValue = (card) => cards.findIndex(_card => _card === card)

  const handValues = [
    ['5'], /** five of a kind */
    ['14', '41'], /** four of a kind */
    ['32', '23'], /** full house */
    ['311', '131', '113'], /** Three of a kind */
    ['221', '212', '122'], /** Two pair */
    ['2111', '1211', '1121', '1112'], /** One pair */
    ['11111'] /** High card */
  ]

  const getHandValue = (handType) => handValues.findIndex(handValueTypes => handValueTypes.includes(handType))

  const hands = []

  for await (const line of rl) {
    const res = /^([\dA-Z]+)\s+([\d]+)$/.exec(line)

    const handCards = res[1]
    const bid = parseInt(res[2])
    const cardCounts = [...handCards].reduce((acc, card) => {
      acc[card] = (acc[card] || 0)+1
      return acc;
    }, {}) 

    let J = cardCounts.J;

    // J 5 is already a five of a kind do not remove
    if(J < 5){
      delete(cardCounts.J)
    }

    const maxType = Math.max(...Object.values(cardCounts))

    // console.log({J, maxType})

    let handType = Object.values(cardCounts).reduce((acc, curr) => acc+curr, '')

    // J 5 is already a five of a kind, don't need replace
    if(J < 5) {
      //replace the first most beneficial
      handType = handType.replace(`${maxType}`, `${maxType+J}`)
    }

    console.log({handCards, cardCounts, handType, bid})

    hands.push({handCards, handType, bid})
  }

  hands.sort((a,b) => {
    let diff = getHandValue(b.handType) - getHandValue(a.handType)
    if(diff === 0) {
      const diffCardIndex = [...a.handCards].findIndex((value, index) => value !== b.handCards.charAt(index))
      diff = getCardValue(b.handCards.charAt(diffCardIndex)) - getCardValue(a.handCards.charAt(diffCardIndex))
    }
    return diff
  })

  // console.log({hands})

  const totalWinning = hands.reduce((acc, hand, index) => acc + hand.bid * (index+1), 0)

  console.log({totalWinning})

}
example();