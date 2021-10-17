// Setting up the gl shaders from the glsl files
// the following function used the textbook code as refference and was tweaked and minimized
// for the purposed of this assignment. I do not take credit for the logic of the function.
function shaderSetUp(gl) {
  var gl = gl;
  var vShdr;
  var fShdr;

  //setting up the vert shader
  var vElement = document.getElementById('vs');
  if (!vElement) {
    alert("Could not load vertex shader script");
    return 0;
  } else {
    vShdr = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vShdr, vElement.text);
    gl.compileShader(vShdr);

    if (!gl.getShaderParameter(vShdr, gl.COMPILE_STATUS)) {
      alert("Vert. Shader has failed to compile.");
      return 0;
    }
  }
  // Setting up the fragment shader
  var fElement = document.getElementById('fs');
  if (!fElement) {
    alert("Could not load fragment shader script");
    return 0;
  } else {
    fShdr = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fShdr, fElement.text);
    gl.compileShader(fShdr);

    if (!gl.getShaderParameter(fShdr, gl.COMPILE_STATUS)) {
      alert("Frag. Shader has failed to compile.");
      return 0;
    }
  }
  //compiling the webgl program with the vertex and fragment shader
  var webglProgram = gl.createProgram();
  gl.attachShader(webglProgram, vShdr);
  gl.attachShader(webglProgram, fShdr);
  gl.linkProgram(webglProgram);
  if (!gl.getProgramParameter(webglProgram, gl.LINK_STATUS)) {
    alert("Shader program failed to link.");
    return 0;

  }
  console.log("Program made");
  console.log(webglProgram);
  console.log(gl);

  return webglProgram;
}
