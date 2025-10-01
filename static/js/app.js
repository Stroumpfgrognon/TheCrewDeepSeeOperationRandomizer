import Popup from "./popup.js";
import MovableObject from "./moveable.js";

let mission_id = 0;

class Mission extends MovableObject {
  id;
  difficulty;
  description;
  player;
  completed;

  constructor(difficulty, description) {
    super(null);
    this.id = mission_id++;
    this.difficulty = difficulty;
    this.description = description;
    this.player = null;
    this.completed = false;
  }

  setPlayer(player) {
    this.player = player;
  }

  setMoving(event) {
    // if start moving the pop up, we store the mouse's position
    // if (this.dom === null)
    this.dom = document.getElementById("miss-" + this.id);
    if (this.dom === null) {
      console.warn("Mission DOM element not found");
      return;
    }
    this.moving = true;
    this.offX = event.clientX;
    this.offY = event.clientY;
  }
}

class App {
  players;
  current_players;
  difficulty;
  missions;
  converted;
  popup;
  selected_mission_id;
  is_moving_mission;
  player_to_attribute;

  constructor() {
    this._init();
  }

  _init() {
    this.players = 3;
    this.current_players = 3;
    this.difficulty = 3;
    this.player_to_attribute = null;
    this.converted = false;
    this.missions = [];
    this.is_moving_mission = false;
    this.popup = new Popup();
  }

  handleMouseUp() {
    if (
      this.player_to_attribute !== null &&
      this.is_moving_mission &&
      this.selected_mission_id !== null
    ) {
      let pm = document.getElementById(
        "P" + this.player_to_attribute + "-missions"
      );
      pm.classList.remove("opacity_sway");
      this.setPlayer(this.player_to_attribute);
    }
    if (this.is_moving_mission) {
      this.selected_mission_id = null;
    }
    this.popup.clearMoving();
    this.missions.forEach((m) => m.clearMoving());
    this.is_moving_mission = false;
    this.player_to_attribute = null;
  }

  handleMouseMove(event) {
    this.popup.move(event);
    this.missions.forEach((m) => m.move(event));
    let attributed_player = null;
    if (this.is_moving_mission) {
      for (let i = 0; i < this.current_players; i++) {
        let pm = document.getElementById("P" + (i + 1) + "-missions");
        let pos = [event.clientX, event.clientY];
        let rect = pm.getBoundingClientRect();
        if (
          pos[0] >= rect.left &&
          pos[0] <= rect.right &&
          pos[1] >= rect.top &&
          pos[1] <= rect.bottom
        ) {
          pm.classList.add("opacity_sway");
          attributed_player = i + 1;
        } else {
          pm.classList.remove("opacity_sway");
        }
      }
      this.player_to_attribute = attributed_player;
    }
  }

  updatePlayers(nb) {
    this.players = nb;
  }

  updateDifficulty(nb) {
    this.difficulty = nb;
  }

  selectMission(id) {
    this.selected_mission_id = id;
  }

  setPlayer(player) {
    if (this.selected_mission_id === undefined) {
      console.warn("No mission selected");
      return;
    }
    let targeted_mission = this.missions.find(
      (m) => m.id === this.selected_mission_id
    );
    targeted_mission.resetPosition();
    targeted_mission.setPlayer(player);
    this.selected_mission_id = undefined;
  }

  clearMissions() {
    for (let mission of this.missions) {
      mission.resetPosition();
    }
    this.missions = [];
    mission_id = 0;
  }

  generateMissions() {
    this.current_players = this.players;
    this.clearMissions();
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
        for (let i = 0; i < data.length; i++) {
          let mission = new Mission(data[i].difficulty, data[i].description);
          this.missions.push(mission);
        }
      });
  }
}

window.App = App;

export default App;
