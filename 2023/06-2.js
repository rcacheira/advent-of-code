const { Console } = require('console');
const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('06.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let waysToBeatTheRecord = 0;

  let time;

  for await (const line of rl) {
    const value = parseInt(/^[a-zA-Z]+:\s+([\d\s]+)$/.exec(line)[1].replaceAll(' ', ''))

    if(!time) {
      time = value
      continue;
    }

    for(let i = 0; i < time; i++){
      const distance = (time-i)*i
      if(distance > value /** record */) {
        waysToBeatTheRecord += 1
      }
    }
  }

  console.log({waysToBeatTheRecord})
}
example();