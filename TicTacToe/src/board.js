const notOccupied = -1;
const xOccupied = 0;
const oOccupied = 1
const startSquares = [
    notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied
]
const playerMove = document.querySelector(".playerMove")

let board = {
    occupiedSquares : [...startSquares],
    XToMove : true,
    plyCount : 0,
    stack : [-1, -1, -1, -1, -1, -1, -1, -1 ,-1],
    makeMove : function(move, inThink = true) {
        this.occupiedSquares[move] = this.XToMove ? xOccupied : oOccupied
        this.stack[this.plyCount] = move;
        if (!inThink) {
            document.getElementById(move.toString()).innerText = this.XToMove ? 'X' : 'O'
            document.getElementById(move.toString()).style.color = this.XToMove ? 'red' : 'blue';
        }
        
        this.XToMove = !this.XToMove
        this.plyCount++;
    },
    undoMove : function(move) {
        this.plyCount--;
        if (this.stack[this.plyCount] != move) 
            throw new Error("move was never played")
        this.occupiedSquares[move] = notOccupied
        this.XToMove = !this.XToMove
    },
    resetBoard : function() {
        this.XToMove = true;
        this.occupiedSquares = [...startSquares];
        this.stack = [...startSquares];
        this.plyCount = 0;
        document.getElementById("board").innerHTML = 
        `
     |     |     
  <span id = "0">0</span>  |  <span id = "1">1</span>  |  <span id = "2">2</span>  
_____|_____|_____
     |     |     
  <span id = "3">3</span>  |  <span id = "4">4</span>  |  <span id = "5">5</span>  
_____|_____|_____   
     |     |     
  <span id = "6">6</span>  |  <span id = "7">7</span>  |  <span id = "8">8</span>  
     |     |     
        `

        for (let i = 0; i < 9; i++) {
            document.getElementById(i).addEventListener("click", function() {
                playerMove.value = i;
                document.querySelector("#submitMoveButton").click()
            }) 
        }   
    },
    generateMoves : function() {
        var legalMoves = [];

        if (this.checkWinning() != -1) return legalMoves;

        for (let i = 0; i < 9; i++) {
            if (this.occupiedSquares[i] == notOccupied) {
                legalMoves.push(i);
            }
        }
        

        return legalMoves;
    },
    // return value of -1 means nobody is winning
    // value of 0 means x is winning,
    // value of 1 means o is winning.
    checkWinning : function() {
        // check columns
        for (let i = 0; i <= 2; i++) {
            if (this.occupiedSquares[i] == this.occupiedSquares[i + 3] && this.occupiedSquares[i + 3] == this.occupiedSquares[i + 6])
                return this.occupiedSquares[i]
        }
        // check rows
        for (let i = 0; i <= 6; i += 3) {
            if (this.occupiedSquares[i] == this.occupiedSquares[i + 1] && this.occupiedSquares[i + 1] == this.occupiedSquares[i + 2])
                return this.occupiedSquares[i]
        }
        // check diagonals
        if (this.occupiedSquares[0] == this.occupiedSquares[4] && this.occupiedSquares[4] == this.occupiedSquares[8] 
        || this.occupiedSquares[2] == this.occupiedSquares [4] && this.occupiedSquares[4] == this.occupiedSquares [6])
        return this.occupiedSquares[4]


        return -1;
    }
}

