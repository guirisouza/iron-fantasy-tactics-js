// // intro game

// let startButton = document.querySelector('button')
// startButton.onclick = function(e){
//     let homeIntro = document.getElementsByClassName('home')
//     console.log(homeIntro[0])
//     homeIntro[0].style.visibility = 'hidden'
// }

// // 

let game = new Game();
let battlefield = game.startGame()

let playerOnePhase = [...battlefield.playerOnePhase]
let playerTwoPhase = [...battlefield.playerTwoPhase]
battlefield = battlefield.battlefied

let board = document.querySelector('#board')
let html = ''
// let oldPosition = ''
let oldChild


function updateRender(position, oldPosition) {
    if(position == undefined){
        position = false
    }
    if(oldPosition == undefined){
        oldPosition = false
    }
    if(char == undefined){
        char = false
    }
    console.log(position)
    battlefield.forEach((line, indexLine) => {
        line.forEach((square, indexSquare) => {
            let className = 'square'
            //verificar se é uma square normal e colo
            if(square == 0){
                document.getElementById(`${indexLine}-${indexSquare}`).classList = className
            }
            //verifica se tem x de range e pinta de azul com move
            if(square == 'x') {
                document.getElementById(`${indexLine}-${indexSquare}`).classList.value += ' move'
            }
            if(square == 'o') {
                document.getElementById(`${indexLine}-${indexSquare}`).classList.value += ' attack'
            }
            //verifica se tinha personagem e apaga imagem
            if(oldPosition){
                let element = document.getElementById(`${oldPosition[0]}-${oldPosition[1]}`)
                oldChild = document.getElementById(`${oldPosition[0]}-${oldPosition[1]}`).children[2]
                element.removeChild(oldChild)
                oldPosition = undefined
            }
            //verifica se tem personagem e coloca imagem
            if(square && position && actType == 'move') {
                let element = document.getElementById(`${position}`)
                element.classList.value = 'square'
                element.appendChild(oldChild)

            }
            if(game.actions.move == 1 && game.actions.attack == 0 && position ){
                document.getElementById(`${position}`).children[1].style.visibility = 'visible'
                document.getElementById(`${position}`).children[0].style.visibility = 'hidden'
            }
            if(game.actions.move == 0 && game.actions.attack == 1 && position ){
                document.getElementById(`${position}`).children[0].style.visibility = 'visible'
                document.getElementById(`${position}`).children[1].style.visibility = 'hidden'
            }
        });
    });
}

function render(){
    battlefield.forEach((line, indexLine) => {
        html += `<div class="line">`
        line.forEach((square, indexSquare) => {
            let className = 'square'
            if(square) {
                html += `<div id="${indexLine}-${indexSquare}" class="${className}" data-js-position-line="${indexLine}" data-js-position-square="${indexSquare}">
                <div class="option-move">
                    <p>move</p>
                </div>
                <div class="option-attack">
                    <p>attack</p>   
                </div>
                <img class="image-character" src="./images/class-persons-images-sprites/${battlefield[indexLine][indexSquare].image[0]}">
                </div>`
            } else {
                html += `<div id="${indexLine}-${indexSquare}" class="${className}" data-js-position-line="${indexLine}" data-js-position-square="${indexSquare}">
                <div class="option-move">
                    <p>move</p>
                </div>
                <div class="option-attack">
                    <p>attack</p>
                </div>
                </div>`
            }
        });
        html += `</div>`
    });
}

render()
board.innerHTML = html

let char
let indexChar
function phase(){
    if(game.endTurnFlag == 'start'){
        playerTurn = [...playerOnePhase]
    }
    
    if(game.actions.move == 1 && game.actions.attack == 1){
        game.actions.move = 0
        game.actions.attack = 0
        if(playerTurn.length === 0) {
            game.turn += 1
            if(game.turn%2 === 0){
                playerTurn = [...playerTwoPhase]
            } else {
            playerTurn = [...playerOnePhase]
            }
        }
    }

    if(game.actions.move == 0 && game.actions.attack == 0){
        typeAct = ''

        //pega um personagem aleatorio pra começar
        indexChar = Math.floor(Math.random() * playerTurn.length)
    
        //instancia o objeto do personagem
        char = playerTurn[indexChar]

        //Habilita a visualização das duas opções de ação(move/attack) do personagem instanciado
        document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0].style.visibility = 'visible'
        document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1].style.visibility = 'visible'

        // //instancia os dois elementos acima
        // let moveAct = document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0]
        // let attackAct = document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1]

        clickableActions()
    }

    if(game.actions.move == 1 && game.actions.attack == 0) {
        clickableActions()
    }

    if(game.actions.attack == 1 && game.actions.move == 0){
        clickableActions()
    }

    if(game.actions.attack == 1 && game.actions.move == 1){
        game.actions.attack =  0
        game.actions.move = 0
        phase()
    }
}


function rangeTarget(actType){
    let squaresDivs = document.querySelectorAll('.square')
    let linePosition
    let positionArgument
    squaresDivs.forEach(square => {
        square.onclick = function(event) {
            event.stopPropagation()
            console.log(actType)
            // linePosition = event.target.attributes['data-js-position-line'].value
            // squarePosition = event.target.attributes['data-js-position-square'].value
            // positionArgument = [linePosition,squarePosition]
            console.log('novo',square.id)
            let idSquare = square.id.split('-')
            let positionArgument = [parseFloat(square.id.split('-')[0]),parseFloat(square.id.split('-')[1]) ]
            game.moves =  {1:positionArgument, 2:`${square.id}`}
            if(actType == 'move'){
                game.actions.move += 1
                document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0].style.visibility = 'hidden'
                document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1].style.visibility = 'hidden'
                let oldPosition = char.position
                char.moveAct(char.position, game.moves[1], battlefield)
                if(game.actions.move == 1 && game.actions.attack == 1){
                    playerTurn.splice(playerTurn.indexOf(playerTurn[indexChar]),1)
                    phase()
                } else {
                    updateRender(game.moves[2], oldPosition)
                    phase()
                }

            }
            if(actType == 'attack'){
                game.actions.attack += 1
                document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1].style.visibility = 'hidden'
                document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0].style.visibility = 'hidden'
                char.rangeAttack(battlefield)
                // char.attack(idSquare, battlefield)
                if(game.actions.move == 1 && game.actions.attack == 1){
                    playerTurn.splice(playerTurn.indexOf(playerTurn[indexChar]),1)
                    game.cleaner('o', battlefield)
                    updateRender(game.moves[2])
                    game.endTurnFlag = 'end'
                    phase()
                } else {
                updateRender(game.moves[2])
                game.endTurnFlag = 'end'
                phase()
                }
            }
        }
    });
    
}

let moveDivs = document.querySelectorAll('.option-move')
let attackDivs = document.querySelectorAll('.option-attack')

function clickableActions(){
    moveDivs.forEach(moveActionDiv => {
        moveActionDiv.onclick = function(event){
            actType = 'move'
            event.stopPropagation()
            positionArgument = `${char.position[0]}${char.position[1]}`
            char.range(char.move,battlefield)
            updateRender()
            rangeTarget(actType)
        }
        
    });
    attackDivs.forEach(attackActionDiv => {
        attackActionDiv.onclick = function(event){
            actType = 'attack'
            event.stopPropagation()
            positionArgument = `${char.position[0]}${char.position[1]}`
            char.rangeAttack(battlefield)
            updateRender()
            rangeTarget(actType)
            } 
    })
}

phase()








// document.addEventListener("click",handler,true)



