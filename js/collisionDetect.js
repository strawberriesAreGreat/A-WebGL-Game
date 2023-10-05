//loop through all combinations of bacteria to check each and everyone of them against each other
//not scalable but for the purposes of this simple game it will suffice
function isOverlapping(bacteria) {
  for (var i = 0; i < bacteria.length - 1; i++) {
    for (var j = bacteria.length - 1; j > i; j--) {
      if (calculateDistance(bacteria[i], bacteria[j])) {
        //setting larger bacteria to take over the smaller one
        if (bacteria[i].getSize() > bacteria[j].getSize()) {
          bacteria[j].setR(bacteria[i].getR())
          bacteria[j].setG(bacteria[i].getG())
          bacteria[j].setB(bacteria[i].getB())
        } else {
          bacteria[i].setR(bacteria[j].getR())
          bacteria[i].setG(bacteria[j].getG())
          bacteria[i].setB(bacteria[j].getB())
        }
      }
    }
  }
}
//loop through all combinations of bacteria to check each and everyone of them against each other
//not scalable but for the purposes of this simple game it will suffice
function isPoisoning(antibiotics, bacteria) {
  for (var i = 0; i < antibiotics.length; i++) {
    for (var j = 0; j < bacteria.length; j++) {
      if (calculateDistance(antibiotics[i], bacteria[j])) {
        //deleting bacteria if and when it hits antibacteria
        game.deleteBacteria(j)
        document.getElementById('score2').innerHTML = writeScore()
      }
    }
  }
}

//collision detection for the bacteria and soon to be anti-biotics
function calculateDistance(particleA, particleB) {
  orginAx = particleA.getOrginX()
  orginAy = particleA.getOrginY()
  orginBx = particleB.getOrginX()
  orginBy = particleB.getOrginY()

  radiusA = particleA.getSize()
  radiusB = particleB.getSize()

  // distance between their orgins = a^2 + b^2 (pythagorean theorem)
  // since the distance is just the hypotenuse
  var orginDistance = Math.sqrt(
    (orginAx - orginBx) * (orginAx - orginBx) +
      (orginAy - orginBy) * (orginAy - orginBy),
  )
  var combinedRadiuses = radiusA + radiusB
  // if the combine radius > distance between orgins we know they overlap so we return true
  return combinedRadiuses >= orginDistance
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
