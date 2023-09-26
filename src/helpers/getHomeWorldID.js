export const getHomeWorldID = (data) => {

    const url = new URL(data);

    const path = url.pathname;
    
    const desiredPath = path.replace('/api', '').replace(/\/$/, ''); // Elimina '/api' del principio y cualquier barra diagonal al final   

    return desiredPath;
}