function drawBacteriaAndAntiBacteria(gl, program, bacteria, antiBacteria) {
  //end game state
  var c = true
  //bacteria.length instead of 1
  for (var i = 0; i < bacteria.length; i++) {
    bacteria[i].growth()
    //drawing the orgin of the circle the perimeter
    var circleOrgin = bacteria[i].getV2()
    var n = initBuffers(
      gl,
      program,
      circleOrgin,
      bacteria[i].size,
      bacteria[i].getR(),
      bacteria[i].getG(),
      bacteria[i].getB(),
    )
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
    //if any of bacteria reaches the edge of the canvas the game is over and the player loses
    if (bacteria[i].size > 0.3) {
      c = false
    }
  }
  for (var i = 0; i < antiBacteria.length; i++) {
    antiBacteria[i].growth()
    var circleOrgin = antiBacteria[i].getV2()
    var n = initBuffers(
      gl,
      program,
      circleOrgin,
      antiBacteria[i].size,
      antiBacteria[i].getR(),
      antiBacteria[i].getG(),
      antiBacteria[i].getB(),
    )
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
  }
  return c
}
