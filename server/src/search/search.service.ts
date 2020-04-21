import { Injectable } from '@nestjs/common';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Injectable()
export class SearchService {

    constructor(private restaurantsService: RestaurantsService){}

    protected lengthOneDegreeLat: number = 111.320;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 

    protected restaurantsMap:Map<number, Restaurant> = new Map();

    public async expandingSquaresearch (originLat: number, originLon: number, distanceMod: number): Promise<Restaurant[]>  { 
        
        let allRestaurants: Restaurant[] = [];

        let iterations: number = distanceMod/2 - 1;
        let searchCount: number = 0;

        let newLatN: number = originLat;
        let newLatS: number = originLat;
        let newLonE: number = originLon;
        let newLonW: number = originLon;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);
    
        // Get initial restaurants around origin
        this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, originLon));

        while(searchCount < iterations){
            //Find delta lon and lat
            newLatN = newLatN - -this.deltaLat;
            newLatS = newLatS - this.deltaLat;
            newLonE = newLonE - -this.deltaLon;
            newLonW = newLonW - this.deltaLon;
            searchCount++;

            // Get restaurants slightly north, south, east and west of user location and check for duplicates 
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatN, originLon));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatS, originLon));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonE));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonW));
        }
        // Convert map to an array to return
        for (let key of this.restaurantsMap.keys()){
            allRestaurants.push(<Restaurant>this.restaurantsMap.get(key));
        }
        return allRestaurants; 
    }

    private catchDuplicates(restaurants: Restaurant[]): void {
        restaurants.forEach(restaurant => {
            if(!(this.restaurantsMap.has(restaurant.id))){
                this.restaurantsMap.set(restaurant.id, restaurant);
            } 
        });
    }

    private twoKmLon(lat: number): number {
        let oneDegreeLonInKm = this.lengthOneDegreeLat*Math.cos(this.toRadians(lat));
        return 2*(1/oneDegreeLonInKm);
    }

    private toRadians(deg: number): number {
        return deg * (Math.PI/180);
    }

}