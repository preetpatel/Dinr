import { Injectable  } from '@nestjs/common';
import axios from 'axios';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';

@Injectable()
export class RestaurantsService {

    constructor() {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };


    getRestaurantsForLocation(lat: number, lon: number): Restaurant[] {

        let restaurants: Restaurant[] = [];

        axios({method: 'GET', url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, headers: this.headersRequest})
        .then(res => {

            res.data.nearby_restaurants.forEach(location => {
                // console.log(location.restaurant.name);
                let res : Restaurant = this.setRestaurantInfo(location.restaurant);  
                restaurants.push(res);
            });

            return restaurants;

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
        restaurant.cuisines = data.cuisines;

        console.log(restaurant.image);

        return restaurant;
         
    }




}
