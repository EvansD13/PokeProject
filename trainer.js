const pokeGen = require("./pokemon")


class Trainer{
    constructor(trainer_name){
        this.name = trainer_name
        this.money = "£0"
        this.badges = 0
        this.team = []
        this.boxes = []
    }

    addTeam(pokemon, level){
        const new_Mon = new pokeGen(pokemon, level)
        if (this.team.length < 6){
            this.team.push(new_Mon)
        }
    }

}


module.exports = Trainer