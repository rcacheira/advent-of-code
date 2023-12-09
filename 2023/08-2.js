const { Console } = require('console');
const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('08.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let dirs
  let nextDir
  let currs = []

  const options = {}

  for await (const line of rl) {
    const dirRegx = /^[RL]+$/
    const lineRegx = /^([0-9A-Z]+) = \(([0-9A-Z]+), ([0-9A-Z]+)\)$/

    if(lineRegx.test(line)){
      [all, pos, L, R] = lineRegx.exec(line)
      const option = {pos, L, R}
      if(pos.endsWith('A')){
        currs.push({pos:option})
      }

      options[pos] = option
    }

    if(dirRegx.test(line)){
      dirs = {}
      let last = line.split('').reduce((previous, current) => {
        const next = {dir: current}
        previous.next = next
        return next
      }, dirs)

      // forget the first
      dirs = dirs.next
      // create the circular reference
      last.next = dirs

      // set the next dir
      nextDir = dirs
    }
  }

  steps = 1;

  console.log({options})

  console.log({currs, nextDir})

  /** yes, I tried the obvious option, but I got tired waiting (10 mins...) and I tried to make it faster then I've 
   * suspected that I may need to leave it running for the night to find the answer and even that way I may end up 
   * contributing to the climate change and not finding the answer.
   * 
   * So I re read the statement and only after a plenty of times looking to it, I realized thestatement was showing the 
   * answer by highlighting the Zs showing it loops...
   */

  /** calculate each path steps needed to find z */

  while(currs.some(curr => !curr.reachedz)) {
    currs.forEach(curr => {
      if(!curr.reachedz){
        if(curr.pos[nextDir.dir].endsWith('Z')){
          curr.reachedz = steps
          console.log({curr, nextDir})
        } else {
          curr.pos = options[curr.pos[nextDir.dir]]
        }
      }
    })

    nextDir = nextDir.next
    steps++
  }

  /** calculate the less common multiplier */

  const max = Math.max(...currs.map(curr=>curr.reachedz));
  let lcm = max
  while(currs.some(curr => lcm % curr.reachedz != 0)){
    lcm += max
  }
  console.log({lcm})

}
example();