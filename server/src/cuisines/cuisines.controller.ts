import { Controller, Get, Param } from '@nestjs/common';
import { CuisinesService } from './cuisines.service';

@Controller('cuisines')
export class CuisinesController {

    constructor(private cuisineService: CuisinesService) {}

    //Getting a list of cuisines for a city given it's id and latitide/longitude
    @Get('/:cityID/:lat/:lon')
    getCuisines(@Param() params) {
        console.log('Get cuisines');
        return this.cuisineService.getCuisines(params.cityID, params.lat, params.lon);
    }

    @Get()
    getCategories() {
        console.log('Get categories');
        return this.cuisineService.getCategories();
    }

}
