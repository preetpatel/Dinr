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


    getRestaurants(lat: number, lon: number, distanceMod: number) {

        let restaurants: Restaurant[] = [];

        axios({method: 'GET', url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, headers: this.headersRequest})
        .then(res => {

            res.data.nearby_restaurants.forEach(location => {
                // console.log(location.restaurant.name);
                let res : Restaurant = this.settingRestaurantInfo(location.restaurant);  
                restaurants.push(res);
            });

            this.filterByCuisine();
            this.filterByPrice();

            restaurants.forEach(res => {
                this.calculateDistanceToRestaurant(res); //sets distance on res object
            });




        })
        .catch(err => console.log(err));

    }


    settingRestaurantInfo(restaurantInfo: any, ): Restaurant {

        let restaurant: Restaurant = new Restaurant;
        let rating: Rating = new Rating;

        restaurant.name = restaurantInfo.name;
        restaurant.id = restaurantInfo.id;
        restaurant.address = restaurantInfo.location.address;
        restaurant.image = restaurantInfo.thumb;
        restaurant.priceRange = restaurantInfo.price_range;
        rating.ratingNumber = restaurantInfo.user_rating.aggregate_rating;
        rating.ratingText = restaurantInfo.user_rating.rating_text;
        restaurant.rating = rating;
        restaurant.averageCostFor2 = `${restaurantInfo.currency}${restaurantInfo.average_cost_for_two}`;
        restaurant.cuisine = restaurantInfo.cuisines;

        // restaurant.distance = `${this.calculateDistanceToRestaurant(data.location.latitude, data.location.longitude)} km away`;

        console.log(restaurant.image);

        return restaurant;
         
    }


    filterByCuisine() {


    }

    filterByPrice() {


    }

    calculateDistanceToRestaurant(res: Restaurant) {

        //set distance on restaurant object here 
    }




}
