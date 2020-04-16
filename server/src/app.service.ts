import { Injectable } from '@nestjs/common';
import { DistanceService } from './distance/distance.service';
import { Restaurant } from './models/restaurant';
import { SearchService } from './search/search.service';
import { FilterService } from './filter/filter.service';

@Injectable()
export class AppService {

  constructor(
    private distanceService: DistanceService,
    private filterService: FilterService,
    private searchService: SearchService
    ) {}


  originalLat: number;
  originalLon: number;
  allRestaurants: Restaurant[];
  filteredRestaurants: Restaurant[];

  getRestaurants(lat: number, lon: number, distanceMod: number, 
    cuisines: string, priceRange: number ): Restaurant[] {
      this.originalLat = lat;
      this.originalLon = lon;

      //Search given distance modifier
      this.allRestaurants; //equals some call made here 
      //(the call made here will call the getRestaurantsForLocation method in the restaurant service
      // for each location needed given the distance modifier)

      //Filter by cuisine
      this.filteredRestaurants = this.filterService.filterByCuisines(this.allRestaurants, cuisines);

      //Filter by price range
      this.filteredRestaurants = this.filterService.filterByPriceRange(this.filteredRestaurants, priceRange);


      //Get distances for each restaurant that we've gotten back
      this.filteredRestaurants =this.getDistancesForRestaurants(this.filteredRestaurants, distanceMod);

      return this.filteredRestaurants;
  }


  getDistancesForRestaurants(restaurants: Restaurant[], distanceMod: number): Restaurant[] {

    let filteredRestaurants: Restaurant[];

    restaurants.forEach(restaurant => {
      let distanceKm: number = (this.distanceService.getDistance(this.originalLat, this.originalLon, restaurant.latitude, restaurant.longitude))/1000;
      let distance: string = distanceKm.toLocaleString() + "km away.";
      if (distanceKm < distanceMod) {
        restaurant.distance = distance;
        filteredRestaurants.push(restaurant);
      }
    });
    
    return filteredRestaurants;

  }
}
