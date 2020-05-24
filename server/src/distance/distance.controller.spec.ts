import { Test, TestingModule } from '@nestjs/testing';
import { DistanceController } from './distance.controller';
import { DistanceService } from './distance.service';

describe('Distance Controller', () => {
  let controller: DistanceController;
  let service: DistanceService;

  beforeEach(() => {
    service = new DistanceService;
    controller = new DistanceController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should correctly use the params to call the service which will get the distance ', async () => {
    let params: any = {
      "originLat": -36.9201,
      "originLon": 174.7574,
      "lat": -36.9301,
      "lon": 174.7674,
    } 

    expect(await controller.getDistance(params)).toEqual(1.172);
  });



});
