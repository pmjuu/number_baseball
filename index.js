gameSection = document.querySelector('#gameSection')
startBtn = document.querySelector('#startBtn')
restartBtn = document.querySelector('#restartBtn')
form = document.querySelector('form')
input = document.querySelector('form input')
resultList = document.querySelector('#resultList')
attempts = document.querySelector('#attempts')

startBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', restartGame)
form.addEventListener('submit', numSubmit)

const HIDDEN_CLASSNAME = 'hidden'

let inputNum = 0
let answerArr = []
let inputArr = []
let attemptsNum = 5

function startGame() {
  //서로 다른 0부터 9까지의 정수 3개를 배열에 넣기
  let i = 0
  while(i<3) {
    let newNum = Math.floor(Math.random()*10)
    if(!(answerArr.includes(newNum))) {
      i++
      answerArr.push(newNum.toString())
    }
  }
  console.log(answerArr)
  startBtn.classList.add(HIDDEN_CLASSNAME)
  gameSection.classList.remove(HIDDEN_CLASSNAME)
  form.classList.remove(HIDDEN_CLASSNAME)
  attempts.textContent = `attempts: ${attemptsNum}`
}

function restartGame() {
  inputNum = 0
  answerArr = []
  inputArr = []
  attemptsNum = 10
  const liArr = document.querySelectorAll('li')
  liArr.forEach((e) => e.remove())
  startGame()
}

function numSubmit(event) {
  event.preventDefault()
  inputNum = parseInt(input.value)
  inputArr = inputNum.toString().split('')
  console.log(inputArr)

  if (!(Number.isInteger(inputNum))) {
    alert('please enter the integer')
    input.value = ''
  }
  else if (inputArr.length !== 3) {
    alert('please enter the 3 integers')
    input.value = ''
  }
  else if (false) {
    alert('please enter 3 different integers') //서로 다른 3가지 수 입력 여부 어떻게 판별?
  }
  else {
    attemptsNum --
    attempts.textContent = `attempts: ${attemptsNum}`
    input.value = ''
    compare()
    if(attemptsNum === 0) {
      form.classList.add(HIDDEN_CLASSNAME)
      attempts.textContent = 'GAME OVER'
    }
  }
}

function compare() {
  let strike = 0
  let ball = 0

  for(let i = 0; i<3; i++) {
    if(inputArr[i] === answerArr[i]) {
      strike ++
    }
    else if (answerArr.includes(inputArr[i])) {
      ball ++
    }
  }

  const li = document.createElement('li')
  li.textContent = `${inputNum} -> ${strike}S ${ball}B`
  resultList.appendChild(li)
}