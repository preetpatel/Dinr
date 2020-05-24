import { BACKEND } from "@config/config";
import axios from "axios";

export const setupInteraction = async (lat: number, lon: number, cuisines: string[], priceLevel: number) => {

    const url = `${BACKEND}/setupInteraction`;
    try {
        const result = await axios.post(url, {
            lat: lat,
            lon: lon,
            cuisines: cuisines,
            priceLevel: priceLevel
        });
        return result.data;
    } catch (e) {
        console.log("An error occurred " + e.message)
    }
}

export const getInteractionValid = async (id: string) => {
    const url = `${BACKEND}/interaction/` + id;
    try {
        await axios.get(url);
        return true;
    } catch (e) {
        return false;
    }
}

export const joinSession = async (id: string) => {
    const url = `${BACKEND}/addFriend/` + id;
    try {
        return await axios.get(url);
    } catch (e) {
        console.log("An error occurred adding friend to list");
        return false;
    }
}

export const getFriendsJoinedCount = async (id: string) => {
    const url = `${BACKEND}/getFriends/` + id;
    try {
        const result = await axios.get(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting the friend count")
    }
}

export const getRestaurantData = async (id: string) => {
    const url = `${BACKEND}/restaurantData/` + id;
    try {
        const result = await axios.get(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting the restaurant data")
    }
}

export const getInteractionStatus = async (id: string) => {
    const url = `${BACKEND}/interactionStatus/` + id;
    try {
        const result = await axios.get(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting the interaction status")
    }
}

export const startInteraction = async (id: string) => {
    const url = `${BACKEND}/interactionStatus/` + id;
    try {
        const result = await axios.post(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred starting the interaction")
    }
}

export const clientReadyToBegin = async (id: string) => {
    const url = `${BACKEND}/readyToBegin/` + id;
    try {
        const result = await axios.post(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred letting the server know that client was ready")
    }
}

export const checkReadyToBegin = async (id: string) => {
    const url = `${BACKEND}/readyToBegin/` + id;
    try {
        const result = await axios.get(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting sync status from the server")
    }
}

export const submitResults = async (id: string, data: number[]) => {
    const url = `${BACKEND}/submitResults`;
    try {
        const result = await axios.post(url, {
            id: id,
            response: data,
        });
        return result.data;
    } catch (e) {
        console.log("An error occurred " + e.message)
    }
}

export const getTopThreeResults = async (id: string) => {
    const url = `${BACKEND}/finalResults/` + id;
    try {
        const result = await axios.get(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting the final results")
    }
}
