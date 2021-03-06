
module.exports = (function() {
	/*
	 0 1 2
	 3 4 5
	 6 7 8
	*/
	var board = [
		undefined, undefined, undefined,
		undefined, undefined, undefined,
		undefined, undefined, undefined,
	];
	
	var lastPlayer = undefined;
	
	var AI_MOVES = [4, 0, 2, 6, 8, 1, 3, 5, 7];
	
	function canMove(tile) {
		return !hasWinner() && (board[tile] === undefined);
	}
	
	function hasWinner() {
		function checkHorizontal() {
			var b = board;
			return (b[0] != undefined && b[0] === b[1] && b[0] === b[2]) ||
				(b[3] != undefined && b[3] === b[4] && b[3] === b[5]) ||
				(b[6] != undefined && b[6] === b[7] && b[6] === b[8]);
		}
		function checkVertical() {
			var b = board;
			return (b[0] != undefined && b[0] === b[3] && b[0] === b[6]) ||
				(b[1] != undefined && b[1] === b[4] && b[1] === b[7]) ||
				(b[2] != undefined && b[2] === b[5] && b[2] === b[8]);
		}
		function checkAcross() {
			var b = board;
			return (b[0] != undefined && b[0] === b[4] && b[0] === b[8]) ||
				(b[2] != undefined && b[2] === b[4] && b[2] === b[6]);
		}

		return checkHorizontal() || checkVertical() || checkAcross();
	}
	
	function hasMoves() {
		for (var i in board) {
			if (board[i] === undefined) {
				return true;
			}
		}
		return false;
	}
	
	function selectTile(tile, player) {
		if (canMove(tile)) {
			board[tile] = player;
			lastPlayer = player;
		}
	}

	function performAiMove() {
		for (var i = 0; i < AI_MOVES.length; i++) {
			var tile = AI_MOVES[i];
			if (canMove(tile)) {
				selectTile(tile, 'O');
				break;
			}
		}
	}
	
	function gameStatus() {
		var resp = {
			winningPlayer: lastPlayer,
			winner: hasWinner(),
			hasMovesLeft: hasMoves(),
			board: board
		}
		return resp;
	}
	
	function resetBoard() {
		for (var i in board) {
			board[i] = undefined;
		}
		lastPlayer = undefined;
	}
	
	return {
		hasWinner: hasWinner,
		hasMoves: hasMoves,
		selectTile: selectTile,
		performAiMove: performAiMove,
		gameStatus: gameStatus,
		reset: resetBoard
	};
}())
