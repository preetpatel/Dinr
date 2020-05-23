import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';

@Injectable()
export class FilterService {

    public checkRestaurant(restaurant: Restaurant, cuisines: string): boolean{
        if(this.checkCuisine(restaurant, cuisines)){
            return true;
        } else {
            return false;
        }
    }

    private checkCuisine(restaurant: Restaurant, cuisines: string): boolean{
        let cuisineList: string[] = cuisines.toLowerCase().split(" ");
        for (let cuisine of cuisineList) {
            if (restaurant.cuisines.toLowerCase().includes(cuisine)) {
                return true;
            }
        }
        return false;
    }
}
