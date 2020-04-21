import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';

@Injectable()
export class FilterService {



    filterByCuisines(allRestaurants: Restaurant[], cuisines: string): Restaurant[] {
        let cuisineList: string[] = cuisines.split(" ");
        let filteredRestaurants: Restaurant[] = [];

        allRestaurants.forEach(res => {
            for (let cuisine of cuisineList) {
                if (res.cuisines.toLowerCase().includes(cuisine)) {
                    filteredRestaurants.push(res);
                }
            }
        });

        return filteredRestaurants;
    }

    filterByPriceRange(allRestaurants: Restaurant[], priceRange: number): Restaurant[] {

        let filteredRestaurants: Restaurant[] = new Array();

        for(let restaurant of allRestaurants){
            //console.log('Res ' + restaurant.name + ' price: ' + restaurant.priceRange + ', Search price: ' + priceRange);
            if(restaurant.priceRange <= priceRange){
                filteredRestaurants.push(restaurant);
                //console.log('Res name: ' + restaurant.name);
            }
        }

        return filteredRestaurants;

    }


}
