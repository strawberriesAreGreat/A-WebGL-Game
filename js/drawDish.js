//drawing the big circle in the middle
function drawDish(gl, program, compression) {
  var circleOrgin = [0, 0]
  var scale = 0.28
  var n = initBuffers(gl, program, compression, circleOrgin, scale, 0, 0, 0)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
