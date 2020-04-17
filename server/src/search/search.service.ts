import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';
import axios from 'axios';

@Injectable()
export class SearchService {

    constructor(){}

    protected lengthOneDegreeLat: number = 111000;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 

    protected restaurants:Map<number, Restaurant> = new Map();


    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    expandingSquaresearch(originLat: number, originLon: number, distanceMod: number): Restaurant[] {
        
        let restaurants: Restaurant[];

        let iterations: number = distanceMod/2;
        let searchCount: number = 0;

        let newLatN: number = originLat;
        let newLatS: number = originLat;
        let newLonE: number = originLon;
        let newLonW: number = originLon;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);
    
        // Get initial restaurants around origin
        this.getRestaurantsForLocation(originLat, originLon).forEach(restaurant => {
            this.restaurants.set(restaurant.id, restaurant);
        });

        while(searchCount < iterations){


            //Find delta lon and 
            newLatN = newLatN + this.deltaLat;
            newLatS = newLatS - this.deltaLat;
            newLonE = newLonE + this.deltaLon;
            newLonW = newLonW - this.deltaLon;
            searchCount++;

            //Move north
            this.catchDuplicates(this.getRestaurantsForLocation(newLatN, originLon));

            //Move south
            this.catchDuplicates(this.getRestaurantsForLocation(newLatS, originLon));

            //Move east
            this.catchDuplicates(this.getRestaurantsForLocation(originLat, newLonE));
            
            //Move west
            this.catchDuplicates(this.getRestaurantsForLocation(originLat, newLonW));

            // Increment delta lat after as is pre known constant.
            
        }

        // Return list of restaurants as an array

        for (let res of this.restaurants.values()) {
            restaurants.push(res);
        }

        return restaurants;
    }

    catchDuplicates(restaurants: Restaurant[]){
        restaurants.forEach(restaurant => {
            if(!(this.restaurants.has(restaurant.id))){
                this.restaurants.set(restaurant.id, restaurant);
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



    getRestaurantsForLocation(lat: number, lon: number): Restaurant[]  {

        let restaurants: Restaurant[] = [];

        axios({method: 'GET', url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, headers: this.headersRequest})
        .then(res => {

            res.data.nearby_restaurants.forEach(location => {
                // console.log(location.restaurant.name);
                let res : Restaurant = this.setRestaurantInfo(location.restaurant);  
                restaurants.push(res);
            });
        })
        .catch(err => console.log(err));
        return restaurants;
    }



    setRestaurantInfo(data: any, ): Restaurant {

        let restaurant: Restaurant = new Restaurant;
        let rating: Rating = new Rating;

        restaurant.name = data.name;
        restaurant.id = data.id;
        restaurant.address = data.location.address;
        restaurant.image = data.thumb;
        restaurant.priceRange = data.price_range;
        rating.ratingNumber = data.user_rating.aggregate_rating;
        rating.ratingText = data.user_rating.rating_text;
        restaurant.rating = rating;
        restaurant.averageCostFor2 = `${data.currency}${data.average_cost_for_two}`;
        restaurant.cuisine = data.cuisines;

        console.log(restaurant.image);

        return restaurant;
         
    }





}
