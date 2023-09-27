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