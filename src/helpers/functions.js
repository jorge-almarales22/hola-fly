import axios from "axios";

export const getHomeWorldID = (data) => {

    const url = new URL(data);

    const path = url.pathname;
    
    const desiredPath = path.replace('/api', '').replace(/\/$/, ''); // Elimina '/api' del principio y cualquier barra diagonal al final   

    return desiredPath;
}

export const getWeightOnPlanet = (mass, gravity) => {
    return mass * gravity;
}

export const getPeopleByID = async(id) => {
    try {

        const response = await axios.get(`https://swapi.dev/api/people/${id}`);
        const data = await response.data;
        return data;
        
    } catch (error) {
        return false
    }
}

export const getPlanetByID = async(id) => {
    try {

        const response = await axios.get(`https://swapi.dev/api/planets/${id}`);
        const data = await response.data;
        return data;
        
    } catch (error) {
        return false
    }
}

export const getHomeworld = async(homeworld) => {

    try {

        const responseWorld = await axios.get(homeworld);
        const dataWorld = await responseWorld.data;
        return dataWorld;
        
    } catch (error) {
        console.log(error)
    }
}