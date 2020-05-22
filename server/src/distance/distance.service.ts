import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class DistanceService {
    
    constructor() {}

    protected key: string = "At3oxwK4IkO_k6uB_ML6xXu9sSO_ZACH1BeCm1S8qZcIYI5bY8QvPBquVqLH800U";

    public async getDistance(originLat: number, originLon: number, destLat: number, destLon: number): Promise<number> {


        // Use Bing Maps API to get distance of restaurants
        try {

            let url: string = `http://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=${originLat},${originLon}&destinations=${destLat},${destLon}&travelMode=driving&key=${this.key}&distanceUnit=kilometer&timeUnit=minutes`;
            

            const response = await axios.get(url);

            return response.data.resourceSets[0].resources[0].results[0].travelDistance;
    
        } catch (err) {
            console.log(err);
        }
    }
}
