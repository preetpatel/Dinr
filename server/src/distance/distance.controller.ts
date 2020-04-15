import { Controller, Get, Param } from '@nestjs/common';
import { DistanceService } from './distance.service';

@Controller('distance')
export class DistanceController {

    constructor(private distanceService: DistanceService) {}

    @Get('/:originLat/:originLon/:lat/:lon')
    getDistance(@Param() params) {
        console.log('Get travel distance via car from user to restaurant');
        return this.distanceService.getDistance(params.originLat, params.originLon, params.lat, params.lon);
    }


}
