import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';
import axios from 'axios';

@Injectable()
export class SearchService {

    constructor(){}

    protected lengthOneDegreeLat: number = 111000;
    protected thousandMInLat = 0.009; 

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    expandingSquaresearch(originLat: number, originLon: number, distanceMod: number){
        let searchIteration: number = 0;
        while(searchIteration < distanceMod){
            
        }



    }

    oneKmLon(lat: number){
        let oneDegreeLonInM = Math.cos(this.toRadians(lat))*this.lengthOneDegreeLat;
        return 1/oneDegreeLonInM;
    }

    toRadians(deg: number) {
        return deg * (Math.PI/180);
    }



    getRestaurantsForLocation(lat: number, lon: number) {

        let restaurants: Restaurant[] = [];

        axios({method: 'GET', url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, headers: this.headersRequest})
        .then(res => {

            res.data.nearby_restaurants.forEach(location => {
                // console.log(location.restaurant.name);
                let res : Restaurant = this.settingRestaurantInfo(location.restaurant);  
                restaurants.push(res);
            });

        })
        .catch(err => console.log(err));

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
