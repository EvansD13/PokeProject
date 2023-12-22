const fs = require("fs")

const dex = require(`./resources/pokedex.json`)
const abilities = require(`./resources/abilites.json`)
const stats = require(`./resources/stats.json`)
const types = require(`./resources/types.json`)
const { type } = require("os")

function capitalisation(word){
    return word[0].toUpperCase() + word.slice(1)
}
function antiCapital(word){
    return word[0].toLowerCase() + word.slice(1)
}


class Pokemon{
    constructor(name, level){
        this.name = capitalisation(name.toLowerCase())
        this.level = level
        this.nature = this.genNature(Math.floor(Math.random() * 25) + 1)
        this.evs = [0, 0, 0, 0, 0, 0]
        this.stats = this.statScaling(stats.stats[antiCapital(this.name)], this.level, this.nature, this.evs)
        this.weight = stats.stats[antiCapital(this.name)]["weight"]
        this.base_exp = stats.stats[antiCapital(this.name)]["base_exp"]
        this.types = this.findTypes(types.types[antiCapital(this.name)])
        
    }
    genNature(n){
        switch(n){
            case 1:
                return "Hardy"
            case 2:
                return "Lonely"
            case 3:
                return "Adamant"
            case 4:
                return "Naughty"
            case 5:
                return "Brave"
            case 6:
                return "Bold"
            case 7:
                 return "Docile"
            case 8:
                return "Impish"
            case 9:
                return "Lax"
            case 10:
                return "Relaxed"
            case 11:
                return "Modest"
            case 12: 
                return "Mild"
            case 13:
                return "Bashful"
            case 14:
                return "Rash"
            case 15:
                return "Quiet"
            case 16:
                return "Calm"
            case 17: 
                return "Gentle"
            case 18:
                return "Careful"
            case 19:
                return "Quirky"
            case 20:
                return "Sassy"
            case 21:
                return "Timid"
            case 22:
                return "Hasty"
            case 23:
                return "Jolly"
            case 24:
                return "Naive"
            case 25:
                return "Serious"

            
        }
    }

    naturePlusMinus(nature){ /// Takes an argument of a string to match
        switch(nature){
            case "Hardy":
                return [0, 0] // Returns a mask telling it which stat to increase/decrease respectively
            case "Lonely":
                return [0, 1]
            case "Adamant":
                return [0, 2]
            case "Naughty":
                return [0, 3]
            case "Brave":
                return [0, 4]
            case "Bold":
                return [1, 0]
            case "Docile":
                return [1, 1]
            case "Impish":
                return [1, 2]
            case "Lax":
                return [1, 3]
            case "Relaxed":
                return [1, 4]
            case "Modest":
                return [2, 0]
            case "Mild":
                return [2, 1]
            case "Bashful":
                return [2, 2]
            case "Rash":
                return [2, 3]
            case "Quiet":
                return [2, 4]
            case "Calm":
                return [3, 0]
            case "Gentle":
                return [3, 1]
            case "Careful":
                return [3, 2]
            case "Quirky":
                return [3, 3]
            case "Sassy":
                return [3, 4]
            case "Timid":
                return [4, 0]
            case "Hasty":
                return [4, 1]
            case "Jolly":
                return [4, 2]
            case "Naive":
                return [4, 3]
            case "Serious":
                return [4, 4]

        }
    }

    statScaling(base_stats, level, nature, evs) {
        let ivs = []
        for(let j = 0; j < 6; j++){
            ivs.push(Math.floor(Math.random() * 31)) //Random IV Assignment
        }
        let stats = []
        const nature_mods = this.naturePlusMinus(nature)
        stats.push(Math.floor((((2 * base_stats.hp + ivs[0] + (evs[0]/4)) * level)/100) + level + 10)) // HP Calculation)
        for (let i = 0; i < 5; i++){
            let stat
            switch(i){
                case 0:
                    stat = "attack"
                    break
                case 1:
                    stat = "defense"
                    break
                case 2:
                    stat = "special-attack"
                    break
                case 3:
                    stat = "special-defense"
                    break
                case 4:
                    stat = "speed"
                    break
            }
            let Nature
            if (nature_mods[0] == nature_mods[1] == i){
                Nature = 1
            }else if(nature_mods[0] == i){
                Nature = 1.1
            }else if (nature_mods[1] == i){
                Nature = 0.9
            }else{
                Nature = 1
            }
            let ith_stat = Math.floor(((((2 * base_stats[stat] + ivs[i + 1] + (evs[i + 1]/4)) * level)/100) + 5) * Nature)
            stats.push(ith_stat)
        }
        return stats
    }

    findTypes(type_data){
        if (type_data.length === 2){
            return [capitalisation(type_data[0].type), capitalisation(type_data[1].type)]
        }else{
            return capitalisation(type_data[0].type)
        }
    }
    
}

