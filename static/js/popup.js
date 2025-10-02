import MovableObject from "./moveable.js";

/**
 *
 * @param {string} id
 * @returns {HTMLElement}
 */
function getElementById(id) {
  const result = document.getElementById(id);
  if (!result) {
    throw new Error(`${id} not found in DOM`);
  }
  return result;
}

/**
 *
 * @param {string} id
 * @returns {HTMLInputElement}
 */
function getInputElementById(id) {
  const result = document.getElementById(id);
  if (!result) {
    throw new Error(`${id} not found in DOM`);
  }
  // @ts-ignore
  return result;
}

class Popup extends MovableObject {
  /*
  Definition of the pop-up class.

  Attributes of the class:
  - title : title of the pop up in the html page
  - x : current x coordinate of the pop up
  - y : current y coordinate of the pop up
  - refX : x coordinate of the pop up before it was moved
  - refY : y coordinate of the pop up before it was moved
  - offX : difference between the x position of the mouse and refX
  - off : difference between the y position of the mouse and refY
  - dom : the grid inside which is the pop up
  - pop : the pop up element in the html
  - body : the body of the pop up
  - moving : boolean indicating if the pop up is being moved
  - bind : string indicating the type of pop up to be displayed
  - behaviour : construction of a popup class instance representing the pop up

  Methods :
  - show : display the pop up
  - close : close the pop up
  - setMoving : set the moving attribute to true and store the current mouse position
  - clearMoving : set the moving attribute to false and store the current position of the pop up
  - move : move the pop up according to the mouse position
  - done : clear the body of the pop up and close it

  */
  constructor() {
    super(getElementById("popup_area"));
    this.title = getElementById("popup_title");
    this.pop = getElementById("popup");
    this.body = this.pop.children[1];
    this.moving = false;
    this.behaviour = new PopupBehaviour();
    this.inputmode = false;
    this.hidden= true;
    // If the user presses escape, the pop up is closed
  }

  show(event, str = "") {
    /*
    This function displays the pop up if bind is not empty and the type of pop up is not empty.
    It also sets the title of the pop up according to the type of pop up and changes the attribute pop accordingly as to display the right type of pop up.
    */

    // the title that will be given to the pop up

    let title = "";
    if (str != "") {
      switch (str) {
        /* the pop up can be :
        - an input pop up to set key values or the values of modifyers to atteign a specific layout
        - an export pop up allowing the user to export their configuration as a json
        - an import pop up allowing the user to inport a json file to display in the app
        - an svg pop up allowing the user to modify the appearance of a key
        */
        case "selection":
          title = "Player selection";
          this.behaviour = new playerSelectPopup();
          break;
        default:
          // if the type of pop up isn't defined
          break;
      }
    }
    // we set the title of the pop up
    this.title.textContent = title;
    // we put no padding
    this.setPosition(0, window.scrollY);
    // we display the pop up
    this.hidden = false;
  }

  close() {
    /*
    This function hides the pop up in the window
    */
    this.hidden = true;
  }

  done() {
    // This function suppresses traces
    // of the pop up in the html once
    // we have finished using it
    this.body.innerHTML = "";
    this.title.textContent == "Popup";
    this.behaviour.done();
    this.close();
  }
}

class PopupBehaviour {
  /*
  This class defines the basic popup class from which we'll derive pop ups with specific attributes.

  */
  /**
   *
   * @param {string|null} url
   */
  constructor(url = null) {
    const pop = document.getElementById("popup");
    if (pop === null) {
      throw new Error("popup element not found in DOM");
    }
    this.pop = pop;
    const body = this.pop.children[1];
    if (!body) {
      throw new Error("popup body not found in DOM");
    }
    this.body = body;
    if (url) {
      fetch(url)
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          this.body.innerHTML = html;
        });
    }
  }

  done() {}
}

class playerSelectPopup extends PopupBehaviour {
  /**
  The class player select pop up is used when user have to select a player for a mission.
  */

  hovered_player = null;
  constructor() {
    super("static/html/playerSelect.html");
    this.key = "";
  }

  setHoveredPlayer(player) {
    this.hovered_player = player;
  }
}

export default Popup;
