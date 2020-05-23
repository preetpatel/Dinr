import { Controller, Get, Param, Put, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SetUpDTO } from './models/setUpDTO';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) {}

  @Post('/setupInteraction')
  setupInteraction(@Body() setUp: SetUpDTO) {
    return this.appService.setupInteraction(setUp.lat, setUp.lon, setUp.cuisines, setUp.priceLevel);
  }

  @Get('/interaction/:id')
  getInteraction(@Param() params) {
    return this.appService.getInteraction(params.id)
  }

  @Get('/restaurantData/:id')
  getRestaurantData(@Param() params) {
    return this.appService.getRestaurantData(params.id)
  }

}


