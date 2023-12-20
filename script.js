const axios = require('axios')
const fs=require('fs/promises')

async function loopThroughPokemon(moveArray,startIndex){
  console.log(`commencing for starting index ${startIndex}`)
  if (moveArray.length<=startIndex) {
    console.log('compilation complete!')
    return
  }
  sample=moveArray.slice(startIndex,startIndex+25)
  console.log(sample)
  console.log('requesting...')
  data= await Promise.all(sample.map((move,i)=>axios.get(`https://pokeapi.co/api/v2/move/${i+1+startIndex}`)))
  console.log('reading...')
  startIndex += 25

  fs.readFile(`${__dirname}/moveDB.json`,'utf-8')
    .then(file=>{
      parsedFile=JSON.parse(file)
      console.log('processing new data...')
      data.map(entry=>entry.data).forEach((move,i)=>{
        delete move.contest_combos
        delete move.context_effect
        delete move.contest_type
        delete move.generation
        delete move.names
        delete move.past_values
        delete move.super_contest_effect

        
        parsedFile.moves.push(move)
      })
      console.log('writing...')
      return fs.writeFile(`${__dirname}/moveDB.json`,JSON.stringify(parsedFile),'utf-8')
    }).then(()=>{
      console.log('wait 30 seconds to allow server to relax :)')
      setTimeout(()=>loopThroughPokemon(moveArray,startIndex+25),30000)
    }).catch(()=>{
      console.log('error, rejected by server. Trying again in 60 seconds...')
      setTimeout(()=>loopThroughPokemon(moveArray,startIndex),60000)
    })
}

axios.get('https://pokeapi.co/api/v2/move?limit=1000')
  .then(res=>res.data.results.map(move=>move.url))
  .then(move=>{
    return loopThroughPokemon(move,0)
  })