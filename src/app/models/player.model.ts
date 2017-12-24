class Player {
    _id: string;
    name: string;
    mains: Array<string>;
    location: string;
    score: number;

    constructor(name: string, mains: Array<string>, location: string, score: number) {
        this.name = name;
        this.mains = mains;
        this.location = location;
        this.score = score;
    }
}

export default Player;