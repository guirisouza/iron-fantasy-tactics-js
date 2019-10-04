let game = new Game();
let battlefield = game.startGame()

let board = document.querySelector('#board')

let html = ''


function updateRender() {
    battlefield.forEach((line, indexLine) => {
        line.forEach((square, indexSquare) => {
            let className = 'square'
            if(square == 'x') {
                document.getElementById(`${indexLine}-${indexSquare}`).classList.value += ' move'
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
            html += `<div id="${indexLine}-${indexSquare}" class="${className}" data-js-position-line="${indexLine}" data-js-position-square="${indexSquare}"></div>`
        });
        html += `</div>`
    });
}

render()
board.innerHTML = html

let squaresDivs = document.querySelectorAll('.square')

let linePosition
squaresDivs.forEach(square => {
    square.onclick = function(event) {
        console.log(event)
        linePosition = event.target.attributes['data-js-position-line'].value
        squarePosition = event.target.attributes['data-js-position-square'].value
        if (battlefield[linePosition][squarePosition]){
            battlefield[linePosition][squarePosition].range(6,battlefield)
            updateRender()
        } else {console.log('não é carinha')}

    }

});