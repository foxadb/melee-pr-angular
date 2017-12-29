class Tournament {

    _id: string;
    name: string;
    date: Date;
    organiser: string;
    location: string;

    constructor(json: any) {
        this._id = json._id;
        this.name = json.name;
        this.date = json.date;
        this.organiser = json.organiser;
        this.location = json.location;
    }

}

export default Tournament;