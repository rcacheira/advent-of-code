const fs = require('fs');
const readline = require('readline');

async function example() {
  const fileStream = fs.createReadStream('05.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let value = 0;

  let seeds = []

  let currentCategorie;

  for await (const line of rl) {
    const seedsRegx = /^[a-z]+:\s([\d\s]+)$/
    const titleRegx = /^([a-z]+)-to-([a-z]+) map:$/
    const valuesRegx = /^([\d\s]+)$/

    console.log({line})

    if(line.match(valuesRegx)){
      const [destination, source, length] = valuesRegx.exec(line)[1].split(' ')
      const map = {
        initial: parseInt(source),
        final: parseInt(source)+parseInt(length)-1,
        match: destination-source
      }

      console.log({map})
      
      seeds.forEach(seed => {
        const value = seed[currentCategorie.from] || seed[seed.lastAffected]
        if(value >= map.initial && value <= map.final){
          seed[currentCategorie.to] = value + map.match
          seed.lastAffected = currentCategorie.to
        }
      })

      console.log({seeds})

      continue;
    }

    if(line.match(titleRegx)){
      const res = titleRegx.exec(line)
      currentCategorie = {from: res[1], to: res[2]}
      continue;
    }

    if(line.match(seedsRegx)){
      seeds = seedsRegx.exec(line)[1].split(' ').map(seed => ({
        seed: parseInt(seed),
        lastAffected: 'seed'
      }))

      console.log({seeds})
      
      continue;
    }
  }
  console.log({seeds})

  const locations = seeds.map(seed => seed.location || seed[seed.lastAffected])

  console.log({locations})

  value = Math.min(...locations)

  console.log({value})
}
example();