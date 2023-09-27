// Modelo People 
export default class People {
    constructor(name, mass, height, homeworldName = "", homeworldId = ""){
        this.name = name;
        this.mass = mass;
        this.height = height
        this.homeworldName = homeworldName;
        this.homeworldId = homeworldId
    }
    
    getName() {
        return this.name;
    }

    getMass() {
        return this.mass;
    }

    getHeight() {
        return this.height;
    }

    getHomeworldName() {
        return this.homeworldName;
    }

    getHomeworlId() {
        return this.homeworldId;
    }

    getWeightOnPlanet(planetId){
        throw new Error('To be implemented');
    }
}