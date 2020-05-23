import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/models/restaurant';

@Injectable()
export class FilterService {

<<<<<<< HEAD
    public checkRestaurant(restaurant: Restaurant, cuisines: string, priceRange: number): boolean{
        if(this.checkCuisine(restaurant, cuisines) && this.checkPrice(restaurant, priceRange)){
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

    private checkPrice(restaurant: Restaurant, priceRange: number): boolean{
        if(restaurant.priceRange <= priceRange){
            return true;
        } else {
            return false;
        }
=======
    public filterResults(allRestaurants: Restaurant[], cuisines: string, priceRange: number): Restaurant[] {
        let filteredRestaurants: Restaurant[] = this.filterByCuisines(allRestaurants, cuisines);
        filteredRestaurants = this.filterByPriceRange(filteredRestaurants, priceRange);
        return filteredRestaurants;
    }

    private filterByCuisines(allRestaurants: Restaurant[], cuisines: string): Restaurant[] {
        let cuisineList: string[] = cuisines.toLowerCase().split(" ");
        let filteredRestaurants: Restaurant[] = [];

        allRestaurants.forEach(restaurant => {
            for (let cuisine of cuisineList) {
                if (restaurant.cuisines.toLowerCase().includes(cuisine)) {
                    filteredRestaurants.push(restaurant);
                }
            }
        });

        return filteredRestaurants;
    }

    private filterByPriceRange(allRestaurants: Restaurant[], priceRange: number): Restaurant[] {
        let filteredRestaurants: Restaurant[] = [];

        for(let restaurant of allRestaurants){
            if(restaurant.priceRange <= priceRange){
                filteredRestaurants.push(restaurant);
            }
        }
        return filteredRestaurants;
>>>>>>> master
    }
}
