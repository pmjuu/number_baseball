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
  while(answerArr.length < 3) {
    let newNum = Math.floor(Math.random()*10)
    answerArr.push(newNum.toString())
    const answerSet = new Set(answerArr) //중복 제거
    answerArr = [...answerSet]
  }
  console.log(`answer arr : ${answerArr}`)
  startBtn.classList.add(HIDDEN_CLASSNAME)
  gameSection.classList.remove(HIDDEN_CLASSNAME)
  form.classList.remove(HIDDEN_CLASSNAME)
  attempts.textContent = `attempts: ${attemptsNum}`
}

function restartGame() {
  inputNum = 0
  answerArr = []
  inputArr = []
  attemptsNum = 5
  const liArr = document.querySelectorAll('li')
  liArr.forEach(e => e.remove())
  startGame()
}

function numSubmit(event) {
  event.preventDefault()
  inputNum = parseInt(input.value)
  // inputArr = inputNum.toString().split('')
  inputArr = input.value.split('')

  if (!(Number.isInteger(inputNum))) {
    alert('please enter the integer')
    input.value = ''
  }
  else if (inputArr.length !== 3) {
    alert('please enter the 3 integers')
    input.value = ''
  }
  else if (inputArr[0]===inputArr[1] || inputArr[0]===inputArr[2] || inputArr[1]===inputArr[2]) {
    alert('please enter 3 different integers') //서로 다른 3가지 수 입력 여부 판별...
    input.value = ''
  }
  else {
    attemptsNum --
    attempts.textContent = `attempts: ${attemptsNum}`
    input.value = ''
    compare()
    if(attemptsNum === 0) {
      form.classList.add(HIDDEN_CLASSNAME)
      attempts.innerHTML = 'GAME OVER!<br>' + `the answer was ${answerArr.join('')}`
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