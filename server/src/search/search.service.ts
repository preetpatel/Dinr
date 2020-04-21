import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';
import axios from 'axios';
import { RestaurantsService } from 'src/restaurants/restaurants.service';

@Injectable()
export class SearchService {

    constructor(private restaurantsService: RestaurantsService){}

    protected lengthOneDegreeLat: number = 111.320;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 


    protected restaurantsMap:Map<number, Restaurant> = new Map();


    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    expandingSquaresearch = async(originLat: number, originLon: number, distanceMod: number) => { //: Promise<Restaurant[]>
        
        let allRestaurants: Restaurant[] = new Array();

        let iterations: number = distanceMod/2 - 1;
        let searchCount: number = 0;

        let newLatN: number = originLat;
        let newLatS: number = originLat;
        let newLonE: number = originLon;
        let newLonW: number = originLon;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);
    
        // Get initial restaurants around origin
        // let restaurants$: Promise<Restaurant[]> = this.restaurantsService.getRestaurantsForLocation(originLat, originLon);

        //allRestaurants = await this.restaurantsService.getRestaurantsForLocation(originLat, originLon);
        this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, originLon));

        while(searchCount < iterations){
            //Find delta lon and 
            newLatN = newLatN - -this.deltaLat;
            newLatS = newLatS - this.deltaLat;
            newLonE = newLonE - -this.deltaLon;
            newLonW = newLonW - this.deltaLon;
            searchCount++;

            // North
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatN, originLon));

            // South
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatS, originLon));

            // East
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonE));

            // West
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonW));
        }


        // Convert map to an array to return
        for (let key of this.restaurantsMap.keys()){
            allRestaurants.push(<Restaurant>this.restaurantsMap.get(key));
        }
        
        return allRestaurants; 

    }



    catchDuplicates(restaurants){
        restaurants.forEach(restaurant => {
            if(!(this.restaurantsMap.has(restaurant.id))){
                this.restaurantsMap.set(restaurant.id, restaurant);
                //console.log('Added ' + restaurant.name);
            } else {
                //console.log('Duplicate ' + restaurant.name);
            }
        })
    }

    twoKmLon(lat: number){
        let oneDegreeLonInKm = this.lengthOneDegreeLat*Math.cos(this.toRadians(lat));
        return 2*(1/oneDegreeLonInKm);
    }

    toRadians(deg: number) {
        return deg * (Math.PI/180);
    }

}