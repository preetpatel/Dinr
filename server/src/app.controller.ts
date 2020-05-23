import { Controller, Get, Param, Put, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SetUpDTO } from './models/setUpDTO';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Get('/:lat/:lon/:cuisines/:priceRange')
  getRestaurants(@Param() params) {
    return this.appService.getRestaurants(params.lat, params.lon, 
      params.cuisines, params.priceRange);
  }

  @Post('/setupInteraction')
  setupInteraction(@Body() setUp: SetUpDTO) {
    return this.appService.setupInteration(setUp.lat, setUp.lon, setUp.cuisines, setUp.priceLevel);
  }

  @Get('/interaction/:id')
  getInteraction(@Param() params) {
    return this.appService.getInteraction(params.id)
  }

}


