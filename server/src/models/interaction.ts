import { Restaurant } from "./restaurant";

export class Interaction {
    id: string;
    cuisines: string[];
    priceRange: number;
    peopleJoined: number;
    allRestaurants: Restaurant[];
    topThreeRestaurants: Restaurant[];
    lat: number;
    lon: number;
}