import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';
import axios from 'axios';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class SearchService {

    constructor(private restaurantsService: RestaurantsService){}

    protected lengthOneDegreeLat: number = 111000;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 

    protected restaurantsMap:Map<number, Restaurant> = new Map();


    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    async expandingSquaresearch(originLat: number, originLon: number, distanceMod: number): Promise<Restaurant[]> {
        
        let allRestaurants: Restaurant[];

        let iterations: number = distanceMod/2;
        let searchCount: number = 0;

        let newLatN: number = originLat;
        let newLatS: number = originLat;
        let newLonE: number = originLon;
        let newLonW: number = originLon;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);
    
        // Get initial restaurants around origin
        let restaurants$: Promise<Restaurant[]> = this.restaurantsService.getRestaurantsForLocation(originLat, originLon);

        restaurants$.then(response => {
            response.forEach(restaurant => {
                this.restaurantsMap.set(restaurant.id, restaurant);
                console.log('adding to map');






                
            });
        })
        

        while(searchCount < iterations){
            //Find delta lon and 
            newLatN = newLatN + this.deltaLat;
            newLatS = newLatS - this.deltaLat;
            newLonE = newLonE + this.deltaLon;
            newLonW = newLonW - this.deltaLon;
            searchCount++;

            //Move north
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatN, originLon));

            //Move south
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatS, originLon));

            //Move east
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonE));
            
            //Move west
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonW));

            // Increment delta lat after as is pre known constant.
            
        }

        // Return list of restaurants as an array

        for (let res of this.restaurantsMap.values()) {
            allRestaurants.push(res);
            console.log(res.name);
        }
        console.log(this.restaurantsMap);
        return allRestaurants;
    }

    catchDuplicates(restaurants: Restaurant[]){
        restaurants.forEach(restaurant => {
            if(!(this.restaurantsMap.has(restaurant.id))){
                this.restaurantsMap.set(restaurant.id, restaurant);
            }
        })
    }

    twoKmLon(lat: number){
        let oneDegreeLonInM = Math.cos(this.toRadians(lat))*this.lengthOneDegreeLat;
        return 2*(1/oneDegreeLonInM);
    }

    toRadians(deg: number) {
        return deg * (Math.PI/180);
    }

}