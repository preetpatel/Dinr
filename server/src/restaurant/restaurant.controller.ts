import { Controller, Get, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from 'src/models/restaurant';

@Controller('restaurant')
export class RestaurantController {

    constructor(private restaurantService: RestaurantService) {}

    //Getting information for a restaurant given its restaurant id
    @Get(':id')
    getRestaurant(@Param() params): Restaurant {
        console.log('Get a restaurant')
        return this.restaurantService.getRestaurant(params.id);
    }

}
