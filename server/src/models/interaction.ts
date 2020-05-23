import { Restaurant } from "./restaurant";

export class Interaction {
    id: string;
    cuisines: string[];
    priceLevel: number;
    peopleJoined: number;
    allRestaurants: Restaurant[];
    topThreeRestaurants: Restaurant[];
    lat: number;
    lon: number;
}