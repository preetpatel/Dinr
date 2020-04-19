import { Rating } from "./rating";

export class Restaurant {
    id: number;
    cuisines: string;
    name: string;
    rating: Rating;
    averageCostFor2: string;
    image: string;
    address: string;
    distance?: string;
    review: string;
    priceRange: number;
    latitude: number;
    longitude: number;
  }