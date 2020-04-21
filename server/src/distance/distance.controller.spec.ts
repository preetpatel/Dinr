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
});
