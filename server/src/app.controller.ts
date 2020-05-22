import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('/:lat/:lon/:distanceMod/:cuisines/:priceRange')
  getRestaurants(@Param() params) {
    return this.appService.getRestaurants(params.lat, params.lon, 
      params.distanceMod, params.cuisines, params.priceRange);
  }
}


