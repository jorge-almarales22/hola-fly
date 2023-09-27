export default class People {
    constructor(name, mass, height, homeworldName = "", homeworldId = ""){
        this.name = name;
        this.mass = mass;
        this.height = height
        this.homeworldName = homeworldName;
        this.homeworldId = homeworldId
    }
}