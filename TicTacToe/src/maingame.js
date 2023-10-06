const notOccupied = -1;
const xOccupied = 0;
const oOccupied = 1
const startSquares = [
    notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied, notOccupied
]
const playerMove = document.querySelector(".playerMove")

let board = {
    occupiedSquares : startSquares,
    XToMove : true,
    plyCount : 0,
    stack : [-1,-1,-1,-1,-1,-1,-1,-1],
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
        this.occupiedSquares = startSquares;
        for(let i = 0; i < 9; i++) {
            document.getElementById(i.toString()).innerText = i;
            document.getElementById(i.toString()).style.color = 'black'
        }
    },
    generateMoves : function() {
        var legalMoves = [];

        if (this.checkWinning() != -1) return legalMoves;

        for(let i = 0; i < 9; i++) {
            let testMove = this.occupiedSquares[i]
            if (testMove == notOccupied) 
                legalMoves.push(i)
            
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

document.querySelector("#submitMove").addEventListener("click", function() {
   
    if (alertWhoIsWinning()) return;


    const move = parseInt(playerMove.value);

    if (isNaN(move) || move < 0 || move > 8) {
        alert("enter a valid move (0-8).");
        return;
    }

    if (!board.generateMoves().includes(move)) {
        alert("not a legal move buddy");
        return;
    }

    bestMoveRoot = -1;
    board.makeMove(move, false);

    alertWhoIsWinning()

    search(maxDepth);
    board.makeMove(bestMoveRoot, false)

    alertWhoIsWinning()
})

function alertWhoIsWinning() {
    if (board.checkWinning() != -1) {
        
        setTimeout(() => {alert((board.checkWinning() == 0 ? 'X ' : 'O ' ) + "has won.")}, 1)
        board.resetBoard()
        return true;
    }

    return false;
}
