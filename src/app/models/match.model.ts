import Player from './player.model';
import Tournament from './tournament.model';

class Match {
    _id: string;
    player1: Player;
    player2: Player;
    score1: number;
    score2: number;
    tournament: Tournament;

    constructor(json: any) {
        this._id = json._id;
        this.player1 = json.player1;
        this.player2 = json.player2;
        this.score1 = json.score1;
        this.score2 = json.score2;
        this.tournament = json.tournament;
    }

    // Ensure player is player1 (swap player 1 and 2 if not the case)
    correctPlayerOrder(player: Player): void {
        if (this.player2._id === player._id) {    
            // Swap player 1 and 2
            this.player2 = [this.player1, this.player1 = this.player2][0];

            // Swap score 1 and 2
            this.score2 = [this.score1, this.score1 = this.score2][0];
        }
    }

    // Return the winner of the match
    winner(): Player {
        return (this.score1 > this.score2) ? this.player1 : this.player2;
    }

}

export default Match;