import { Link } from "react-router-dom";

export default function GameElement({
    gameId,
    player1,
    player2,
    canJoin,
    myGame,
    host,
    secondPlayer,
}) {
    return (
        <li className="game-list-item">
            <div>
                <span>{host ? "my game" : `host: ${player1.username}`}</span>
            </div>
            {!canJoin && (
                <div>
                    <Link className="btn-connect" to={`/board/${gameId}`}>
                        {myGame ? "reconnect" : "connect"}
                    </Link>
                </div>
            )}

            {canJoin && (
                <div>
                    <Link className="btn btn-connect" to={`/join/${gameId}`}>
                        join
                    </Link>
                </div>
            )}
            {host && (
                <div>
                    <Link className="btn-delete" to={`/delete/${gameId}`}>
                        delete
                    </Link>
                </div>
            )}
            {secondPlayer && (
                <div>
                    <Link className="btn-delete" to={`/disconnect/${gameId}`}>
                        disconnect
                    </Link>
                </div>
            )}
        </li>
    );
}
