//eachg bacteria is a bacteria object that contains its unique color and unique rate of growth
class Bacteria {
  bacteriaList = [
    // [ r, g, b,s tartngSize, startingSpeedOfGrowth]
    [250, 188, 60, 0.01, this.defineRateOfGrowth()],
    [254, 178, 56, 0.03, this.defineRateOfGrowth()],
    [241, 145, 67, 0.04, this.defineRateOfGrowth()],
    [254, 119, 61, 0.05, this.defineRateOfGrowth()],
    [245, 85, 54, 0.06, this.defineRateOfGrowth()],
  ]
  constructor() {
    // Setting bacteria properties
    var selectedBacteria =
      this.bacteriaList[Math.floor(Math.random() * this.bacteriaList.length)]

    this.r = selectedBacteria[0] / 255
    this.g = selectedBacteria[1] / 255
    this.b = selectedBacteria[2] / 255
    this.size = selectedBacteria[3]
    this.rate = selectedBacteria[4]
    this.v2 = this.defineStartingLocation()
  }

  // Defining the rate of growth for a given bacteria colony
  defineRateOfGrowth() {
    return 0.1 * Math.floor(Math.random() + 1)
  }
  // Defining the radial starting location for a bacteria colony
  defineStartingLocation() {
    const postition = (Math.floor(Math.random() * 360) * Math.PI) / 180
    return [0.7 * Math.sin(postition), 0.7 * Math.cos(postition)]
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

  setRate(x) {
    this.rate = x
  }
}
