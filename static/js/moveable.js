class MovableObject {
  constructor(dom) {
    this.refX = 0;
    this.refY = 0;
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.dom = dom;
  }

  /**
   *
   * @param {MouseEvent} event
   */
  setMoving(event) {
    // if start moving the pop up, we store the mouse's position
    this.moving = true;
    this.offX = event.clientX;
    this.offY = event.clientY;
  }

  clearMoving() {
    // if we stopped moving, we set the initial position to the current position after the move
    this.moving = false;
    this.refX = this.x;
    this.refY = this.y;
  }

  resetPosition() {
    this.setPosition(0, 0);
  }

  /**
   *
   * @param {MouseEvent} event
   */
  move(event) {
    /* if we have started moving the popup,
    we will move it's position according to
    the mouse's position until the event is stopped
    */
    if (this.moving == false || this.dom === null) return;
    this.x = this.refX + event.clientX - this.offX;
    this.y = this.refY + event.clientY - this.offY;
    // we move the pop up on the page
    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.refX = x;
    this.refY = y;
    if (this.dom === null) return;
    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }
}

export default MovableObject;
