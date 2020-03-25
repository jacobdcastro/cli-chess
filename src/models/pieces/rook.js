const Piece = require("../piece");
const getSpaceIds = require("../../helpers/getSpaceIds");

class Rook extends Piece {
	constructor(isWhite, position) {
		super(isWhite, position, "♜ ", "♖ ");
		this._id = isWhite ? "R" : "r";
		this.firstMove = false;
		this.getPossibleMoves = this.getPossibleMoves;
	}

	getPossibleMoves(board) {
		let possibleMoves = [];
		const { x, y } = this.position;

		// ? eastward moves
		// if x === 7, then piece is on east-side edge
		// of board, don't look for moves in this direction
		if (x !== 7) {
			for (let i = x + 1; i < 8; i++) {
				const pos = { x: i, y };
				const { piece } = board[y][i];

				if (piece !== null) {
					// if space is occupied by enemy, add space and break loop
					if (piece.isWhite !== this.isWhite) {
						possibleMoves.push(pos);
						break;
					} else {
						break;
					}
				} else {
					possibleMoves.push(pos);
				}
			}
		}

		// ? westward moves
		// if x === 0, then piece is on west-side edge
		// of board, don't look for moves in this direction
		if (x !== 0) {
			for (let i = x - 1; i >= 0; i--) {
				const pos = { x: i, y };
				const { piece } = board[y][i];

				if (piece !== null) {
					// if space is occupied by enemy, add space and break loop
					if (piece.isWhite !== this.isWhite) {
						possibleMoves.push(pos);
						break;
					} else {
						break;
					}
				} else {
					possibleMoves.push(pos);
				}
			}
		}

		// ? northward moves
		// if y === 7, then piece is on north-side edge
		// of board, don't look for moves in this direction
		if (y !== 7) {
			for (let i = y + 1; i < 8; i++) {
				const pos = { x, y: i };
				const { piece } = board[i][x];

				if (piece !== null) {
					// if space is occupied by enemy, add space and break loop
					if (piece.isWhite !== this.isWhite) {
						possibleMoves.push(pos);
						break;
					} else {
						break;
					}
				} else {
					possibleMoves.push(pos);
				}
			}
		}

		// ? southward moves
		// if y === 7, then piece is on south-side edge
		// of board, don't look for moves in this direction
		if (y !== 0) {
			for (let i = y - 1; i >= 0; i--) {
				const pos = { x, y: i };
				const { piece } = board[i][x];

				if (piece !== null) {
					// if space is occupied by enemy, add space and break loop
					if (piece.isWhite !== this.isWhite) {
						possibleMoves.push(pos);
						break;
					} else {
						break;
					}
				} else {
					possibleMoves.push({ x, y: i });
				}
			}
		}

		return getSpaceIds(possibleMoves);
	}
}

module.exports = Rook;