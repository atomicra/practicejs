import { Vector3 } from "three";
import { Truss2d } from "./truss2d.js";

class Fem {

  constructor(...props) {
    this.init();
    const a = new Vector3();
    console.log(a);
  }

  init() {
    console.log("Fem is tested!")
  };

}

window.fem = new Fem();
window.truss2d = new Truss2d();