let board = document.getElementsByClassName('board')[0]
// page refresh time  is set from here ny using speed
let speed = 6
let lastRenderTime = 0
let velocity = { x: 0, y: 0 }
let food = document.createElement('div')
let move = new Audio('/move.mp3')
let music = new Audio('/music.mp3')
let gameoverm = new Audio('/gameover.mp3')
let foodm = new Audio('/food.mp3')
let up = document.getElementById('up')
let left = document.getElementById('left')
let right = document.getElementById('right')
let down = document.getElementById('down')
let scoreboard = document.getElementsByClassName('score')[0]
let score = 0

let snakebody;
// if snake eats snakearray will increase and basically snake size will increased by codes below
let snakearray = [{ x: 13, y: 15 }]


let foodx = Math.floor(Math.random() * 20) + 1
let foody = Math.floor(Math.random() * 20) + 1
// this function main is used to refresh the page just like set interval
function main(currentTime) {
  window.requestAnimationFrame(main)
  const differncebtwneachrender = (currentTime - lastRenderTime) / 1000
  if (differncebtwneachrender < 1 / speed) return
  lastRenderTime = currentTime


  update()

}

window.requestAnimationFrame(main);
// functions for game over
function gameover() {
  if (snakearray[0].x == 0 || snakearray[0].x == 21 || snakearray[0].y == 0 || snakearray[0].y == 21) {

    return true;
  }
  for (let i = 2; i < snakearray.length; i++) {
    if (snakearray[i].x === snakearray[0].x && snakearray[i].y === snakearray[0].y) {
      return true;
    }
  }

}

window.addEventListener('keydown', e => {

  switch (e.key) {
    case "ArrowUp":
      if (velocity.y == 0) {
        velocity = { x: 0, y: -1 }
        move.play();
      }
      break;
    case "ArrowDown":
      if (velocity.y == 0) {
        velocity = { x: 0, y: 1 }
        move.play();
      }
      break;
    case "ArrowLeft":
      if (velocity.x == 0) {
        velocity = { x: -1, y: 0 }
        move.play();
      }
      break;
    case "ArrowRight":
      if (velocity.x == 0) {
        velocity = { x: 1, y: 0 }
        move.play();
      }
      break;

  }
})
up.onclick = () => {
  if (velocity.y == 0) {
    velocity = { x: 0, y: -1 }
    move.play();
  }
}
down.onclick = () => {
  if (velocity.y == 0) {
    velocity = { x: 0, y: 1 }
    move.play();
  }
}
left.onclick = () => {
  if (velocity.x == 0) {
    velocity = { x: -1, y: 0 }
    move.play();
  }
}
right.onclick = () => {
  if (velocity.x == 0) {
    velocity = { x: 1, y: 0 }
    move.play();
  }
}
function update() {
  if (gameover()) {
    velocity = { x: 0, y: 0 }
    gameoverm.play()
    alert('game over')
    score = 0
    snakearray = [{ x: 13, y: 15 }]
  }
  // else{music.play()}

  snakeupdate()
  foodupdate()
  scoreupdate()

}
// food will spawn when we use the function foodupdate
function foodupdate() {
  if (snakearray[0].x == foodx && snakearray[0].y == foody) {
    score +=1
    foodm.play();
    foodx = Math.floor(Math.random() * 20) + 1
    foody = Math.floor(Math.random() * 20) + 1
  }

  food.classList.add('food')
  board.append(food)
  food.style.gridRowStart = foody
  food.style.gridColumnStart = foodx
}

// snakes head which is the main thinf that moves snake will update from here by pressing keys
function snakeupdate() {

  snakearray[0].y += velocity.y
  snakearray[0].x += velocity.x

  snakegrow()

}
function snakegrow() {

  if (snakearray[0].x == foodx && snakearray[0].y == foody) {

    snakearray.push({ x: foodx, y: foody })

  }


  board.innerHTML = ""
  snakearray.forEach((e, index) => {
    snakebody = document.createElement('div');
    if (index == 0) { snakebody.classList.add('snake') }
    else { snakebody.classList.add('body'); }
    board.append(snakebody);

    snakebody.style.gridRowStart = e.y
    snakebody.style.gridColumnStart = e.x

  })
  for (let i = snakearray.length - 2; i >= 0; i--) {

    snakearray[i + 1] = { ...snakearray[i] }

  }

}
function scoreupdate(){
  scoreboard.innerHTML = 'YOUR SCORE :' + score
}
