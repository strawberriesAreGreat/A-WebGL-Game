// initializing the game object
class Game {
  constructor() {
    //initializing the game data
    this.win = false
    this.lose = false
    this.points = 0
    this.score = 0
    this.bacteria = []
    this.antiBacteria = []
    this.red = 0
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
    //initializing the bacteria circles starting locations, speeds of growth, and number of Bacteria
    //number of bacteria (between 5-10)
    var bn = Math.floor(Math.random() * 5 + 5)
    this.bacteria = Array(bn)
    this.points = bn
    for (var i = 0; i < bn; i++) {
      this.bacteria[i] = new Bacteria()
    }
  }
  //the game state when running
  update() {
    if (!this.lose) {
      //Setting the colour of the background
      this.gl.clearColor(0, 0, 0, 1.0)
      //creating our viewport
      this.gl.viewport(0, 0, this.gameCanvas.width, this.gameCanvas.height)
      //clearing previous rendering
      this.gl.clear(this.gl.COLOR_BUFFER_BIT)
      //enabling the next rendering and defining how to blend it
      this.gl.enable(this.gl.BLEND)
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)
      //clearing for the next frame in the loop
      this.gl.flush()
      //drawing the circle dish with each frame
      this.drawDish()
      //drawing the random bacteria circles
      if (!this.drawBacteria()) {
        this.lose = true
      }
    }
  }
  setBacteria() {}
  deleteBacteria(index) {
    if (index > -1) {
      this.bacteria.splice(index, 1)
    }
    this.score += 1

    //checking to see if the player has killed all the bacteria
    if (this.points == this.score) {
      this.win = true
    }
  }
  hasLost() {
    return this.lose
  }
  getBacteria() {
    return this.bacteria
  }
  getAntiBacteria() {
    return this.antiBacteria
  }
  getScore() {
    return this.score
  }
  getPoints() {
    return this.points
  }
  hasWon() {
    return this.win
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
  updateAntiBacteria(x, y) {
    //after any bacteria groups that have been clicked on are deleted
    //we delete produce an antibiotic
    let b = new Bacteria()
    b.setAsAnti()
    b.setOrginX(x)
    b.setOrginY(y)
    this.antiBacteria.push(b)
  }
  //drawing all the bacteria circles
  drawBacteria() {
    //end game state
    var c = true
    //bacteria.length instead of 1
    for (var i = 0; i < this.bacteria.length; i++) {
      this.bacteria[i].growth()
      //drawing the orgin of the circle the perimeter
      var circleOrgin = this.bacteria[i].getV2()
      var n = this.initBuffers(
        circleOrgin,
        this.bacteria[i].size,
        this.bacteria[i].getR(),
        this.bacteria[i].getG(),
        this.bacteria[i].getB(),
      )
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n)
      //if any of bacteria reaches the edge of the canvas the game is over and the player loses
      if (this.bacteria[i].size > 0.3) {
        c = false
      }
    }
    for (var i = 0; i < this.antiBacteria.length; i++) {
      this.antiBacteria[i].growth()
      var circleOrgin = this.antiBacteria[i].getV2()
      var n = this.initBuffers(
        circleOrgin,
        this.antiBacteria[i].size,
        this.antiBacteria[i].getR(),
        this.antiBacteria[i].getG(),
        this.antiBacteria[i].getB(),
      )
      this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n)
      //if (this.bacteria[i].getSize() > 0.30) {
      //  this.bacteria[i].setRate(0);
      //};
    }
    return c
  }
  //drawing the big circle in the middle
  drawDish() {
    var circleOrgin = [0, 0]
    var scale = 0.7
    var n = this.initBuffers(circleOrgin, scale, 1, 1, 1)
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, n)
  }

  initBuffers(orgin, scale, r, g, b) {
    var vertices = []
    //Assinging color and XY(no need for Z when working on a 2d game)values
    for (var i = 0; i <= 360; i += 1) {
      // degs ==> rads
      var j = (i * Math.PI) / 180
      //only 70% of the of the canvas size
      var v1 = [orgin[0] + scale * Math.sin(j), orgin[1] + scale * Math.cos(j)]
      var v2 = orgin

      vertices = vertices.concat(v1)
      vertices = vertices.concat(v2)
    }
    var n = vertices.length / 2
    //the array that will story the colours for the vertices
    var colors = []
    for (var i = 0; i < n; i++) {
      colors = colors.concat(r, g, b, 1.0)
    }

    //position buffer
    var vBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vBuffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(vertices),
      this.gl.STATIC_DRAW,
    ) //sending from the CPU -> gpu memory once

    var vPosition = this.gl.getAttribLocation(this.program, 'vPosition')
    this.gl.vertexAttribPointer(vPosition, 2, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(vPosition)

    //the colour buffer for the circles
    var cBuffer = this.gl.createBuffer()
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, cBuffer)
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(colors),
      this.gl.STATIC_DRAW,
    )

    var color = this.gl.getAttribLocation(this.program, 'vColor')
    this.gl.vertexAttribPointer(color, 4, this.gl.FLOAT, false, 0, 0)
    this.gl.enableVertexAttribArray(color)

    return n
  }
}
