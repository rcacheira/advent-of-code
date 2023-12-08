const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('03.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let gearRatios = 0;

  let previousValues = [];
  let previousSymbolIndexes = [];

  for await (const line of rl) {
    //get current symbols and check them against previous values

    const symbolRegx = /[*]/g
    let symbolIndexes = [];

    while(true){
      const res = symbolRegx.exec(line)
      if(res === null){
        break;
      }

      const symbolIndex = {symbol: res[0], index: res.index, adjacentValues: []}

      previousValues.forEach(value => {
        if(value.adJInitIndex <= symbolIndex.index && value.adjFinalIndex >= symbolIndex.index){
          console.log(value.value)
          symbolIndex.adjacentValues.push(value.value)
        }
      })

      symbolIndexes.push(symbolIndex)
    }

    const valueRegx = /[0-9]+/g
    let values = []

    const allSymbolIndexes = [...previousSymbolIndexes, ...symbolIndexes]

    // get values and check against current and previous line indexes
    
    while(true){
      const res = valueRegx.exec(line)
      if(res === null){
        break;
      }
      const value = {value: parseInt(res[0]), adJInitIndex: res.index-1, adjFinalIndex: res.index+res[0].length}

      allSymbolIndexes.forEach(symbolIndex => {
        if(value.adJInitIndex <= symbolIndex.index && value.adjFinalIndex >= symbolIndex.index ) {
          console.log(value.value)
          symbolIndex.adjacentValues.push(value.value)
        }
      });
      
      values.push(value)
    }

    // check if the symbols on the previous lines have 2 adjacents to count
    
    previousSymbolIndexes.forEach(symbolIndex => {
      if(symbolIndex.adjacentValues.length === 2) {
        gearRatios += (symbolIndex.adjacentValues[0] * symbolIndex.adjacentValues[1])
        console.log({symbolIndex, gearRatios})
      }
    })

    previousValues = values
    previousSymbolIndexes = symbolIndexes
  }

  // check if the symbols on the last lines have 2 adjacents to count

  previousSymbolIndexes.forEach(symbolIndex => {
    if(symbolIndex.adjacentValues.length === 2) {
      gearRatios += (symbolIndex.adjacentValues[0] * symbolIndex.adjacentValues[1])
      console.log({symbolIndex, gearRatios})
    }
  })

  console.log({gearRatios})
}
example();