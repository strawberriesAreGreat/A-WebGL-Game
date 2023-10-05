var game

function main() {
  game = window.game

  //checking if we've selected a bacteria to kill
  var canvas = document.querySelector('canvas')
  var gl = canvas.getContext('webgl')
  var pixels = new Uint8Array(4)

  //tracking where the last click took place
  var elem = document.getElementById('canvas'),
    eLeft = elem.offsetLeft + elem.clientLeft,
    eTop = elem.offsetTop + elem.clientTop,
    c = elem.getContext('2d'),
    elements = []

  canvas.addEventListener('click', function (event) {
    var x = event.clientX - eLeft
    var y = 800 - (event.clientY - eTop)

    //now we need to request animation frame because the canvas is in a constant state of flux as it renders
    requestAnimationFrame(function () {
      //finally getting the pixel values of the spot clicked
      gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels)
      //checking if the bacteria has been clicked on (any pixel with an R value != 0 or 255 (black or white))
      if (pixels[0] != 255 && pixels[0] != 0) {
        game.updateBacteria(pixels)
      }
      game.updateAntibiotics(x, y)
    })
  })
}

//updates the game as frames are updated
function loop() {
  isOverlapping(game.getBacteria())
  isPoisoning(game.getAntibiotics(), game.getBacteria())
  window.game.update()
  if (game.isOver()) {
    alert('GAME OVER, YOUR SCORE:')
    document.getElementById('score1').innerHTML = 'YOU LOSE!'
    return
  }
  requestAnimationFrame(loop)
}

function writeScore() {
  return game.getScore()
}

function areSameColor(r1, g1, b1, r2, g2, b2) {
  let dR = Math.abs(r1 - r2)
  let dG = Math.abs(g1 - g2)
  let dB = Math.abs(b1 - b2)
  let diff = dR + dG + dB

  if (diff < 4) {
    return true
  } else {
    return false
  }
}
