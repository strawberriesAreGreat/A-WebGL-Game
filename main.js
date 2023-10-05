var game

function main() {
  game = new Game()
  game = window.game
  mouseWatch()
  loop()
}

//updates the game as frames are updated
function loop() {
  isOverlapping(game.getBacteria())
  isPoisoning(game.getAntibiotics(), game.getBacteria())
  window.game.update()
  if (game.isOver()) {
    alert('GAME OVER')
    document.getElementById('score2').innerHTML = 'YOU LOSE!'
    return
  }
  requestAnimationFrame(loop)
}

function writeScore() {
  return game.getScore()
}

// Watching Mouse Clicks
function mouseWatch() {
  var canvas = document.querySelector('canvas')
  var gl = canvas.getContext('webgl')
  var pixels = new Uint8Array(4)

  //tracking where the last click took place
  var element = document.getElementById('canvas'),
    xOffset = element.offsetLeft + element.clientLeft,
    yOffset = element.offsetTop + element.clientTop,
    c = element.getContext('2d'),
    elements = []

  canvas.addEventListener('click', function (event) {
    var x = event.clientX - xOffset
    var y = 800 - (event.clientY - yOffset)

    requestAnimationFrame(function () {
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)

      if (pixels[0] != 255 && pixels[0] != 0) {
        game.updateBacteria(pixels)
        game.updateAntibiotics(x, y)
      }
    })
  })
}
