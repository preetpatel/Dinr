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