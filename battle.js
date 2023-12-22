const pokeGen = require(`./pokemon.js`)
const Trainer = require(`./trainer.js`)
const Spinner = require("cli-spinner").Spinner

const player = new Trainer("Emily")
const opponent = new Trainer("Todd")

class Battle{
    constructor(player, opponent){
        this.player = player
        this.opponent = opponent
    }

    turn(player_move, opponent_move){

        if(this.player.stats[5] > this.opponent.stats[5]){
            console.log("Player Faster")
        }else if (this.player.stats[5] < this.opponent.stats[5]){
            console.log("Player Slower")
        }else if (this.player.stats[5] == this.opponent.stats[5]){
            console.log("Speed Tie")
        }
    }
}


function battleText(message){
    return setTimeout(() => {console.log(message)}, 3000)
}

function healthBar(maxHp, currentHp) {
    const percentage = currentHp / maxHp;
    // Calculate the exact length of the filled portion
    const exactFilledLength = 10 * percentage;

    const filledLength = Math.floor(exactFilledLength);
    const needsHalfFill = exactFilledLength - filledLength >= 0.5;

    let bar = "#".repeat(filledLength);
    if (needsHalfFill) {
        bar += "/";
    }

    bar += "-".repeat(10 - bar.length);

    return bar;
}





player.addTeam("popplio", 5); opponent.addTeam("rowlet", 5)

console.log(`Trainer ${opponent.name} would like to battle!`)

setTimeout(() => {console.log(`Trainer ${opponent.name} sent out ${opponent.team[0].name} (Level: ${opponent.team[0].level})!`)}, 3000 )
battleText(`${player.name} sent out ${player.team[0].name}! (Level ${player.team[0].level})`)


let PlayercurrentHp = player.team[0].stats[0]
const playerHPBar = healthBar(player.team[0].stats[0], PlayercurrentHp)
battleText(`Lv ${player.team[0].level} ${player.team[0].name}: \x1b[33m${playerHPBar}\x1b[0m`)

const battle = new Battle(player.team[0], opponent.team[0])
console.log(battle)
battle.turn("a", "b")
/*
To define a battle:
    Player Pokemon + level
    Opponent POkemon + level
*/