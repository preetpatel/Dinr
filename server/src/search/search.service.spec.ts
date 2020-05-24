import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { FilterService } from 'src/filter/filter.service';

describe('SearchService', () => {
  let service: SearchService;
  let restaurantService: RestaurantsService;
  let filterService: FilterService;

  beforeEach( () => {
    restaurantService = new RestaurantsService();
    service = new SearchService(restaurantService, filterService);
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
