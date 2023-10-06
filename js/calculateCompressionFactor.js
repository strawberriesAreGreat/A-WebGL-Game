function calculateCompressionFactor(width, height) {
  // CompressionFactor() how much to crush the width or height by, in order to have the game render well

  if (width < height) {
    return [height / width, 1]
  } else {
    return [1, width / height]
  }
}
