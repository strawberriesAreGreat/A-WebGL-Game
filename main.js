function main() {
  const game = new Game()
  const canvas = game.gameCanvas
  const gl = game.gl

  // Check if WebGL is available
  if (!gl) {
    console.error('WebGL context is not available.')
    return
  }

  function loop() {
    isOverlapping(game.getBacteria())
    isPoisoning(game.getAntibiotics(), game.getBacteria())
    game.update()

    if (game.isOver()) {
      const scoreElement = document.getElementById('score2')
      scoreElement.innerHTML = 'game\nover\n :('
      scoreElement.style.fontSize = '4vw'
    }

    requestAnimationFrame(loop)
  }

  loop()
}
