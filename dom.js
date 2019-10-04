let game = new Game();
let battlefield = game.startGame()

let board = document.querySelector('#board')

let html = ''


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
            if(position == `${indexLine}${indexSquare}`){
                document.getElementById(`${indexLine}-${indexSquare}`).children[0].style.visibility = 'visible'
                document.getElementById(`${indexLine}-${indexSquare}`).children[1].style.visibility = 'visible'
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

let squaresDivs = document.querySelectorAll('.square')

let linePosition
let positionArgument
squaresDivs.forEach(square => {
    square.onclick = function(event) {
        console.log(event)
        linePosition = event.target.attributes['data-js-position-line'].value
        squarePosition = event.target.attributes['data-js-position-square'].value
        positionArgument = `${linePosition}${squarePosition}`
        if (battlefield[linePosition][squarePosition]){
            let char = battlefield[linePosition][squarePosition]
            char.range(char.move,battlefield)
            updateRender(positionArgument)
        } else {console.log('não é carinha')}

    }

});