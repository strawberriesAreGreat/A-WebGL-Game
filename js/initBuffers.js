function initBuffers(gl, program, compression, orgin, scale, r, g, b) {
  var vertices = []
  //Assinging color and XY(no need for Z when working on a 2d game)values
  for (var i = 0; i <= 360; i += 1) {
    // degs ==> rads
    var j = (i * Math.PI) / 180

    var v1 = [
      (orgin[0] + scale * Math.sin(j)) * compression[0],
      (orgin[1] + scale * Math.cos(j)) * compression[1],
    ]
    var v2 = [orgin[0] * compression[0], orgin[1] * compression[1]]

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
  var vBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW) //sending from the CPU -> gpu memory once

  var vPosition = gl.getAttribLocation(program, 'vPosition')
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(vPosition)

  //the colour buffer for the circles
  var cBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

  var color = gl.getAttribLocation(program, 'vColor')
  gl.vertexAttribPointer(color, 4, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(color)

  return n
}
