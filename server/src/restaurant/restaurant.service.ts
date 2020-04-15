import { Injectable, HttpService  } from '@nestjs/common';
import axios from 'axios';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';


@Injectable()
export class RestaurantService {

    constructor() {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    getRestaurant(id: number): Restaurant {

        axios({method: 'GET', url: `${this.baseAddress}/restaurant?res_id=${id}`, headers: this.headersRequest})
        .then(res => {
            return this.settingRestaurantInfo(res.data);
        })
        .catch(err => console.log(err));

        return null;
    }


    settingRestaurantInfo(data: any, ): Restaurant {

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

        restaurant.distance = `${this.calculateDistanceToRestaurant(data.location.latitude, data.location.longitude)} km away`;

        console.log(restaurant.image);

        return restaurant;
         
    }


    calculateDistanceToRestaurant(resLat: number, resLon: number): number {

        // Needs to call to an API call where we can find the distance between two places...

        return 0;

    }






}
