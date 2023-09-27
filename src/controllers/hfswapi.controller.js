import Database from "../database/config.js";
import { getHomeWorldID, getHomeworld, getPeopleByID, getPlanetByID, getWeightOnPlanet } from "../helpers/functions.js";
import People from "../models/people.model.js";
import Planet from "../models/planet.model.js";

// Guardamos los logs en este array
const logs = []

// esta funcion obtiene un personaje por su id
export const getPeople = async(req, res) => {

    try {

        //Guardamos los logs
        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});
        
        const { id } = req.params;

        // Validamos que el id sea un numero
        if(isNaN(Number(id))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
    
        //simulamos peticiones a base de datos
        const database = new Database();

        const peoples = database.getPeoples();
    
        const person = peoples.find(person => person.id == id);
    
        // Si no existe el personaje en la DB
        if (!person) {
            
            // Obtenemos el personaje por su id
            const people = await getPeopleByID(id);

            // Si no existe el personaje en la API devolvemos un error
            if(!people) return res.status(404).json({ Error: "Person not found" });
            
            const { name, mass, height, homeworld } = people;
            
            const newPerson = new People(name, mass, height);
            
            // obtenemos el nombre del planeta del personaje
            const { name: homeworldName } = await getHomeworld(homeworld);
    
            newPerson.homeworldName = homeworldName;
            
            // obtenemos el id del planeta del personaje
            newPerson.homeworldId = getHomeWorldID(homeworld);
    
            return res.status(200).json(newPerson);
    
        }

        // en caso de que exita devolvemos el personaje de la DB
        delete person.id
        return res.status(200).json(person);

    } catch (error) {

        console.log(error)
        
    }
    

}

// esta funcion obtiene un planeta por su id
export const getPlanet = async(req, res) => {

    try {

        //Guardamos los logs
        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});

        const { id } = req.params;
    
        // Validamos que el id sea un numero
        if(isNaN(Number(id))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
    
        //simulamos peticiones a base de datos
        const database = new Database();

        const planets = database.getPlanets();
    
        const planet = planets.find(planet => planet.id == id);
        
        // Si no existe el planeta en la DB
        if(!planet){
            
            // Obtenemos el planeta por su id
            const planet = await getPlanetByID(id);

            // Si no existe el planeta en la API devolvemos un error
            if(!planet) return res.status(404).json({ Error: "Planet not found" });

            const { name, gravity } = planet;
            
            //creamos un nuevo planeta
            const newPlanet = new Planet(name, gravity);
    
            return res.status(200).json(newPlanet);
        }
        
        // en caso de que exita devolvemos el planeta de la DB
        delete planet.id
        return res.status(200).json(planet);

    } catch (error) {

        console.log(error)
        
    }
}

// esta funcion obtiene el peso de un personaje en un planeta random
export const getWeightOnPlanetRandom = async(req, res) => {

    try {
        
        //Guardamos los logs
        logs.push({ip: req.ip, action: req.originalUrl, headers: JSON.stringify(req.headers)});

        const { planetId, peopleId } = req.params;
    
        // Validamos que el id sea un numero
        if(isNaN(Number(planetId)) || isNaN(Number(peopleId))){
            return res.status(400).json({
                Error: "ID must be a number"
            })
        }
        
        //simulamos peticiones a base de datos
        const database = new Database();
        const  peoples  = database.getPeoples();
        const  planets  = database.getPlanets();
    
        const person = peoples.find(person => person.id == peopleId);
        const planet = planets.find(planet => planet.id == planetId);

        // Si existe el personaje en la DB
        if(person && planet){
            
            // si el personaje esta en su propio planeta
            if(person.homeworld_name == planet.name){
                return res.status(400).json({
                    Error: `The character ${person.name} is on his own planet ${planet.name}`
                })
            }
            // obtenemos el peso del personaje
            const weightPeople = getWeightOnPlanet(person.mass, planet.gravity);
    
            return res.status(200).json({
                weightPeople: `The weight of ${person.name} on ${planet.name} is ${weightPeople}`
            })
        }

        // en caso de que no esten en la DB

        // Obtenemos el planeta por su id
        const planetResponse = await getPlanetByID(planetId);
        
        // Si no existe el personaje en la API devolvemos un error
        if(!planetResponse) return res.status(404).json({ Error: "Planet not found" });

        const { name: planetName, gravity } = planetResponse;
        
        // Obtenemos el personaje por su id
        const personResponse = await getPeopleByID(peopleId);

        // Si no existe el personaje en la API devolvemos un error
        if(!personResponse) return res.status(404).json({ Error: "Person not found" });

        const { name: peopleName, mass, homeworld } = personResponse;
    
        // obtenemos el nombre del planeta del personaje
        const { name: homeworldName } = await getHomeworld(homeworld);
    
        // Validamos que el personaje no este en su propio planeta
        if(planetName == homeworldName){
            return res.status(400).json({
                Error: `The character ${peopleName} is on his own planet ${planetName}`
            })
        }

        // validamos que la masa no sea unknown
        if(mass == "unknown"){
            return res.status(400).json({
                Error: `The weight cannot be calculated because the mass of the character ${peopleName} is not available.`
            })
        }

        if(gravity.split(" ").length < 2){
            return res.status(400).json({
                Error: `The weight cannot be calculated because the gravity of the planet ${planetName} is not available.`
            })
        }
        // obtenemos el peso del personaje
        const weightPeople = getWeightOnPlanet(mass, gravity.split(" ")[0]);
    
        return res.status(200).json({
            weightPeople: `The weight of ${peopleName} on ${planetName} is ${weightPeople}`
        })

    } catch (error) {
        console.log(error)
    }


}

// obtenemos los logs en memoria
export const getLogs = (req, res) => {
    
    return res.status(200).json({ logs });
}