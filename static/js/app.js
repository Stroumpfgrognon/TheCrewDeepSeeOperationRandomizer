import Popup from "./popup.js";

class Mission {
  difficulty;
  description;

  constructor(difficulty, description) {
    this.difficulty = difficulty;
    this.description = description;
  }
}

class App {
  players;
  difficulty;
  missions;
  converted;
  popup;

  constructor() {
    this._init();
  }

  _init() {
    this.players = 3;
    this.difficulty = 3;
    this.converted = false;
    this.missions = [];
    this.popup = new Popup();
  }

  handleMouseUp() {
    this.popup.clearMoving();
  }

  updatePlayers(nb) {
    this.players = nb;
  }

  updateDifficulty(nb) {
    // this.difficulty = nb;
    console.log(
      "Difficulty updated to : " +
        this.difficulty +
        " " +
        this.players +
        " " +
        this.converted
    );
    console.log(this.missions);
  }

  setPlayer(player){

  }

  generateMissions() {
    // this.missions = [];
    // this.missions.push(new Mission(1,"Win the 1 submarine and no other (deal new cards if someone has submarines no. 1 and 4 or 1,2,3 in hand)"));
    // this.missions.push(new Mission(2,"Test 2"));
    // this.missions.push(new Mission(3,"Test 3"));
    // console.log(this.missions);
    console.log(
      "Generating missions for : " +
        this.players +
        " players, difficulty " +
        this.difficulty +
        " converted: " +
        this.converted
    );
    fetch(
      "/generate?players=" +
        this.players +
        "&difficulty=" +
        this.difficulty +
        "&converted=" +
        this.converted
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Résultat de la requête : ", data);
        this.missions = [];
        for (let i = 0; i < data.length; i++) {
          let mission = new Mission(data[i].difficulty, data[i].description);
          this.missions.push(mission);
        }
      });
  }
}

window.App = App;

export default App;
