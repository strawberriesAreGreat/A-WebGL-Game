function isOverlapping(bacteria) {
  //loop through all combinations of bacteria to check each and everyone of them against each other
  //not scalable but for the purposes of this simple game it will suffice
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
function isPoisoning(antiBacteria, bacteria) {
  //loop through all combinations of bacteria to check each and everyone of them against each other
  //not scalable but for the purposes of this simple game it will suffice
  for (var i = 0; i < antiBacteria.length; i++) {
    for (var j = 0; j < bacteria.length; j++) {
      if (calculateDistance(antiBacteria[i], bacteria[j])) {
        //deleting bacteria if and when it hits antibacteria
        console.log(' Antibiotic has killed a bacteria colony ')
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
