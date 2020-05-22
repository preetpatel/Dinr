import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import { RestaurantsService } from '../restaurants/restaurants.service';

describe('SearchService', () => {
  let service: SearchService;
  let restaurantService: RestaurantsService;

  beforeEach( () => {
    restaurantService = new RestaurantsService();
    service = new SearchService(restaurantService);
  
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
