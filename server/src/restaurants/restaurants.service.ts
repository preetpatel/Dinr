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


    public async getRestaurantsForLocation(lat: number, lon: number): Promise<Restaurant[]> {

        let restaurantsForLocation: Restaurant[] = [];

        try {
            const response = await axios({
                method: 'GET', 
                url: `${this.baseAddress}/geocode?lat=${lat}&lon=${lon}`, 
                headers: this.headersRequest
            });
    
            response.data.nearby_restaurants.forEach(location => {
                restaurantsForLocation.push(this.setRestaurantInfo(location.restaurant));
            });

            return restaurantsForLocation;
            
        } catch (error) {
            //Need to handle if get null back...
            return null;
        }
    }

    private setRestaurantInfo(data: any ): Restaurant {

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
