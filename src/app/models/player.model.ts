import Match from './match.model';

class Player {
    _id: string;
    name: string;
    mains: Array<string>;
    location: string;
    score: number;
    matches: Array<string>;

    constructor() {
        this.name = "";
        this.mains = [];
        this.location = "";
        this.score = 0;
        this.matches = [];
    }
}

export default Player;