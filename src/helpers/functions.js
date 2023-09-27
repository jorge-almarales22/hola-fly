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
    const response = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await response.json();
    return data;
}

export const getPlanetByID = async(id) => {
    const response = await fetch(`https://swapi.dev/api/planets/${id}`);
    const data = await response.json();
    return data;
}

export const getHomeworld = async(homeworld) => {
    const responseWorld = await fetch(homeworld);
    const dataWorld = await responseWorld.json();
    return dataWorld;
}