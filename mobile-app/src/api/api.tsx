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
        console.log(result.data);
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
        console.log("An error occurred getting the restaurant data")
    }
}

export const startInteraction = async (id: string) => {
    const url = `${BACKEND}/interactionStatus/` + id;
    try {
        const result = await axios.post(url);
        return result.data;
    } catch (e) {
        console.log("An error occurred getting the restaurant data")
    }
}
