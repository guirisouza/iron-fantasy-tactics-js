let game = new Game();
let battlefield = game.startGame()

let playerOnePhase = battlefield.playerOnePhase
let playerTwoPhase = battlefield.playerTwoPhase
battlefield = battlefield.battlefied

let board = document.querySelector('#board')
let html = ''
let result = ''


function updateRender(position) {
    if(position == undefined){
        position = false
    }
    console.log(position)
    battlefield.forEach((line, indexLine) => {
        line.forEach((square, indexSquare) => {
            let className = 'square'
            if(square == 'x') {
                document.getElementById(`${indexLine}-${indexSquare}`).classList.value += ' move'
            }
            // if(position == `${indexLine}${indexSquare}`){
            //     document.getElementById(`${indexLine}-${indexSquare}`).children[0].style.visibility = 'visible'
            //     document.getElementById(`${indexLine}-${indexSquare}`).children[1].style.visibility = 'visible'
            // }
        });
    });
}

function render(){
    battlefield.forEach((line, indexLine) => {
        html += `<div class="line">`
        line.forEach((square, indexSquare) => {
            let className = 'square'
            if(square) {
                className = 'square hascharacter'
            }
            html += `<div id="${indexLine}-${indexSquare}" class="${className}" data-js-position-line="${indexLine}" data-js-position-square="${indexSquare}">
            <div class="option-move">
                <p>move</p>
            </div>
            <div class="option-attack">
                <p>attack</p>
            </div>
            </div>`
        });
        html += `</div>`
    });
}

render()
board.innerHTML = html


function phase(){
    
    playerTurn = playerOnePhase

    //pega um personagem aleatorio pra começar
    let indexChar = Math.floor(Math.random() * playerOnePhase.length)

    //instancia o objeto do personagem
    let char = playerTurn[indexChar]

    //Habilita a visualização das duas opções de ação(move/attack) do personagem instanciado
    document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0].style.visibility = 'visible'
    document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1].style.visibility = 'visible'

    //instancia os dois elementos acima
    moveAct = document.getElementById(`${char.position[0]}-${char.position[1]}`).children[0]
    attackAct = document.getElementById(`${char.position[0]}-${char.position[1]}`).children[1]

    //Habilita div de movimento para se tornar clicável e disparar o método range() e desenhar na tela o range de movimento a partir do 
    // metodo updateRender() 
    moveAct.onclick = function(event){
        positionArgument = `${char.position[0]}${char.position[1]}`
        char.range(char.move,battlefield)
        updateRender()
        }

    //!!!!!!  DESAFIO !!!!!!!//
    //  feito os passos acimas nós conseguimos iniciar a jogada do personagem, acionar o movimento e desenhar o range na tela, agora falta selecionar
    // o quadrado desejado para deslocar o personagem.
    //  Qual foi a maneira que desenhei pra realizar isso:
    // 1 - para mover o personagem eu preciso pegar a nova posição na matriz que eu clicar, oq eu fiz foi criar uma função rangeTarget() que basicamente faz:
    // um for por todas as divs, squares, 'espaços de movimento na matriz' passando evento para todas, e assim que clicada, retornar o id daquela div que
    // é a posição da matriz, entretanto, nos meus testes não consegui interagir com o retorno dela, então, eu criei um atributo na minha classe
    // Game para poder armazenar essa posição e posteriormente pega la e joga la como argumento na minha função moveAct, função essa responsável
    // para mudar o personagem na matriz para a nova posição.

    rangeTarget()

    console.log(result)

    //!!!!!! aqui o codigo deveria esperar eu clicar para pegar a posição indicada para depois continuar e não sei como faz isso e se está certo meu
    //raciocinio

    targetClickSquare =  document.getElementById(game.moves[2]) // <---quando chega aqui o codigo, não existe o game.moves ainda, pois só se criar
    // depois que clicar, ou seja, o codigo ta rodando a função toda e eu não sei como criar um 'espaço de espera' para poder pegar a posição nova.
    
    //aqui seria o momento que ao clicar no quadrado novo ele executaria 
    targetClickSquare.onclick = function(event){
        moveAct(char.position, game.moves[1], battlefield)
        updateRender(positionArgument)
        }
    //tira o personagem do turno
    playerTurn.splice(playerTurn.indexOf(playerTurn[indexChar]),1)
    
}

function rangeTarget(){
    let squaresDivs = document.querySelectorAll('.square')
    let linePosition
    let positionArgument
    squaresDivs.forEach(square => {
        square.onclick = function(event) {
            linePosition = event.target.attributes['data-js-position-line'].value
            squarePosition = event.target.attributes['data-js-position-square'].value
            positionArgument = [linePosition,squarePosition]
            result = {1:positionArgument, 2:`${linePosition}-${squarePosition}`}
            return result
        }
    });
}
    
phase()

// for (let player of round){
//     for (let character of player) {
//         let position = character.position
//         square = document.getElementById(`${position[0]}-${position[1]}`)
//         square.onclick = function(event){
//             linePosition = event.target.attributes['data-js-position-line'].value
//             squarePosition = event.target.attributes['data-js-position-square'].value
//             positionArgument = `${linePosition}${squarePosition}`
//             if (battlefield[linePosition][squarePosition]){
//                 let char = battlefield[linePosition][squarePosition]
//                 char.range(char.move,battlefield)
//                 updateRender(positionArgument)
//             }    
//         }       
//     }
// }
