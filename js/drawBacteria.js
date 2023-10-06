function drawBacteria(gl, program, compression, bacteria) {
  //bacteria.length instead of 1
  for (var i = 0; i < bacteria.length; i++) {
    bacteria[i].growth()
    //drawing the orgin of the circle the perimeter
    var circleOrgin = bacteria[i].getV2()
    var n = initBuffers(
      gl,
      program,
      compression,
      circleOrgin,
      bacteria[i].size,
      bacteria[i].getR(),
      bacteria[i].getG(),
      bacteria[i].getB(),
    )
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
  }
}
