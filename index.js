/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    const rockRightEdge = rockLeftEdge + 20;

    let a = dodgerLeftEdge;
    let d = dodgerRightEdge;
    let z = rockLeftEdge;
    let c = rockRightEdge;

    return (
      (z <= a && c >= a) || (z >= a && c <= d) || (z <= d && c >= d)
    )
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0

  rock.style.top = top

  GAME.appendChild(rock);

  function moveRock() {
    top = `${top + 2}px`

     if (checkCollision(rock)) {
       return endGame()
     }

     if (top < GAME_HEIGHT) {
       window.requestAnimationFrame(moveRock)
     } else {
       rock.remove()
     }
  }

window.requestAnimationFrame(moveRock)

  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
  ROCKS.forEach(function(rock) { rock.remove() })

  document.removeEventListener('keydown', moveDodger)

  return alert('YOU LOSE!')
}

function moveDodger(e) {
    const keyCode = e.which

    if ([LEFT_ARROW, RIGHT_ARROW].indexOf(code) > -1) {
      e.preventDefault()
      e.stopPropagation()
    }

    if(keyCode === LEFT_ARROW) {
      moveDodgerLeft()
    } else if (keyCode === RIGHT_ARROW) {
      moveDodgerRight()
    }

}

function moveDodgerLeft() {
  window.requestAnimationFrame( () => {
    let left = positionToInteger(DODGER.style.left)

    if (left > 0) {
      DODGER.style.left = `${left - 4}`
    }
  }
}

function moveDodgerRight() {
  // implement me!
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
