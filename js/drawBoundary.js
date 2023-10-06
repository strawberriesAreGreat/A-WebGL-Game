//drawing the big circle in the middle
function drawBoundary(gl, program, compression) {
  var circleOrgin = [0, 0]
  var scale = 0.63
  var n = initBuffers(gl, program, compression, circleOrgin, scale, 0, 0.5, 0.7)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)

  var circleOrgin = [0, 0]
  var scale = 0.6
  var n = initBuffers(gl, program, compression, circleOrgin, scale, 1, 1, 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)

  var circleOrgin = [0, 0]
  var scale = 0.3
  var n = initBuffers(gl, program, compression, circleOrgin, scale, 0, 0, 0)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)

  var circleOrgin = [0, 0]
  var scale = 0.295
  var n = initBuffers(gl, program, compression, circleOrgin, scale, 1, 1, 1)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
}
