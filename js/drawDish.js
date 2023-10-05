//drawing the big circle in the middle
function drawDish(gl, program) {
  var circleOrgin = [0, 0]
  var scale = 0.7
  var n = initBuffers(gl, program, circleOrgin, scale, 0, 0, 0)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)

  var circleOrgin = [0, 0]
  var scale = 0.69
  var n = initBuffers(gl, program, circleOrgin, scale, 1, 1, 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
