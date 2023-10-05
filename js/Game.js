// initializing the game object
class Game {
  constructor() {
    const width = 800,
      heigth = 800,
      bacteriaCount = Math.floor(Math.random() * 5 + 5),
      backgoundColour = [1, 1, 1, 1] // white

    this.background = backgoundColour
    this.score = 0
    this.bacteria = []
    this.antibiotics = []

    //initialization
    this.initializeCanvas()
    this.initializeBacteria(bacteriaCount)
  }

  initializeCanvas() {
    //create a canvas element so we dont have to refresh the entire DOM
    this.gameCanvas = document.createElement('canvas')
    this.gameCanvas.setAttribute('id', 'canvas')
    this.gameCanvas.width = 800
    this.gameCanvas.height = 800
    //initializing webgl
    this.gl = this.gameCanvas.getContext('webgl')
    if (!this.gl) {
      this.gl - this.gameCanvas.getContext('experimental-webgl')
    } else if (!this.gl) {
      alert(
        "Your browser doesn't support WebGl, please try again with an updated browser",
      )
    }
    //throwing our canvas into our document
    document.body.appendChild(this.gameCanvas)
    //grabing our vertex and fragment shaders from the DOM and initializing them
    this.program = shaderSetUp(this.gl)
    this.gl.useProgram(this.program)
  }
  initializeBacteria(bacteriaCount) {
    this.bacteria = Array(bacteriaCount) // max number of bacteria is 10
    for (var i = 0; i < bacteriaCount; i++) {
      this.bacteria[i] = new Bacteria()
    }
  }

  clearFrame() {
    //Setting the colour of the background
    this.gl.clearColor(
      this.background[0],
      this.background[1],
      this.background[2],
      this.background[3],
    )
    //creating our viewport
    this.gl.viewport(0, 0, this.gameCanvas.width, this.gameCanvas.height)
    //clearing previous rendering
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    //enabling the next rendering and defining how to blend it
    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
    //clearing for the next frame in the loop
    this.gl.flush()
  }

  setGameStatus() {
    let i = 0
    while (i < this.bacteria.length) {
      if (this.bacteria[i].size > 0.3) this.over = true
      i++
    }
  }

  //the game state when running
  update() {
    if (!this.over) {
      this.clearFrame()

      // Draw the objects
      drawDish(this.gl, this.program)
      drawBacteria(this.gl, this.program, this.antibiotics)
      drawBacteria(this.gl, this.program, this.bacteria)
      // Determine if the game is over
      this.setGameStatus()
    }
  }

  setBacteria() {
    bacteria.push(new Bacteria())
  }
  deleteBacteria(index) {
    if (index > -1) {
      this.bacteria.splice(index, 1)
    }
    this.score += 1
  }
  isOver() {
    return this.over
  }
  getBacteria() {
    return this.bacteria
  }
  getAntibiotics() {
    return this.antibiotics
  }
  getScore() {
    return this.score
  }

  updateBacteria(pixels) {
    //boolean meant to represent all bacteria having been inspected for color properties
    var completeCheck = false
    while (!completeCheck) {
      for (var i = 0; i < this.bacteria.length; i++) {
        let r = Math.round(this.bacteria[i].getR() * 255)
        let g = Math.round(this.bacteria[i].getG() * 255)
        let b = Math.round(this.bacteria[i].getB() * 255)

        if (areSameColor(pixels[0], pixels[1], pixels[2], r, g, b)) {
          game.deleteBacteria(i)
          document.getElementById('score2').innerHTML = writeScore()
          break
        }

        if (i == this.bacteria.length - 1 || this.bacteria.length == 0) {
          completeCheck = true
        }
      }
      if (this.bacteria.length == 0) {
        completeCheck = true
      }
    }
  }
  updateAntibiotics(x, y) {
    //after any bacteria groups that have been clicked on are deleted
    //we delete produce an antibiotic
    let b = new Antibiotics()
    b.setOrginX(x)
    b.setOrginY(y)
    this.antibiotics.push(b)
  }
}
