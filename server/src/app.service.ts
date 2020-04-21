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

  async getRestaurants(lat: number, lon: number, distanceMod: number, 
    cuisines: string, priceRange: number ): Promise<Restaurant[]> {
      this.originalLat = lat;
      this.originalLon = lon;

      // Search given distance modifier  
      this.allRestaurants = await this.searchService.expandingSquaresearch(lat, lon, distanceMod); 

      // Filter restaurants
      this.filteredRestaurants = this.filterService.filterResults(this.allRestaurants, cuisines, priceRange);

      // Get distances for each restaurant that we've gotten back
      await this.getDistancesForRestaurants(this.filteredRestaurants, distanceMod);

      return this.filteredRestaurants;
  }

  async getDistancesForRestaurants(restaurants: Restaurant[], distanceMod: number): Promise<void> {

    let distance: number = 0;

    for (let restaurant of restaurants){
      distance = await this.distanceService.getDistance(this.originalLat, this.originalLon, restaurant.latitude, restaurant.longitude)/1000;
      if(distance <= distanceMod){
        restaurant.distance = distance;
      }
    } 
    // Filter out any restaurants that are too far away
    restaurants.filter(function(res: Restaurant) {
      res.distance <= distanceMod;
    })
  }
}
