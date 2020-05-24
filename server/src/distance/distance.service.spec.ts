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


  it('should get back the correct distance of 1.172km for the given coordinates', async () => {
    let originalLat: number = -36.9201;
    let originalLon: number = 174.7574;
    let destLat: number = -36.9301;
    let destLon: number = 174.7674;

    expect(await service.getDistance(originalLat, originalLon, destLat, destLon)).toEqual(1.172);
  });


});
