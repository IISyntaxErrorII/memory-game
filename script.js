
let words = ["Cat","Dog","Dolphin","Shark","Monkey","Giraffe","Snake","Spider","Parrot","Butterfly","Cat","Dog","Dolphin","Shark","Monkey","Giraffe","Snake","Spider","Parrot","Butterfly",]
const $cards = document.querySelectorAll(".card")
const $cardsArray = [...$cards]
const $cardsBack = document.querySelectorAll(".cardBack")
const $cardsBackArray = [...$cardsBack]
const $words = document.querySelectorAll(".word")
const $wordsArray = [...$words]
const $score = document.querySelector(".score")
const $moves = document.querySelector(".moves")
const $highScore = document.querySelector(".HighScore")
const $gameOver = document.querySelector(".gameOver")

let correctWords = []
let score = 0
let highScore = localStorage.getItem("memory-game-high-score") || 0;
let moves
let visibleWords = []
let gameOver
$gameOver.addEventListener("click", ()=>{
    location.reload()
})
function startGame(){
    document.querySelector(".startGame").style.display = "none"
    moves = 50
    $moves.textContent = moves
    $highScore.textContent = highScore
    gameOver = false
    $wordsArray.forEach(word => {
    let randomNum = Math.floor(Math.random() * words.length)
    word.textContent = words[randomNum]
    word.classList.add(words[randomNum])
    words.splice(randomNum, 1)
    })
    showCard()
}
function showCard(){
    for (let i = $cardsArray.length - 1; i >= 0; i--){
        $cardsArray[i].addEventListener("click", ()=>{
            if (visibleWords.length < 2  && !gameOver &&
            !$wordsArray[i].classList.contains("showCard")
            ){
                $wordsArray[i].classList.remove("unShowCard")
                void $wordsArray[i].offsetWidth
                $wordsArray[i].classList.add("showCard")
                visibleWords.push($wordsArray[i])
                moves--
                $moves.textContent = moves
            }
            if (visibleWords.length === 2){
            matchCards()
        }
        })
    }
}
function matchCards(){
    let wordsAreTheSame = visibleWords[0].textContent === visibleWords[1].textContent
    if (wordsAreTheSame){
        score++
        $score.textContent = score
        correctWords.push(visibleWords[0], visibleWords[1])
        console.log(correctWords)
        if(score > highScore){
            $highScore.textContent = score
        }
        visibleWords = []
        highScore = score > highScore? score: highScore
        localStorage.setItem("memory-game-high-score", highScore);
        let playerWin = correctWords.length === $wordsArray.length
        if (playerWin){
            const $playerWin = document.querySelector(".playerWin")
            $playerWin.style.display = "block"
            $playerWin.addEventListener("click", ()=>{
                location.reload()
            })
            score+=moves
            highScore = score > highScore? score: highScore
            localStorage.setItem("memory-game-high-score", highScore);
        }
        if (moves <= 0 && !playerWin){
            gameOver = true
            $gameOver.style.display = "block"
        }
    }
    else {
        visibleWords.forEach(word=>{
            word.classList.remove("showCard")
            word.classList.add("unShowCard")
            visibleWords = []
        })
        if (moves <= 0){
            gameOver = true
            $gameOver.style.display = "block"
        }
    }
}