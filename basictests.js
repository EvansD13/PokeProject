const moves = require(`./resources/moveDB.json`)
console.log(moves.moves)

const mapped_moves = moves.moves.map(move => move.target.name)
console.log(mapped_moves)

