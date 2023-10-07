document.querySelector("#submitMove").addEventListener("submit", function() {

    event.preventDefault();
   
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

    console.log(board.occupiedSquares)

    if(alertWhoIsWinning()) return;

    search(maxDepth);
    board.makeMove(bestMoveRoot, false)

    console.log(board.occupiedSquares)

    alertWhoIsWinning()
})

function alertWhoIsWinning() {
    if (board.checkWinning() != -1) {
        alert((board.checkWinning() == 0 ? 'X ' : 'O ' ) + "has won.")
        board.resetBoard()
        return true;
    } 
    if (board.generateMoves().length == 0) {
        alert("Draw.")
        board.resetBoard()
        return true;
    }

    return false;
}
