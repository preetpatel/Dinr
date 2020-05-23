import { Injectable } from '@nestjs/common';
import { DistanceService } from './distance/distance.service';
import { Restaurant } from './models/restaurant';
import { SearchService } from './search/search.service';

@Injectable()
export class AppService {

  constructor(
    private distanceService: DistanceService,
    private searchService: SearchService
    ) {}

  originalLat: number;
  originalLon: number;
  allRestaurants: Restaurant[];

  async getRestaurants(lat: number, lon: number, distanceMod: number, 
    cuisines: string, priceRange: number ): Promise<Restaurant[]> {
      this.originalLat = lat;
      this.originalLon = lon;

      // Search given distance modifier  
      this.allRestaurants = await this.searchService.expandingSquaresearch(lat, lon, distanceMod, cuisines, priceRange); 

      // Get distances for each restaurant that we've gotten back
      this.allRestaurants = await this.getDistancesForRestaurants(this.allRestaurants, distanceMod);

      return this.allRestaurants;
  }

  async getDistancesForRestaurants(restaurants: Restaurant[], distanceMod: number): Promise<Restaurant[]> {
    for (let restaurant of restaurants){
      restaurant.distance = await this.distanceService.getDistance(this.originalLat, this.originalLon, restaurant.latitude, restaurant.longitude);
    } 
    return restaurants;
  }
}
