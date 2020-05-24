import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsService],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get back more than 1 restaurants from the Zomato API', async () => {
    let lat: number = -36.848461;
    let lon: number = 174.763336;
    expect((await service.getRestaurantsForLocation(lat, lon)).length).toBeGreaterThan(1);
  });

});
