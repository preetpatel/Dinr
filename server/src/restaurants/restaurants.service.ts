import { Injectable  } from '@nestjs/common';
import axios, { AxiosPromise } from 'axios';
import { Restaurant } from 'src/models/restaurant';
import { Rating } from 'src/models/rating';
import { DistanceService } from 'src/distance/distance.service';

@Injectable()
export class RestaurantsService {

    constructor(private distanceService: DistanceService) {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };


    async getRestaurantsForLocation(lat: number, lon: number) {

        let restaurants: Restaurant[] = [];
        let restaurant: Restaurant;

        try {
            const response = await axios({
                method: 'GET', 
                url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, 
                headers: this.headersRequest
            });
    
            response.data.nearby_restaurants.forEach(location => {
                //console.log(location.restaurant.name);
                restaurant = this.setRestaurantInfo(location.restaurant);
                restaurants.push(restaurant);
            });

            // console.log('Got res for: '+ lat + ', ' + lon);

            return restaurants;
            
        } catch (error) {
            console.log(error);
        }
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
        restaurant.latitude = data.location.latitude;
        restaurant.longitude = data.location.longitude;

        return restaurant;
         
    }




}
