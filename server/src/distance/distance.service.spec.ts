import { Test, TestingModule } from '@nestjs/testing';
import { DistanceService } from './distance.service';

describe('DistanceService', () => {
  let service: DistanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistanceService],
    }).compile();

    service = module.get<DistanceService>(DistanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
