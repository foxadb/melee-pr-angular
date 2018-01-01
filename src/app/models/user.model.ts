class User {
    _id: string;
    username: string;
    password: string;
    role: string;

    constructor(json: any) {
        this._id = json._id;
        this.username = json.username;
        this.password = json.password;
        this.role = json.role;
    }

    public isAdmin(): boolean {
        return this.role == 'admin';
    }

}

export default User;