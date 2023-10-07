let bestMoveRoot = -1;
let maxDepth = 10;
let nodes = 0

function search(depth, alpha, beta) {
    let legalMoves = board.generateMoves();
    if (legalMoves.length == 0 || depth == 0) return board.checkWinning() == -1 ? Math.random() : -99999 - depth;
    let eval;
    let bestEval = -9999999;
 
    for (let i = 0; i < legalMoves.length; i++) {
        let move = legalMoves[i]; // Get the move from the legalMoves array

        board.makeMove(move);
        eval = -search(depth - 1, -beta, -alpha);
        board.undoMove(move);

        if (eval > bestEval) {
            bestEval = eval;
            if (depth === maxDepth) {
                bestMoveRoot = move;
            }
            if (eval > alpha) {
                alpha = eval;
                if (alpha >= beta) break;
            }
        }
    }

    return bestEval;
}

    }

    return bestEval;
}
