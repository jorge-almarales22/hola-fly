import Database from "../database/config.js";
import { getHomeWorldID, getHomeworld, getPeopleByID, getPlanetByID, getWeightOnPlanet } from "../helpers/functions.js";
import People from "../models/people.model.js";
import Planet from "../models/planet.model.js";

const logs = []

export const getPeople = async(req, res) => {

    try {

        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});
        
        const { id } = req.params;

        if(isNaN(Number(id))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
    
        const database = new Database();

        const peoples = database.getPeoples();
    
        const person = peoples.find(person => person.id == id);
    
        if (!person) {
    
            const people = await getPeopleByID(id);

            if(!people) return res.status(404).json({ Error: "Person not found" });
            
            const { name, mass, height, homeworld } = people;
    
            const newPerson = new People(name, mass, height);
    
            const { name: homeworldName } = await getHomeworld(homeworld);
    
            newPerson.homeworldName = homeworldName;
    
            newPerson.homeworldId = getHomeWorldID(homeworld);
    
            return res.status(200).json(newPerson);
    
        }

        delete person.id
        return res.status(200).json(person);

    } catch (error) {

        console.log(error)
        
    }
    

}

export const getPlanet = async(req, res) => {

    try {
        
        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});

        const { id } = req.params;
    
        if(isNaN(Number(id))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
    
        const database = new Database();

        const planets = database.getPlanets();
    
        const planet = planets.find(planet => planet.id == id);
    
        if(!planet){
        
            const planet = await getPlanetByID(id);

            if(!planet) return res.status(404).json({ Error: "Planet not found" });

            const { name, gravity } = planet;
    
            const newPlanet = new Planet(name, gravity);
    
            return res.status(200).json(newPlanet);
        }
        
        delete planet.id
        return res.status(200).json(planet);

    } catch (error) {

        console.log(error)
        
    }
}

export const getWeightOnPlanetRandom = async(req, res) => {

    try {
        
        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});

        const { planetId, peopleId } = req.body;
    
        if(isNaN(Number(planetId)) || isNaN(Number(peopleId))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
        
        const database = new Database();
        const  peoples  = database.getPeoples();
        const  planets  = database.getPlanets();
    
        const person = peoples.find(person => person.id == peopleId);
        const planet = planets.find(planet => planet.id == planetId);

        
        if(person && planet){
            
            if(person.homeworld_name == planet.name){
                return res.status(400).json({
                    Error: `The character ${person.name} is on his own planet ${planet.name}`
                })
            }
            const weightPeople = getWeightOnPlanet(person.mass, planet.gravity);
    
            return res.status(200).json({
                weightPeople: `The weight of ${person.name} on ${planet.name} is ${weightPeople}`
            })
        }
    
        const planetResponse = await getPlanetByID(planetId);

        if(!planetResponse) return res.status(404).json({ Error: "Planet not found" });

        const { name: planetName, gravity } = planetResponse;
    
        const personResponse = await getPeopleByID(peopleId);

        if(!personResponse) return res.status(404).json({ Error: "Person not found" });

        const { name: peopleName, mass, homeworld } = personResponse;
    
        const { name: homeworldName } = await getHomeworld(homeworld);
    
        if(planetName == homeworldName){
            return res.status(400).json({
                Error: `The character ${peopleName} is on his own planet ${planetName}`
            })
        }

        if(mass == "unknown"){
            return res.status(400).json({
                Error: `The weight cannot be calculated because the mass of the character ${peopleName} is not available.`
            })
        }
        
        const weightPeople = getWeightOnPlanet(mass, gravity.split(" ")[0]);
    
        return res.status(200).json({
            weightPeople: `The weight of ${peopleName} on ${planetName} is ${weightPeople}`
        })
        
    } catch (error) {
        console.log(error)
    }


}

export const getLogs = (req, res) => {
    
    return res.status(200).json({ logs });
}