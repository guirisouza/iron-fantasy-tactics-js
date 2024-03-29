
class PersonJob {
    constructor(name,
        gloryCry,
        damage,
        attackRange,
        evasion,
        healthPoints,
        magicPoints,
        status,
        image,
        move,
        position
    ) {
        //name of character must be string
        this.name = name;
        //phrase of when character kills an enemy must be string
        this.gloryCry = gloryCry;
        //must be a list with 2 values exp: [3,5]
        this.damage = damage;
        //if the value is apply 
        this.attackRange = attackRange
        //must be a integer number '2'
        this.evasion = evasion;
        //must be a integer number '53'
        this.healthPoints = healthPoints;
        //must be integer number '53'
        this.magicPoints = magicPoints;
        //must be a string
        this.status = status;
        //string with a path of character image file
        this.image = image;
        //must be a integer number '5'
        this.move = move;
        //must be a integer number '2'
        this.position = position;
        };
    attack(opponent, matrix) {
        opponent = matrix[opponent[0]][opponent[1]]
        let dano = Math.floor(Math.random()*(this.damage[0], this.damage[1]));
        opponent.healthPoints -=  dano;   
    }

    ckeckRange(){
        //to do
    }
    checkSquareIsAttackable(position, matrix){
        if(matrix[position[0]][position[1]] != '' ){
            return matrix[position[0]][position[1]]
            }else{
                return 'o'
            } 
    }

    checkSquareIsWalkable(position, matrix){
        if(matrix[position[0]][position[1]] != '' ){
            return matrix[position[0]][position[1]]
        }else{
            return 'x'
        } 
    }



    moveAct(oldPosition,newPosition, matrix){
        console.log(oldPosition)
        console.log(newPosition)
        let char = matrix[oldPosition[0]][oldPosition[1]]
        matrix[oldPosition[0]][oldPosition[1]] = 'x'
        matrix[newPosition[0]][newPosition[1]] = char
        char.position = [newPosition[0],newPosition[1]]
        game.cleaner('x', matrix)
    }

    vertRange(range, matrix) {
        let position = this.position
        matrix[position[0]][position[1]] = this.checkSquareIsWalkable(this.position, matrix)
        //vertical line bellow position
        for(let i = position[0] +1; i <= position[0] + range; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[i][position[1]] = this.checkSquareIsWalkable([i,position[1]], matrix)
            }
        }
        //vertical line above position
        for(let i = position[0] - range; i <= position[0] -1; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[i][position[1]] = this.checkSquareIsWalkable([i,position[1]], matrix)
            }
        }
    }

    range(range, matrix){
        let savePosition = this.position[1]
        let position = this.position
        let fixRange = range
        while(range >= 0) {
            if (matrix[position[0]][position[1]] === undefined ){
                range -= 1
                position[1] += 1
                continue
            } else {
                this.vertRange(range, matrix)
                range -= 1
                position[1] += 1
            }
        }
        position[1] = savePosition
        position[1] -= fixRange
        let cnt = 0
        while(cnt < fixRange){
            if (matrix[position[0]][position[1]] === undefined ){
                cnt += 1
                position[1] += 1 
            } else {
                this.vertRange(cnt, matrix)
                cnt += 1
                position[1] += 1
            } 
        }
    }

    rangeAttack(matrix){
        let position = this.position
        let range = this.attackRange
        matrix[position[0]][position[1]] = this.checkSquareIsWalkable(this.position, matrix)
        //vertical line bellow position
        for(let i = position[0] +1; i <= position[0] + range; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[i][position[1]] = this.checkSquareIsAttackable([i,position[1]], matrix)
            }
        }
        //vertical line above position
        for(let i = position[0] - range; i <= position[0] -1; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[i][position[1]] = this.checkSquareIsAttackable([i,position[1]], matrix)
            }
        }
        //horizontal line before position
        for(let i = position[1] - range; i <= position[1] -1; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[position[0]][i] = this.checkSquareIsAttackable([position[0],i], matrix)
            }
        }
        // horizontal line after position
        for(let i = position[1] + 1; i <= position[1] + range; i++){
            if (matrix[i] == undefined) {
                continue
            } else {
                matrix[position[0]][i] = this.checkSquareIsAttackable([position[0],i], matrix)
            }
        }
}
}

class Game {
    constructor(turn, phase, round, movesChars, actions, endTurnFlag ) {
        this.turn = 1
        this.phase = 0
        this.round = 0
        this.moves = {}
        this.actions = {attack:0, move:0}
        this.endTurnFlag = 'start'
    }
    cleaner(typeAct,matrix){
        let cntLine=0
        let cntSquare=0
        for(let line of matrix){
            for(let square of line){
                if(square == typeAct){
                    matrix[cntLine][cntSquare] = 0
                    cntSquare +=1
                } else {
                    cntSquare +=1
                }
            }
            cntSquare = 0
            cntLine +=1
        }
    }
    startGame() {
        //Characters obj creating
        let squire = new PersonJob('Squire','This is for my team!',[6,11],1,3,43,null,null,['squire-1.png'],4,[0,0])
        let thief = new PersonJob('Thief','Do you think this corpse has some money?',[3,6],1,7,39,null,null, ['thief-1.png'],6,[0,0])
        let whiteMage = new PersonJob('White Mage','May your God welcome you the way you deserve',[4,6],1,3,36,40,null,['white-mage-1.png'],3,[0,0])
        let blackMage = new PersonJob('Black Mage', '...hmm',[4,6],1,4,37,40,null,['black-mage-1.png'],3,[0,0])
        let lancer = new PersonJob('Lancer', 'Pierced by my spear!', [7,8],2,5,51,null,null,['lancer-1.png'],5,[0,0])
        let knight = new PersonJob('Knight', 'One more to ennoble my honour!',[7,8],1,5,51,null,null,['knight-1.png'],4,[0,0])
        let bard = new PersonJob('Bard', 'Whistling song', [1,9],3,2,38,35,null,['bard-1.png'],4,[0,0])
        let archer = new PersonJob('Archer','Right on target!', [5,9],7,5,40,null,null,['archer-1.png'],5,[0,0])
        let monk = new PersonJob('Monk','I should meditate now \'oom\'',[3,15],1,6,30,null,null,['monk-1.png'],5,[0,0])
        let paladin = new PersonJob('Paladin','God Bless You.',[6,8],1,5,44,null,null,['paladin-1.png'],4,[0,0])

        //array with all 10 characters
        let playerOne = [squire, thief, whiteMage, blackMage, lancer, knight, bard, archer, monk, paladin]

        //phase list players
        let playerOnePhase = []
        let playerTwoPhase = []

        //randomize all characters
        for (let i=0; i < playerOne.length; i++) {
            var j = Math.floor(Math.random() * playerOne.length)
            var a = playerOne[i]
            var b = playerOne[j]
            playerOne[i] = b
            playerOne[j] = a          
        }
        
        //create player two and player one set
        let  playerTwo = playerOne.splice(5)

        let battleField = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]

        function catchListItem(list) {
            let rand = Math.random()
            let person =  Math.floor(rand*list.length)
            return person  
        }
        
        let index = 0
        
        for (let i = 0; i < battleField.length; i++) {
            if(i >= 4) {
                if(playerOne.length > 0){
                    index = catchListItem(playerOne)
                    battleField[i][battleField[1].length - 1] = playerOne[index] 
                    playerOnePhase.push(playerOne[index])
                    playerOne[index].position[0] = i
                    playerOne[index].position[1] = battleField[1].length - 1
                    playerOne.splice(playerOne.indexOf(playerOne[index]),1)
                }
                if(playerTwo.length > 0){
                    index = catchListItem(playerTwo)
                    battleField[i][0] = playerTwo[index]
                    playerTwoPhase.push(playerTwo[index])
                    playerTwo[index].position[0] = i
                    playerTwo[index].position[1] = 0
                    playerTwo.splice(playerTwo.indexOf(playerTwo[index]),1)
                }
            }
        }
        return {'battlefied':battleField, 'playerOnePhase':playerOnePhase, 'playerTwoPhase':playerTwoPhase};
    }
}





