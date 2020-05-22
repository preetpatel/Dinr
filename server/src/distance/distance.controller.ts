import { Controller, Get, Param } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Controller('distance')
export class DistanceController {

    constructor(private distanceService: DistanceService) {}

    // Gets travel distance by car to a restaurant given it's coordinates and the users 
    @Get('/:originLat/:originLon/:lat/:lon')
    getDistance(@Param() params) {
        return this.distanceService.getDistance(params.originLat, params.originLon, params.lat, params.lon);
    }


}
