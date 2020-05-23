import { BACKEND } from "@config/config";

export const setupInteraction = (lat: number, lon: number, cuisines: string[], priceLevel: number) => {
    
    let data : any;
    const url = `${BACKEND}/setupInteraction`;
    const options = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    },
    body: JSON.stringify({
        lat: lat,
        lon: lon,
        cuisines: cuisines,
        priceLevel: priceLevel
    })
    };

    fetch(url, options)
    .then(response=> {
        data = response.json;
        console.log(response.json);
        return data;
    })
    .catch(function(error) {
        console.log('There has been a problem with the server: ' + error.message);
        throw error;
    });

}