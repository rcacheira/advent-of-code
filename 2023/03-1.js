const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('03.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let motorValue = 0;

  let previousValues = [];
  let previousSymbolIndexes = [];

  for await (const line of rl) {
    const symbolRegx = /[^0-9.]/g
    let symbolIndexes = [];

    //get current symbols and check them against previous values

    while(true){
      const res = symbolRegx.exec(line)
      if(res === null){
        break;
      }

      previousValues.forEach(value => {
        if(value.adjInitIndex <= res.index && value.adjFinalIndex >= res.index){
          console.log(value.value)
          motorValue+=value.value
        }
      })
      
      symbolIndexes.push(res.index)
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
      const value = {value: parseInt(res[0]), adjInitIndex: res.index-1, adjFinalIndex: res.index+res[0].length}

      allSymbolIndexes.forEach(symbolIndex => {
        if(value.adjInitIndex <= symbolIndex && value.adjFinalIndex >= symbolIndex) {
          console.log(value.value)
          motorValue+=value.value
        }
      });

      values.push(value)
    }

    previousValues = values
    previousSymbolIndexes = symbolIndexes
  }

  console.log({motorValue})
}
example();