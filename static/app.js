class Mission{
    difficulty;
    description;
    
    constructor(difficulty, description){
        this.difficulty = difficulty;
        this.description = description;
    }
}

class App {
  players;
  difficulty;
  missions;
  converted;

  constructor() {
    this._init();
  }

  _init() {
    this.players = 3;
    this.difficulty = 3;
    this.converted=false;
    this.missions = [];
  }

  updatePlayers(nb) {
    this.players = nb;
  }

  updateDifficulty(nb) {
    // this.difficulty = nb;
    console.log(
      "Difficulty updated to : " + this.difficulty + " " + this.players + " " + this.converted
    );
  }

  generateMissions() {
    this.missions = [];
    this.missions.push(new Mission(1,"Test 1"));
    this.missions.push(new Mission(2,"Test 2"));
    this.missions.push(new Mission(3,"Test 3"));
    console.log(this.missions);
  }
}

window.App = App;

export default App;
