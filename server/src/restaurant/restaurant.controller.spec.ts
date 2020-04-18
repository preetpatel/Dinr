import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';

describe('Restaurant Controller', () => {
  let controller: RestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
