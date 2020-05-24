import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';
import { Restaurant } from '../models/restaurant';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilterService],
    }).compile();

    service = module.get<FilterService>(FilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return true because restaurant is one of the types specified by the user', () => {
    let restaurant: Restaurant = new Restaurant;
    restaurant.cuisines = "Thai";
    let cuisines: string = "Thai Indian Chinese";
    expect(service.checkRestaurant(restaurant, cuisines)).toBeTruthy();
  });

  it('should return false because restaurant is NOT one of the types specified by the user', () => {
    let restaurant: Restaurant = new Restaurant;
    restaurant.cuisines = "Thai";
    let cuisines: string = "Indian Chinese";
    expect(service.checkRestaurant(restaurant, cuisines)).toBeFalsy();
  });


});
