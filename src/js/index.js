// const randomColor = require("randomcolor");
import randomColor from "randomColor";
document.body.style.backgroundColor = randomColor();

class Rectangle {
  constructor(w, h, x, y) {
    this._width = w;
    this._height = h;
    this._x = x;
    this._y = y;
    this._ref = this.generateHTML();
    this.setStyling();
    this.changeBgColor();
    this.surface = this.getSurface() + "px";
  }

  //static functions
  static getDistance(rect1, rect2) {
    const x = Math.abs(rect1._x - rect2._x);
    const y = Math.abs(rect1._y - rect2._y);
    return Math.round(Math.sqrt(x * x + y * y)) + "px";
  }

  // Hier zit toch nog een fout in de logica, maar ik vind ze niet :-(  mssn ook wat omslachtig opgebouwd...

  static hitTest(rectA, rectB) {
    //Positie van links bovenhoek voor beide rechthoeken
    const coordinateA = [rectA._x - rectA._width / 2, rectA._y - rectA._height];
    const coordinateB = [rectB._x - rectB._width / 2, rectB._y - rectB._height];

    //Positie van andere hoeken van de rechthoek nodig om te vergelijken
    const p0 = [coordinateA[0], coordinateA[1] + rectA._height];
    const p1 = [coordinateA[0] + rectA._width, coordinateA[1]];
    const p2 = [coordinateB[0], coordinateB[1] + rectB._height];
    const p3 = [coordinateB[0] + rectB._width, coordinateB[1]];

    //Als één van deze condities true is dan overlappen de rechthoeken niet
    if (p2[0] > p1[0] || p3[0] < p0[0] || p2[1] > p1[1] || p3[1] < p0[1]) {
      return "These rectangles do not overlap";
    } else {
      return "These rectangles overlap";
    }
  }

  //prototype functions

  generateHTML() {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<div class='rectangle'></div>`
    );
    return document.querySelector("div:first-child");
  }

  setStyling() {
    const styles = {
      left: this._x + "px",
      top: this._y + "px",
      width: this._width + "px",
      height: this._height + "px",
      backgroundColor: randomColor(),
    };
    Object.assign(this._ref.style, styles);
  }

  changeBgColor() {
    this._ref.onclick = () => {
      this._ref.style.backgroundColor = randomColor();
      this.setStyling();
    };
  }

  getSurface() {
    return this._width * this._height;
  }

  //getters and setters

  get width() {
    return this._width + "px";
  }
  set width(waarde) {
    this._width = waarde;
    this.setStyling();
  }
  get height() {
    return this._height + "px";
  }
  set height(waarde) {
    this._height = waarde;
    this.setStyling();
  }
  set position(coordinate) {
    const arr = coordinate.replace(" ", "").split(",");
    this._x = arr[0];
    this._y = arr[1];
    this.setStyling();
  }
}

// DEMO

//creation of rectangles

const rectangle1 = new Rectangle(50, 30, 400, 550);
const rectangle2 = new Rectangle(400, 330, 100, 70);
const rectangle3 = new Rectangle(200, 200, 500, 300);
const rectangle4 = new Rectangle(78, 120, 1100, 40);
const rectangle5 = new Rectangle(245, 60, 940, 250);
const rectangle6 = new Rectangle(600, 190, 1100, 500);
const rectangle7 = new Rectangle(600, 190, 900, 350);

//OPP BEREKENING
console.log("The surface of this rectangle is " + rectangle3.surface);

//AFSTAND BEREKENING
console.log(
  "The distance between rectangle 1 and 5 is " +
    Rectangle.getDistance(rectangle1, rectangle5)
);

//HIT TEST WERKT NIET...
console.log(Rectangle.hitTest(rectangle6, rectangle7));
