const diaglogText = document.getElementById("dialogText")
const dialog = document.getElementById("dialog")


for (let i = 0; i < 9; i++) {
    document.getElementById(i).addEventListener("click", function() {
        playerMove.value = i;
        document.querySelector("#submitMoveButton").click()
    }) 
}   


document.querySelector("#submitMove").addEventListener("submit", function() {
    event.preventDefault();
   
    const move = parseInt(playerMove.value);

    if (isNaN(move) || move < 0 || move > 8) {
        showModal("enter a valid move (0-8).");
        return;
    }

    if (!board.generateMoves().includes(move)) {
        showModal("not a legal move buddy");
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
        showModal((board.checkWinning() == 0 ? 'X ' : 'O ' ) + "has won.")
        return true;
    } 
    if (board.generateMoves().length == 0) {
        showModal("draw")
        return true;
    }

    return false;
}

document.getElementById("dialogButton").addEventListener("click", function() {
    dialog.close()
    if(board.checkWinning() != -1 || board.generateMoves().length == 0)board.resetBoard()
})

function showModal(textDisplayed) {
    diaglogText.innerText = textDisplayed
    dialog.showModal()
}
