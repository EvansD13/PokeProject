const pokeGen = require(`./pokemon.js`)
const Trainer = require(`./trainer.js`)
const Spinner = require("cli-spinner").Spinner
//const inquirer = require("inquirer")
const player = new Trainer("Emily")
const opponent = new Trainer("Todd")

class BattleMenu{
    constructor(player_moves){
        this.baseOptions={
            "Fight": 1,
            "Pok\'emon": 2,
            "Bag": 3,
            "Run": null
        }
    }
}


class Battle{
    constructor(player, opponent){
        this.player = player
        this.opponent = opponent
    }
    damageCalc(move, attacker, defender){
        const level = attacker.level
        const accuracy = move.accuracy
        const dc = move.damage_class.name
        const power = move.power
        let attack; let defense

        if (dc == "physical"){
            attack = attacker.stats[1]
            defense = defender.stats[2]
        }else if (dc == "special"){
            attack = attacker.stats[3]
            defense = defender.stats[4]
        }

        let STAB
        (attacker.types.includes(pokeGen.capitalisation(move.type.name)) ? STAB = 1.5 : STAB = 1)
            
        const random = Math.floor(Math.random() * (16) + 85)
        let crit; let critical_role = Math.floor(Math.random() * 100 + 1)
        switch(move.meta.crit_rate){
            case 0:
                (critical_role < 5 ? crit = 1.5 : crit = 1)
                break
            case 1:
                (critical_role < 13 ? crit = 1.5 : crit = 1)
                break
            case 2:
                (critical_role < 50 ? crit = 1.5 : crit = 1)
                break
            case 3:
                crit = 1.5
                break
            case 4:
                crit = 1.5
                break
        }
        const damage = Math.floor((((((2 * level)/5) + 2) * power * attack/defense)/50 + 2) * crit * random/100 * STAB)
        defender.takeDamage(damage)
        let color
        (defender == player.team[0] ? color = "\x1b[33m" : color = "\x1b[31m") 
        battleText(`${attacker.name} used ${pokeGen.capitalisation(move.name)}!`)
        battleText(`${defender.name} HP:  ${color}${healthBar(defender.stats[0], defender.currentHP)}\x1b[0m`)
        
    }

    turn(player_move, opponent_move){
        if(this.player.stats[5] > this.opponent.stats[5]){
            this.damageCalc(player_move, player, opponent)
            if (this.opponent.currentHP <= 0){
                return
            }else{
                this.damageCalc(opponent_move, this.opponent, this.player)
            }
        }else if (this.player.stats[5] < this.opponent.stats[5]){
            this.damageCalc(opponent_move, this.opponent, this.player)
                if (this.player.currentHP <= 0){
                    return
                }else{
                    this.damageCalc(player_move, this.player, this.opponent)
                }
        }else if (this.player.stats[5] == this.opponent.stats[5]){
            const goes_first = Math.floor(Math.random() * 2)
            if (goes_first == 0){
                this.damageCalc(player_move, this.player, this.opponent)
                if (this.opponent.currentHP <= 0){
                    return
                }else{
                    this.damageCalc(opponent_move, this.opponent, this.player)
                }
            }else{
                this.damageCalc(opponent_move, this.opponent, this.player)
                if (this.player.currentHP <= 0){
                    return
                }else{
                    this.damageCalc(player_move, this.player, this.opponent)
                }
            }
             
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





player.addTeam("popplio", 5); opponent.addTeam("rowlet", 5) /// Adds levelled pokemon to respective teams
player.team[0].addMoves("pound"); opponent.team[0].addMoves("peck") // Assigns a basic move to each pokemon


console.log(`Trainer ${opponent.name} would like to battle!`)

setTimeout(() => {console.log(`Trainer ${opponent.name} sent out ${opponent.team[0].name} (Level ${opponent.team[0].level})!`)}, 3000 )
battleText(`${player.name} sent out ${player.team[0].name}! (Level ${player.team[0].level})`)

//Slightly aesthetic health bar 
let playerHPBar = healthBar(player.team[0].stats[0], player.team[0].currentHP)
let opponentHPBar = healthBar(opponent.team[0].stats[0], opponent.team[0].currentHP)


battleText(`Lv ${player.team[0].level} ${player.team[0].name}: \x1b[33m${playerHPBar}\x1b[0m`)
battleText(`Lv ${opponent.team[0].level} ${opponent.team[0].name}: \x1b[31m${opponentHPBar}\x1b[0m`)

const battle = new Battle(player.team[0], opponent.team[0])
battle.turn(player.team[0].moves[0], opponent.team[0].moves[0])


