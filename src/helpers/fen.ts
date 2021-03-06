import { Board, PieceRef, AnyPiece, AllPieces } from './interfaces';

export const getBoardSnapshot = (board: Board): String => {
  let str: string = '';

  // board snapshot
  for (let y = 7; y >= 0; y--) {
    let emptySpaces = 0;
    for (let x = 0; x < 8; x++) {
      const piece: PieceRef | null = board[y][x].piece;
      if (piece) {
        if (emptySpaces > 0) str += emptySpaces;
        str += piece._id[0];
        emptySpaces = 0;
      } else {
        emptySpaces++;
        if (emptySpaces === 8 || x === 7) str += emptySpaces;
      }
    }
    if (y > 0) str += '/';
  }

  return str;
};

export const checkCastling = ({ active }: { active: AllPieces }): string => {
  let str: string = '';
  const allPieces = active.white.concat(active.black);

  // determine whiteside castling ability
  const wRook1 = allPieces.find((p: AnyPiece) => p._id === 'R1'); // kingside
  const wRook2 = allPieces.find((p: AnyPiece) => p._id === 'R2'); // queenside
  const wKing = allPieces.find((p: AnyPiece) => p._id === 'K');
  if (wRook1 && wKing) {
    if (!wRook1.hasMoved && !wKing.hasMoved) str += 'K'; // kingside
  }
  if (wRook2 && wKing) {
    if (!wRook2.hasMoved && !wKing.hasMoved) str += 'Q'; // queenside
  }

  // determine blackside castling ability
  const bRook1 = allPieces.find((p: AnyPiece) => p._id === 'r1'); // queenside
  const bRook2 = allPieces.find((p: AnyPiece) => p._id === 'r2'); // kingside
  const bKing = allPieces.find((p: AnyPiece) => p._id === 'k');
  if (bRook2 && bKing) {
    if (!bRook2.hasMoved && !bKing.hasMoved) str += 'k'; // kingside
  }
  if (bRook1 && bKing) {
    if (!bRook1.hasMoved && !bKing.hasMoved) str += 'q'; // queenside
  }

  return str;
};
