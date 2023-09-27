import { database } from "../database/db.js";
import { getHomeWorldID, getPeopleByID, getPlanetByID, getWeightOnPlanet } from "../helpers/functions.js";

export const getPeople = async(req, res) => {

    try {
        
        const { id } = req.params;

        if(isNaN(Number(id))){
            return res.status(400).json({
                message: "ID must be a number"
            })
        }
    
        const { peoples } = database;
    
        const person = peoples.find(person => person.id == id);
    
        if (!person) {
    
            const { name, mass, height, homeworld } = await getPeopleByID(id);
    
            const newPerson = {
                name,
                mass,
                height
            }
    
            const responseWorld = await fetch(homeworld);
            const dataWorld = await responseWorld.json();
    
            const { name: homeworldName } = dataWorld;
    
            newPerson.homeworldName = homeworldName;
    
            newPerson.homeworldId = getHomeWorldID(homeworld);
    
            return res.status(200).json(newPerson);
    
        }

        return res.status(200).json(person);

    } catch (error) {

        console.log(error)
        
    }
    

}

export const getPlanet = async(req, res) => {

    try {
        
        const { id } = req.params;
    
        if(isNaN(Number(id))){
            return res.status(400).json({
                message: "ID must be a number"
            })
        }
    
        const { planets } = database;
    
        const planet = planets.find(planet => planet.id == id);
    
        if(!planet){
        
            const { name, gravity } = await getPlanetByID(id);
    
            const newPlanet = {
                name,
                gravity
            }
    
            return res.status(200).json(newPlanet);
        }
    
        return res.status(200).json(planet);

    } catch (error) {

        console.log(error)
        
    }
}

export const getWeightOnPlanetRandom = async(req, res) => {

    //TODO: Validar cuando sea 1 el peopleID y el planetaID sea mayor que 1

    const { planetId, peopleId } = req.body;

    if(isNaN(Number(planetId)) || isNaN(Number(peopleId))){
        return res.status(400).json({
            message: "ID must be a number"
        })
    }

    const { peoples } = database;
    const { planets } = database;

    const person = peoples.find(person => person.id == peopleId);
    const planet = planets.find(planet => planet.id == planetId);


    if(person || planet){

        const weightPeople = getWeightOnPlanet(person.mass, planet.gravity);

        return res.status(200).json({
            weightPeople: `The weight of ${person.name} on ${planet.name} is ${weightPeople}`
        })
    }

    const { name: planetName, gravity } = await getPlanetByID(planetId);

    const { name: peopleName, mass } = await getPeopleByID(peopleId);


    const weightPeople = getWeightOnPlanet(mass, gravity.split(" ")[0]);

    return res.status(200).json({
        weightPeople: `The weight of ${peopleName} on ${planetName} is ${weightPeople}`
    })

}