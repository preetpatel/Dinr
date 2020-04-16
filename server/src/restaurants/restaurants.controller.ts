import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from 'src/models/restaurant';

@Controller('restaurants')
export class RestaurantsController {

    constructor(private restaurantsService: RestaurantsService) {}

    // @Get('/:lat/:lon/:distanceMod')
    // getRestaurants(@Param() params)  {
    //     console.log('Get restaurants for area')
    //     return this.restaurantsService.getRestaurants(params.lat, params.lon, params.distanceMod);
    // }


}
