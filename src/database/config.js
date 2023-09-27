export default class Database {
    constructor() {
        this.logs = [];
        this.peoples = [
            {   id: 1,
                name: "Luke Skywalker",
                height: 172,
                mass: 77,
                homeworld_name: "Tatooine",
                homeworld_id: "/planets/1"
            }
        ];
        this.planets = [
            {
                id: 1,
                name: "Tatooine",
                gravity: 1.0
            }
        ];
    }

    addLog(log) {
        this.logs.push(log);
        console.log(this.logs);
    }

    getLogs() {
        return this.logs;
    }

    getPeoples() {
        return this.peoples;
    }

    getPlanets() {
        return this.planets;
    }
}