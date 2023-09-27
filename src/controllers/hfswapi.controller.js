import { database } from "../database/db.js";
import { getHomeWorldID } from "../helpers/getHomeWorldID.js";

export const getPeople = async(req, res) => {

    try {
        
        const { id } = req.params;

        if(isNaN(Number(id))){
            return res.status(400).json({
                message: "ID must be a number"
            })
        }
    
        const { people } = database;
    
        const person = people.find(person => person.id == id);
    
        if (!person) {
    
            const response = await fetch(`https://swapi.dev/api/people/${id}`);
            const data = await response.json();
    
            const { name, mass, height, homeworld } = data;
    
            const newPerson = {
                name,
                mass,
                height
            }
    
            const responseWorld = await fetch(data.homeworld);
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
    
            const response = await fetch(`https://swapi.dev/api/planets/${id}`);
            const data = await response.json();
    
            const { name, gravity } = data;
    
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