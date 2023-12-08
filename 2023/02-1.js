const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('02.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("12 red cubes, 13 green cubes, and 14 blue cubes")
  const max = [12 /** red*/, 13 /** green*/, 14 /** blue*/];

  let value = 0;

  for await (const line of rl) {
    const gameId = parseInt(/Game (\d+)/.exec(line)[1])
    let gameIdForTheMath = gameId
    const regs = [/((\d+) red)/g, /((\d+) green)/g, /((\d+) blue)/g]

    console.log(line)
    
    for(let i = 0; i<max.length; i++){
      while(true){
        const res = regs[i].exec(line)
        if(!res){
          break;
        } 
        if(parseInt(res[2]) > max[i]){
          console.log("failing by: ", res[2], ">", max[i])
          gameIdForTheMath = 0;
          break;
        }
      }
      if(!gameIdForTheMath){
        break;
      }
    }

    value += gameIdForTheMath
    console.log({gameId, gameIdForTheMath, value})
  }

  console.log({value})
}
example();