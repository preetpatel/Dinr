import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';

@Injectable()
export class FilterService {



    filterByCuisines(allRestaurants: Restaurant[], cuisines: string): Restaurant[] {
        let cuisineList: string[] = cuisines.split(" ");
        let filteredRestaurants: Restaurant[] = [];

        allRestaurants.forEach(res => {
            for (let cuisine in cuisineList) {
                if (res.cuisine.includes(cuisine)) {
                    filteredRestaurants.push(res);
                }
            }
        });

        return filteredRestaurants;
    }

    filterByPriceRange(allRestaurants: Restaurant[], priceRange: number): Restaurant[] {

        return allRestaurants.filter(res => {
            res.priceRange>=priceRange;
        });

    }


}
