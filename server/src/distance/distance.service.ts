import { Injectable } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class DistanceService {
    
    constructor() {}

    protected baseAddress: string = "https://trueway-matrix.p.rapidapi.com/CalculateDrivingMatrix";

    protected headersRequest = {
        "content-type":"application/json",
        "x-rapidapi-host":"trueway-matrix.p.rapidapi.com",
        "x-rapidapi-key":"0604765222mshc68469b6f8fb753p1141f5jsnecf812c2571d"
    }

    getDistance(originLat: number, originLon: number, destLat: number, destLon: number): number {

        let coords = {
            "destinations": `${destLat}%2C${destLon}%3B`,
            "origins": `${originLat}%2C${originLon}%3B;`
        }
        
        axios({method: 'GET', url: `${this.baseAddress}`, headers: this.headersRequest, params: coords})
        .then(res => {
            console.log(res.data.distances[0]);

            return res.data.distances[0];
        })
        .catch(err => console.log(err));

        return 0;
    }
}
