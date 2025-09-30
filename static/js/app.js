import Popup from "./popup.js";

let mission_id=0;

class Mission {
  id;
  difficulty;
  description;
  player;

  constructor(difficulty, description) {
    this.id = mission_id++;
    this.difficulty = difficulty;
    this.description = description;
    this.player = null;
  }
  
  setPlayer(player){
    this.player=player;
  }
}

class App {
  players;
  current_players;
  difficulty;
  missions;
  selected_mission_id;
  converted;
  popup;

  constructor() {
    this._init();
  }

  _init() {
    this.players = 3;
    this.current_players = 3;
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
    this.difficulty = nb;
  }

  selectMission(id) {
    this.selected_mission_id = id;
    console.log("Selected mission id: " + id);
  }


  setPlayer(player){
    if(this.selected_mission_id===undefined){
      console.warn("No mission selected");
      return;
    }
    this.missions.find(m => m.id===this.selected_mission_id).setPlayer(player);
    console.log("Set player "+player+" to mission id "+this.selected_mission_id);
    this.selected_mission_id=undefined;
    console.log(this.missions);
  }

  clearMissions(){
    this.missions = [];
    mission_id=0;
  }

  generateMissions() {
    this.current_players = this.players;
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
        this.clearMissions();
        for (let i = 0; i < data.length; i++) {
          let mission = new Mission(data[i].difficulty, data[i].description);
          this.missions.push(mission);
        }
      });
  }
}

window.App = App;

export default App;
