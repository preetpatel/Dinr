import { Test, TestingModule } from '@nestjs/testing';
import { DistanceController } from './distance.controller';

describe('Distance Controller', () => {
  let controller: DistanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistanceController],
    }).compile();

    controller = module.get<DistanceController>(DistanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
