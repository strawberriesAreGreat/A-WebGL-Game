//eachg bacteria is a bacteria object that contains its unique color and unique rate of growth
class Bacteria {
  static counter = 0
  static distanceFromCenter = 0.3

  constructor() {
    Bacteria.counter++

    this.generatePastelColor()
    this.size = 0.07 + Math.random() * 0.06 // Adjust size as needed
    this.rate = 0.058 * Math.floor(Math.random() + 1)
    this.v2 = this.defineStartingLocation()
  }

  generatePastelColor() {
    this.r = (255 - 2 * Bacteria.counter) / 255
    this.g = (50 + Math.random() * 200) / 255
    this.b = (50 + Math.random() * 200) / 255
  }

  // Defining the rate of growth for a given bacteria colony
  defineRateOfGrowth() {
    return 0.04 * Math.floor(Math.random() + 1)
  }
  // Defining the radial starting location for a bacteria colony
  defineStartingLocation() {
    const postition = (Math.floor(Math.random() * 360) * Math.PI) / 180
    return [
      Bacteria.distanceFromCenter * Math.sin(postition),
      Bacteria.distanceFromCenter * Math.cos(postition),
    ]
  }

  //getters
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
  calculateSize() {
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

  setRate(x) {
    this.rate = x
  }
}
