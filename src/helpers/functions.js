import axios from "axios";

// esta funcion nos ayuda a obtener el id del planeta pasandole como paraemetro la url del api "homeworld": "https://swapi.dev/api/planets/8/"
export const getHomeWorldID = (data) => {

    const url = new URL(data);

    const path = url.pathname;
    
    const desiredPath = path.replace('/api', '').replace(/\/$/, ''); // Elimina '/api' del principio y cualquier barra diagonal al final   

    return desiredPath;
}

// esta funcion nos ayuda a obtener la masa del planeta pasandole como paraemetro la masa del personaje y la gravedad del planeta
export const getWeightOnPlanet = (mass, gravity) => {
    return mass * gravity;
}

// esta funcion nos ayuda a obtener el personaje pasandole como paraemetro el id del personaje en caso de que falle nos devuelve false
export const getPeopleByID = async(id) => {
    try {

        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const data = await response.data;
        return data;
        
    } catch (error) {
        return false
    }
}

// esta funcion nos ayuda a obtener el planeta pasandole como paraemetro el id del planeta en caso de que falle nos devuelve false
export const getPlanetByID = async(id) => {
    try {

        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        const data = await response.data;
        return data;
        
    } catch (error) {
        return false
    }
}

// esta funcion nos ayuda a obtener el nombre del planeta pasandole como paraemetro la url del api "homeworld": "https://swapi.dev/api/planets/8/"
export const getHomeworld = async(homeworld) => {

    try {

        const responseWorld = await axios.get(homeworld);
        const dataWorld = await responseWorld.data;
        return dataWorld;
        
    } catch (error) {
        console.log(error)
    }
}