import { Test, TestingModule } from '@nestjs/testing';
import { CuisinesController } from './cuisines.controller';

describe('Cuisines Controller', () => {
  let controller: CuisinesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuisinesController],
    }).compile();

    controller = module.get<CuisinesController>(CuisinesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
