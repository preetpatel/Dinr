import {Controller, Get, Param, Put, Post, Body, NotFoundException} from '@nestjs/common';
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
    const interaction = this.appService.getInteraction(params.id);
    if (interaction === undefined) {
      throw new NotFoundException("Invalid Code! Please try again")
    }
    return interaction;
  }

  @Get('/restaurantData/:id')
  getRestaurantData(@Param() params) {
    return this.appService.getRestaurantData(params.id)
  }

  @Get('/getFriends/:id')
  getFriendCount(@Param() params) {
    return this.appService.getFriendCount(params.id)
  }

  @Get('/addFriend/:id')
  increaseFriendCount(@Param() params) {
    return this.appService.increaseFriendCount(params.id)
  }

  @Post('/interactionStatus/:id')
  startInteraction(@Param() params) {
    return this.appService.startMatch(params.id)
  }

  @Get('/interactionStatus/:id')
  getInteractionStatus(@Param() params) {
    return this.appService.getMatchStatus(params.id)
  }

  @Get('/readyToBegin/:id')
  getReadyToBeginStatus(@Param() params) {
    return this.appService.getReadyToSwipeStatus(params.id)
  }

  @Post('/readyToBegin/:id')
  incrementReadyToBeginCount(@Param() params) {
    return this.appService.addClientReadyToSwipe(params.id)
  }

}


