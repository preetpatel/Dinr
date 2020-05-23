import { Injectable  } from '@nestjs/common';
import axios from 'axios';
import { Rating } from '../models/rating';
import { Restaurant } from '../models/restaurant';

@Injectable()
export class RestaurantsService {

    constructor() {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

<<<<<<< HEAD
    //Lola's
    // protected headersRequest = {
    //     'user-key': '98334e87fff8e40beb83e1609e380766'
    // };

    //From rupert.moran.adcock@gmail.com login
    // protected headersRequest = {
    //     'user-key': '404284847268fbc791a13a00b90a77cb'
    // };

    //From rmor188@aucklanduni.ac.nz login
    // protected headersRequest = {
    //     'user-key': 'baa2779d5950311549175b0e72973046'
    // };


    
    // From starstrike64@gmail.com
    protected headersRequest = {
        'user-key': '793ca5c4494b3bf74b20eb8f4ebfcf43'
    };

=======
    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };


>>>>>>> master
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
<<<<<<< HEAD


=======
>>>>>>> master
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
