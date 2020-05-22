import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceService } from './distance/distance.service';
import { RestaurantsService } from './restaurants/restaurants.service';
import { FilterService } from './filter/filter.service';
import { SearchService } from './search/search.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let distanceService: DistanceService;
  let restaurantsService: RestaurantsService;
  let filterService: FilterService;
  let searchService: SearchService;

  beforeEach(async () => {
    distanceService = new DistanceService;
    restaurantsService = new RestaurantsService;
    filterService = new FilterService;
    searchService = new SearchService(restaurantsService);

    appService = new AppService(distanceService, filterService, searchService);
    appController = new AppController(appService);
  });

  describe('root', () => {
    it('should return an empty list', async () => {
      let params: any = {
        lat: -36.9201,
        lon: 174.7574,
        distanceMod: 6,
        cuisines: 'Indian',
        priceRange: 3 
      }
      expect(await appController.getRestaurants(params)).toEqual([]);
    });
  });
});
