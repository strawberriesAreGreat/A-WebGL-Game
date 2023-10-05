//eachg bacteria is a bacteria object that contains its unique color and unique rate of growth
class Bacteria {
  constructor() {
    //is antibacteria
    this.anti = false
    //bactria RGB values
    this.r = Math.random()
    this.g = Math.random()
    this.b = Math.random()
    //starting size is anywhere between 2-5% of the canvas size
    this.size = 0.01
    //bacteria rate of growth between 0.1-3x speed
    this.rate = 0.2 * Math.floor(Math.random() + 1)
    //Starting location of the bacteria
    var j = (Math.floor(Math.random() * 360) * Math.PI) / 180
    this.v2 = [0.7 * Math.sin(j), 0.7 * Math.cos(j)]
  }

  //getters
  getAntiStatus() {
    return this.anti
  }
  getR() {
    return this.r
  }
  getG() {
    return this.g
  }
  getB() {
    return this.b
  }
  getV2() {
    return this.v2
  }
  getOrginX() {
    return this.v2[0]
  }
  getOrginY() {
    return this.v2[1]
  }
  size() {
    growth()
    return this.size
  }
  getSize() {
    return this.size
  }
  growth() {
    this.size = this.size * (1 + 0.08 * this.rate)
  }

  //setters
  setR(r) {
    this.r = r
  }
  setG(g) {
    this.g = g
  }
  setB(b) {
    this.b = b
  }
  setOrginX(x) {
    this.v2[0] = (x - 400) / 400
  }
  setOrginY(y) {
    this.v2[1] = (y - 400) / 400
  }
  setAsAnti() {
    this.anti = true
    this.r = 1
    this.g = 0
    this.b = 0
  }
  setRate(x) {
    this.rate = x
  }
}
