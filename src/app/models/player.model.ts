import Match from './match.model';

class Player {
    _id: string;
    name: string;
    mains: Array<string>;
    location: string;
    score: number;
    matches: Array<string>;

    constructor(json: any) {
        this._id = json._id;
        this.name = json.name;
        this.mains = json.mains;
        this.location = json.location;
        this.score = json.score;
        this.matches = json.matches;
    }

    getScore(): number {
        return this.score;
    }
}

export default Player;