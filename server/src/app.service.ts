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
  allRestaurants$: Promise<Restaurant[]>;
  filteredRestaurants: Restaurant[];

  async getRestaurants(lat: number, lon: number, distanceMod: number, 
    cuisines: string, priceRange: number ): Promise<Restaurant[]> {
      this.originalLat = lat;
      this.originalLon = lon;

      //Search given distance modifier
  
      this.allRestaurants$ = this.searchService.expandingSquaresearch(lat, lon, distanceMod); 

      this.allRestaurants$.then(restaurants => {
        



      })

      //Filter by cuisine
      this.filteredRestaurants = this.filterService.filterByCuisines(this.allRestaurants, cuisines);

      //Filter by price range
      this.filteredRestaurants = this.filterService.filterByPriceRange(this.filteredRestaurants, priceRange);


      //Get distances for each restaurant that we've gotten back
      this.filteredRestaurants =this.getDistancesForRestaurants(this.filteredRestaurants, distanceMod);

      console.log(this.filteredRestaurants[0]);
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
