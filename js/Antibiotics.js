//eachg bacteria is a bacteria object that contains its unique color and unique rate of growth
class Antibiotics extends Bacteria {
  bacteriaList = [
    // [ r, g, b,s tartngSize, startingSpeedOfGrowth]
    [190, 230, 206, 0.01, this.defineRateOfGrowth()],
    [188, 255, 219, 0.03, this.defineRateOfGrowth()],
    [141, 255, 205, 0.04, this.defineRateOfGrowth()],
    [79, 299, 188, 0.05, this.defineRateOfGrowth()],
    [134, 255, 219, 0.06, this.defineRateOfGrowth()],
  ]
  constructor() {
    super()
    var selectedBacteria =
      this.bacteriaList[Math.floor(Math.random() * this.bacteriaList.length)]

    this.r = selectedBacteria[0] / 255
    this.g = selectedBacteria[1] / 255
    this.b = selectedBacteria[2] / 255
    this.size = selectedBacteria[3]
    this.rate = selectedBacteria[4]
    this.position = this.defineStartingLocation()
  }
}
