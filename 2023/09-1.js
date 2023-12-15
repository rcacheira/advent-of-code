const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('09.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let sum = 0;

  for await (const line of rl) {
    let numbers = line.split(' ').map(value => parseInt(value))

    let prediction = 0 // 1819125966

    while(true){
      console.log({numbers})

      let nonZeroDiffSafe = 0

      prediction += numbers.reduce((previous, current) => {
        if(previous === undefined) {
          numbers = []
        } else {
          const diff = current-previous
          nonZeroDiffSafe = nonZeroDiffSafe || diff
          numbers.push(diff)
        }
        return current
      }, undefined)

      if(!nonZeroDiffSafe) break;
    }

    console.log({prediction})

    sum += prediction
  }

  console.log({sum})
}
example();