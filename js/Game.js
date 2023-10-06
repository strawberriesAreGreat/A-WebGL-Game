class Game {
  constructor() {
    this.background = [1, 1, 1, 1] // white
    this.score = 0
    this.bacteria = []
    this.antibiotics = []
    this.isStart = true
    this.over = false // Initialize game state
    this.reproductionInterval = 1000
    // Initialize canvas and WebGL
    this.initializeCanvas()
    this.compression = calculateCompressionFactor(
      this.gameCanvas.width,
      this.gameCanvas.height,
    )

    // Add a click event listener to the canvas
    this.gameCanvas.addEventListener('click', this.onCanvasClick.bind(this))

    window.addEventListener('resize', () => {
      this.resizeCanvasToDisplaySize()
      this.compression = calculateCompressionFactor(
        this.gameCanvas.width,
        this.gameCanvas.height,
      )
    })
    // Initialize bacteria
    const bacteriaCount = Math.floor(Math.random() * 5 + 5)
    this.initializeBacteria(bacteriaCount)
    this.startReproductionTimer()
  }

  initializeCanvas() {
    // Create and configure the canvas
    this.gameCanvas = document.createElement('canvas')
    this.gameCanvas.id = 'canvas'
    document.body.appendChild(this.gameCanvas)

    // Initialize WebGL
    this.gl =
      this.gameCanvas.getContext('webgl') ||
      this.gameCanvas.getContext('experimental-webgl')
    if (!this.gl) {
      alert(
        "Your browser doesn't support WebGL. Please use an updated browser.",
      )
    }

    // Set up shaders
    this.program = shaderSetUp(this.gl)
    this.gl.useProgram(this.program)

    // Resize canvas
    this.resizeCanvasToDisplaySize()
  }

  onCanvasClick(event) {
    if (this.isOver()) {
      // Reset the game when it's over
      this.resetGame()
      return
    }
    const mouseX = event.clientX - this.gameCanvas.getBoundingClientRect().left
    const mouseY = event.clientY - this.gameCanvas.getBoundingClientRect().top

    // Read pixel color asynchronously after rendering
    requestAnimationFrame(() => {
      const pixels = this.readPixelColor(mouseX, mouseY)

      // Handle pixel color data (e.g., update game state)
      this.updateBacteria(pixels)
    })
  }

  readPixelColor(x, y) {
    const pixels = new Uint8Array(4)
    this.gl.readPixels(
      x,
      this.gameCanvas.height - y,
      1,
      1,
      this.gl.RGBA,
      this.gl.UNSIGNED_BYTE,
      pixels,
    )
    return pixels
  }

  initializeBacteria(bacteriaCount) {
    this.bacteria = Array.from({length: bacteriaCount}, () => new Bacteria())
  }

  render() {
    // Clear and render
    this.gl.clearColor(...this.background)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
    this.gl.viewport(0, 0, this.gameCanvas.width, this.gameCanvas.height)
    this.gl.enable(this.gl.BLEND)
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA)

    // Draw game elements
    drawBoundary(this.gl, this.program, this.compression)
    drawBacteria(this.gl, this.program, this.compression, this.antibiotics)
    drawBacteria(this.gl, this.program, this.compression, this.bacteria)
    drawDish(this.gl, this.program, this.compression)
    // Update game status
    this.setGameStatus()
  }

  setGameStatus() {
    this.over = this.bacteria.some((b) => b.size > 0.3)
  }

  update() {
    if (!this.over) {
      this.render()
    } else {
      document.getElementById('score2').innerHTML = 'YOU LOSE!'
    }
  }
  setBacteria() {
    this.bacteria.push(new Bacteria())
  }

  deleteBacteria(index) {
    if (index > -1) {
      this.bacteria.splice(index, 1)
    }
    this.score += 1
    this.reproductionInterval =
      this.reproductionInterval - this.reproductionInterval * 0.9
    document.getElementById('score2').innerHTML = this.getScore()
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
    for (let i = 0; i < this.bacteria.length; i++) {
      const r = Math.round(this.bacteria[i].getR() * 255)

      // Compare the R component of pixel color and bacteria color
      if (pixels[0] === r) {
        this.deleteBacteria(i)
        break
      }
    }
  }

  updateAntibiotics(x, y) {
    // Create an antibiotic and add it to the antibiotics array
    const b = new Antibiotics()
    b.setOrginX(x)
    b.setOrginY(y)
    this.antibiotics.push(b)
  }
  startReproductionTimer() {
    setInterval(() => {
      // Add a new bacteria to the array
      this.setBacteria()
    }, this.reproductionInterval)
  }
  resizeCanvasToDisplaySize() {
    const dpr = window.devicePixelRatio
    const browserWidth = Math.round(this.gameCanvas.clientWidth * dpr)
    const browserHeight = Math.round(this.gameCanvas.clientHeight * dpr)

    if (
      this.gameCanvas.width !== browserWidth ||
      this.gameCanvas.height !== browserHeight
    ) {
      this.gameCanvas.width = browserWidth
      this.gameCanvas.height = browserHeight
    }
  }
  writeScore() {
    return this.getScore()
  }
  resetGame() {
    this.background = [1, 1, 1, 1] // white
    this.score = 0
    this.bacteria = []
    this.antibiotics = []
    this.over = false // Initialize game state
    this.reproductionInterval = 1000

    // Initialize bacteria
    const bacteriaCount = Math.floor(Math.random() * 5 + 5)
    this.initializeBacteria(bacteriaCount)
    this.startReproductionTimer()
    document.getElementById('score2').innerHTML = this.getScore()

    // Clear the canvas
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }
}
